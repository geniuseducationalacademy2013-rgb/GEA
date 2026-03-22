import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin Panel - Genius Educational Academy",
  description: "Admin panel for managing website content",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50 antialiased">
      {children}
    </div>
  );
}
