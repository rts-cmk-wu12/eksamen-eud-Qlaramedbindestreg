import Footer from "./components/ui/footer";
import Header from "./components/ui/header";
import "./globals.css";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});


export const metadata = {
  title: "SwapHub",
  description: "SwapHub er et community af loppemarkedsentusiaster, som ønsker at udvide deres virke til Internettet.",
};

export default function RootLayout({ children }) {
   const cookieStore = cookies();
   const token = cookieStore.get("sh_token");

   const user = token ? { token: token.value } : null;
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <Header use={user}></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
