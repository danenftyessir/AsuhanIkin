import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgriConnect - Platform Investasi Pertanian",
  description:
    "Menghubungkan investor dengan petani melalui teknologi IoT modern",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
