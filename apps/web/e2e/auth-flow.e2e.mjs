// apps/web/e2e/auth-flow.e2e.mjs
// END-TO-END CHECK OF THE WHOLE EMAIL + PASSWORD FLOW IN A REAL BROWSER, AGAINST THE LOCAL STACK ONLY.
// NOT RUN IN CI (IT NEEDS THE LOCAL SUPABASE STACK, THE API AND THE WEB APP RUNNING). TAKES ABOUT 90 SECONDS.
// HOW TO RUN: SEE logs/2026-10-22-m1-auth.md ("END-TO-END CHECK").
//   E2E_WEB_URL      (DEFAULT http://127.0.0.1:3000)
//   E2E_MAILPIT_URL  (DEFAULT http://127.0.0.1:54324, THE LOCAL TEST INBOX)
//   E2E_CHROMIUM     (OPTIONAL PATH TO A CHROMIUM BINARY)
import { chromium } from "playwright-core";

const WEB = process.env.E2E_WEB_URL ?? "http://127.0.0.1:3000";
const MAIL = process.env.E2E_MAILPIT_URL ?? "http://127.0.0.1:54324";

// SAFETY: THIS SCRIPT CREATES ACCOUNTS. REFUSE TO RUN AGAINST ANYTHING BUT A LOCAL STACK.
for (const url of [WEB, MAIL]) {
  const host = new URL(url).hostname;
  if (host !== "127.0.0.1" && host !== "localhost") {
    console.error(`Refusing to run against non-local URL: ${url}`);
    process.exit(2);
  }
}
const email = `e2e-${Date.now()}@example.test`;
const PASS1 = "firstpassword1";
const PASS2 = "secondpassword2";
const results = [];
const check = (name, ok, extra = "") => {
  results.push({ name, ok });
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${extra ? " — " + extra : ""}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function latestLink(type, after) {
  for (let i = 0; i < 30; i++) {
    const list = await (await fetch(`${MAIL}/api/v1/messages`)).json();
    const msgs = (list.messages || []).filter(
      (m) => m.To?.some((t) => t.Address === email) && new Date(m.Created) > after,
    );
    for (const m of msgs) {
      const full = await (await fetch(`${MAIL}/api/v1/message/${m.ID}`)).json();
      const match = full.HTML?.match(/href="([^"]*type=([a-z]+)[^"]*)"/);
      if (type === "notice" && /password was changed/i.test(m.Subject)) return m.Subject;
      if (match && match[2] === type) return match[1].replace(/&amp;/g, "&");
    }
    await sleep(500);
  }
  return null;
}

const browser = await chromium.launch(
  process.env.E2E_CHROMIUM ? { executablePath: process.env.E2E_CHROMIUM } : {},
);
const ctx = await browser.newContext();
const page = await ctx.newPage();
const fill = async (sel, v) => page.fill(sel, v);

// 1. PROTECTED PAGE REDIRECTS
await page.goto(`${WEB}/workspace`);
check(
  "signed-out /workspace redirects to sign-in with next",
  page.url() === `${WEB}/sign-in?next=%2Fworkspace`,
  page.url(),
);

// 2. WEAK PASSWORD REJECTED
await page.goto(`${WEB}/sign-up`);
await fill("#email", email);
await fill("#password", "short1");
await fill("#confirmPassword", "short1");
await page.click("button[type=submit]");
await page.locator("#password-error").waitFor();
check("weak password rejected", true);
check("email kept after a failed submit", (await page.inputValue("#email")) === email);

// 3. SIGN UP
let t0 = new Date(Date.now() - 1000);
await fill("#password", PASS1);
await fill("#confirmPassword", PASS1);
await page.click("button[type=submit]");
await page.getByText("Check your inbox").waitFor();
check("sign-up shows check-your-inbox", true);

// 4. SIGN IN BEFORE CONFIRMING
await page.goto(`${WEB}/sign-in`);
await fill("#email", email);
await fill("#password", PASS1);
await page.click("button[type=submit]");
await page.locator(".form-message--error").waitFor();
check(
  "unconfirmed account can't sign in",
  /confirm your email/i.test(await page.locator(".form-message--error").innerText()),
);

// 5. CONFIRM VIA EMAIL LINK (BUTTON, NOT AUTO)
const confirmLink = await latestLink("email", t0);
check(
  "confirmation email received with token_hash link",
  Boolean(confirmLink && confirmLink.includes("/auth/confirm?token_hash=")),
  confirmLink ?? "none",
);
const resp = await page.goto(confirmLink);
check(
  "confirm page sends Referrer-Policy: no-referrer",
  resp.headers()["referrer-policy"] === "no-referrer",
);
check(
  "opening the link alone does not sign in (button needed)",
  page.url().includes("/auth/confirm"),
);
await page.click("button[type=submit]");
await page.waitForURL(/\/workspace/);
check(
  "confirm button signs in and lands on workspace",
  page.url().includes("/workspace?welcome=1"),
  page.url(),
);
const factsText = await page.locator(".facts").innerText();
check(
  "API verified the session token (/me)",
  factsText.includes("Connected. The API confirmed your identity."),
  factsText.replace(/\n/g, " | "),
);
check(
  "workspace shows the user's email",
  (await page.locator(".facts").innerText()).includes(email),
);

// 6. COOKIES ARE HTTP-ONLY
const cookies = await ctx.cookies();
const auth = cookies.filter((c) => c.name.startsWith("sb-"));
check(
  "session cookies exist and are HttpOnly + SameSite=Lax",
  auth.length > 0 && auth.every((c) => c.httpOnly && c.sameSite === "Lax"),
  auth.map((c) => c.name).join(","),
);

// 7. REUSING THE CONFIRMATION LINK FAILS
const ctx2 = await browser.newContext();
const p2 = await ctx2.newPage();
await p2.goto(confirmLink);
await p2.click("button[type=submit]");
await p2.locator(".form-message--error").waitFor();
check(
  "used confirmation link is rejected",
  /invalid, already used or expired/i.test(await p2.locator(".form-message--error").innerText()),
);
await ctx2.close();

// 8. SIGNED-IN USER IS MOVED AWAY FROM /sign-in
await page.goto(`${WEB}/sign-in`);
check("signed-in /sign-in redirects to workspace", page.url() === `${WEB}/workspace`, page.url());

// 9. SIGN OUT
await page.click("text=Sign out");
await page.waitForURL(/signed_out=1/);
await page.goto(`${WEB}/workspace`);
check("after sign-out, workspace is protected again", page.url().startsWith(`${WEB}/sign-in`));

// 10. WRONG PASSWORD, UNKNOWN USER: SAME MESSAGE
for (const [label, e, p] of [
  ["wrong password", email, "wrongpassword9"],
  ["unknown email", "nobody@example.test", "wrongpassword9"],
]) {
  await page.goto(`${WEB}/sign-in`);
  await fill("#email", e);
  await fill("#password", p);
  await page.click("button[type=submit]");
  await page.locator(".form-message--error").waitFor();
  check(
    `${label}: generic error`,
    (await page.locator(".form-message--error").innerText()) === "Email or password is incorrect.",
  );
}

// 11. OPEN REDIRECT BLOCKED ON SIGN-IN
await page.goto(`${WEB}/sign-in?next=${encodeURIComponent("https://evil.example/")}`);
await fill("#email", email);
await fill("#password", PASS1);
await page.click("button[type=submit]");
await page.waitForURL(/\/workspace/);
check(
  "external next= is ignored (open redirect blocked)",
  page.url() === `${WEB}/workspace`,
  page.url(),
);

// SECOND DEVICE, SIGNED IN BEFORE THE RESET
const ctxB = await browser.newContext();
const pB = await ctxB.newPage();
await pB.goto(`${WEB}/sign-in`);
await pB.fill("#email", email);
await pB.fill("#password", PASS1);
await pB.click("button[type=submit]");
await pB.waitForURL(/\/workspace/);

await page.click("text=Sign out");
await page.waitForURL(/signed_out=1/);

// 12. PASSWORD RESET (WAIT FOR THE 60s PER-ADDRESS EMAIL INTERVAL)
console.log("waiting 61s for the per-address email interval…");
await sleep(61000);
await page.goto(`${WEB}/forgot-password`);
await fill("#email", "nobody@example.test");
await page.click("button[type=submit]");
const unknownMsg = await page.locator(".form-message--success").innerText();
await page.goto(`${WEB}/forgot-password`);
t0 = new Date(Date.now() - 1000);
await fill("#email", email);
await page.click("button[type=submit]");
const knownMsg = await page.locator(".form-message--success").innerText();
check(
  "reset request: same answer for known and unknown emails",
  unknownMsg.replace("nobody@example.test", "X") === knownMsg.replace(email, "X"),
);
const resetLink = await latestLink("recovery", t0);
check("recovery email received", Boolean(resetLink), resetLink ?? "none");
await page.goto(resetLink);
await page.click("button[type=submit]");
await page.waitForURL(/\/reset-password/);
check("recovery link leads to reset-password page", true);
await fill("#password", PASS1);
await fill("#confirmPassword", PASS1);
await page.click("button[type=submit]");
await page.locator(".form-message--error").waitFor();
check(
  "same password rejected",
  /haven't used/i.test(await page.locator(".form-message--error").innerText()),
  await page.locator(".form-message--error").innerText(),
);
await fill("#password", PASS2);
await fill("#confirmPassword", PASS2);
await page.click("button[type=submit]");
await page.waitForURL(/password=updated/);
check("new password saved, lands on workspace", true);
check("password-changed notice email sent", Boolean(await latestLink("notice", t0)));

// 13. OTHER DEVICE AFTER RESET
await pB.goto(`${WEB}/workspace`);
check(
  "other device: info only (see report)",
  true,
  pB.url().includes("/workspace")
    ? "still signed in until its access token expires (≤1h); refresh token revoked"
    : "signed out immediately",
);
await ctxB.clearCookies();

// 14. OLD PASSWORD FAILS, NEW WORKS
await page.click("text=Sign out");
await page.waitForURL(/signed_out=1/);
await fill("#email", email);
await fill("#password", PASS1);
await page.click("button[type=submit]");
await page.locator(".form-message--error").waitFor();
check("old password no longer works", true);
await fill("#password", PASS2);
await page.click("button[type=submit]");
await page.waitForURL(/\/workspace/);
check("new password signs in", true);

// 15. /reset-password WITHOUT SESSION
const ctx3 = await browser.newContext();
const p3 = await ctx3.newPage();
await p3.goto(`${WEB}/reset-password`);
check(
  "reset-password without a session redirects",
  p3.url() === `${WEB}/forgot-password?expired=1`,
  p3.url(),
);

await browser.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
