import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});


export const metadata: Metadata = {
  title: 'Hakika Tips – Sports Prediction Intelligence',
  description: 'Data-driven sports tips from verified tipsters across East Africa. Follow top analysts, build bet slips, and win consistently.',
  keywords: 'sports betting tips, football predictions, Kenya betting, Tanzania tips, East Africa sports',
  openGraph: {
    title: 'Hakika Tips – Sports Prediction Intelligence',
    description: 'Follow verified tipsters and make smarter betting decisions every day.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.className}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
