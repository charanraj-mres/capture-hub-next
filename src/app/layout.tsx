import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/components/Auth/AuthProvider";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/ScrollToTop";
const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${font.className}`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            enableSystem={true}
            defaultTheme="system"
          >
            <Toaster position="top-center" />
            <Header />
            {children}
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
