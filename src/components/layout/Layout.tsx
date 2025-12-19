import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import GlobalSEO from "@/components/seo/GlobalSEO";
import BackToTop from "@/components/ui/back-to-top";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <GlobalSEO />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
