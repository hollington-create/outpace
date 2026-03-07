import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ScrollToTop from "@/components/ScrollToTop";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
