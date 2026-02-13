import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cuaca Pekanbaru - BMKG',
  description: 'Prakiraan cuaca Pekanbaru dari BMKG dengan data 83 kelurahan dan 15 kecamatan',
  keywords: 'cuaca, pekanbaru, bmkg, prakiraan cuaca, weather, riau',
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