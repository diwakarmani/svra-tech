import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SVRA Technologies Private Limited – Guiding You to the Best IT Solutions",
  description:
    "SVRA Technologies Private Limited delivers managed IT services including security, network solutions, remote support, and app development. Based in Challapalli, AP, India. Available 24/7.",
  keywords: [
    "IT solutions",
    "managed IT",
    "network solutions",
    "cybersecurity",
    "remote support",
    "app development",
    "Challapalli AP India",
    "SVRA Technologies",
  ],
  openGraph: {
    title: "SVRA Technologies Private Limited",
    description:
      "Customized IT solutions tailored to your business goals. Security, networking, remote support, and app development.",
    url: "https://svra-tech.com",
    siteName: "SVRA Technologies Private Limited",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
