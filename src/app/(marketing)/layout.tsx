import Footer from "@/src/components/layout/Footer";
import MarketingNavbar from "@/src/components/layout/MarketingNavbar";
import MetaPixel from "@/src/components/marketing/MetaPixel";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <MetaPixel />
      <MarketingNavbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
