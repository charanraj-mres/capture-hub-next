// app/(main)/layout.tsx
"use client";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
