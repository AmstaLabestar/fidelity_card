import Footer from "@/src/components/layout/Footer";
import Navbar from "@/src/components/layout/Navbar";
import AuthProvider from "@/src/components/providers/AuthProvider";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

