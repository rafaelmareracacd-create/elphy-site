import type { Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const viewport: Viewport = { themeColor: "#0b0f14" };

export default function LegadoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
