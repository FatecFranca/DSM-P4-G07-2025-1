import "./globals.css";

export const metadata = {
  title: "Petdex",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="font-poppins bg-white">
        {children}
      </body>
    </html>
  );
}
