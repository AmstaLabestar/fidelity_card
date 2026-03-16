import Footer from "@/src/components/layout/Footer";
import MarketingNavbar from "@/src/components/layout/MarketingNavbar";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingNavbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

