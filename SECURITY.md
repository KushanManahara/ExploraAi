# Security policy

ExploraAi is in early development. There are no releases yet, and only the latest code on the default branch is maintained.

## Reporting a vulnerability
**Please don't report security issues in public issues, discussions or pull requests.**

- Use GitHub's private vulnerability reporting: open the repository's **Security** tab and choose **Report a vulnerability**.
- If that option isn't available yet, open an issue titled "Security contact request" with **no details**, and the maintainer will arrange a private channel.
- If you find a leaked credential (an API key or token, for example) anywhere in this repository or its history, report it privately in the same way.

Please include:
- what you found, and where (file, commit or URL);
- how to reproduce it, and what an attacker could do with it;
- any suggested fix.

## What to expect
This is a single-maintainer project, so there are no guaranteed response times. Reports are acknowledged as soon as possible, and fixes are prioritised by severity. Please give a reasonable chance to fix an issue before disclosing it publicly.

## Scope
- In scope: code and configuration in this repository.
- `legacy/` is a frozen prototype that is not built or deployed. Its known dependency vulnerabilities are tracked, and it will be removed. Reports about it are welcome, but it won't be patched.
- Third-party services and dependencies: please report issues to their maintainers.

## How this repository protects itself
- No secrets are committed. Configuration templates (`.env.example`) list variable names only.
- CI runs with a read-only token and no secrets, uses only GitHub-authored actions pinned to full commit SHAs, and installs tools from hash-verified downloads.
- Every change is scanned by Trivy (from a signature-verified release): dependency vulnerabilities fail the build on HIGH or CRITICAL findings, and a secret scan covers the whole repository, including docs and tests.
