import "@/styles/globals.css";
import "@/styles/components/navbar.css";
import "@/styles/components/footer.css";
import { Kanit } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const kanit = Kanit({
  subsets: ["latin", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
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
    <html lang="vi" className={`${kanit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
