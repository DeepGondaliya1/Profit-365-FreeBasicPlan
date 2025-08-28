import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "P365 Market Education - Join for Free",
  description: "Start your free 30-day trial of the best trading course online! Join 4500+ students learning trending investment strategies. No risk, cancel anytime. Start learning today!",
  keywords: [
    "free trading course trial",
    "join best investment education",
    "trending trading course 2025",
    "free stock market learning",
    "30 day trial trading",
    "best online finance course",
    "free market analysis course",
    "investment education trial"
  ],
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
