import "@/styles/globals.css";
import "@/styles/components/navbar.css";
import "@/styles/components/footer.css";
import { Kanit, Genos } from "next/font/google";

const kanit = Kanit({
  subsets: ["latin", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
});

const genos = Genos({
  subsets: ["latin", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-genos",
});

export const metadata = {
  title: "Home Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${kanit.variable} ${genos.variable}`}>
      <body>{children}</body>
    </html>
  );
}
