import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Genius Educational Academy - Your dreams does not exist, you must create it",
  description: "Genius Educational Academy - From std 6th to 12th Science. All subjects provided under 1 roof. Established in 2013.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white">
        {children}
      </body>
    </html>
  );
}
