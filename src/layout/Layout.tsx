import {Outlet} from "react-router-dom";
import Footer from "@/component/Footer.tsx";
import Header from "@/component/Header.tsx";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 max-w-5xl mx-auto w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}