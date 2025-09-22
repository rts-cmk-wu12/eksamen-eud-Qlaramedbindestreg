import Footer from "./components/ui/footer";
import Header from "./components/ui/header";
import "./globals.css";
import { Inter } from "next/font/google";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});


export const metadata = {
  title: "SwapHub",
  description: "SwapHub er et community af loppemarkedsentusiaster, som ønsker at udvide deres virke til Internettet.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${interSans.variable}`}>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
