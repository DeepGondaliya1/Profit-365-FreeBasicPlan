import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Login Page",
  description: "Login to access personalized trading signals",
  icons: {
    icon: "/Profit-365-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
