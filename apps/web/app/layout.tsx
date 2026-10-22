// apps/web/app/layout.tsx
// ROOT LAYOUT. A SMALL TOKEN SUBSET IS LOADED NOW; THE FULL DESIGN SYSTEM AND FONTS ARRIVE IN M8.
import "./globals.css";

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
