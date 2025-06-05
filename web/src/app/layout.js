// app/layout.js
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], 
  variable: "--font-poppins", 
  display: "swap",
});

export const metadata = {
  title: "Petdex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br" className={poppins.variable}>
      <body className="font-poppins bg-white">
        {children}
      </body>
    </html>
  );
}
