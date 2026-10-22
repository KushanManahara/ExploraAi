// apps/web/app/layout.tsx
// ROOT LAYOUT. DESIGN TOKENS AND FONTS ARE WIRED IN DURING M8.
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ExploraAi",
  description: "AI research workspace. In development.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
