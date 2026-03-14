import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../index.css";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import AuthProvider from "@/src/components/providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SmartCard | Exclusive Local Discounts & Founder's Edition",
  description: "Unlock up to 50% off at local merchants. Join the Founder's Edition pre-order and lock in lifetime benefits with the SmartCard RFID & QR system.",
  openGraph: {
    title: "SmartCard | Exclusive Local Discounts",
    description: "Join the future of local commerce. Reserve your Founder's Edition SmartCard today.",
    images: ["https://picsum.photos/seed/smartcard/1200/630"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartCard | Exclusive Local Discounts",
    description: "Unlock exclusive savings at your favorite local spots.",
    images: ["https://picsum.photos/seed/smartcard/1200/630"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

