import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Provider from "@/app/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Service",
  description: "Developed by Moheb",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Header />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
