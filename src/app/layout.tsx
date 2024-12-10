// src/app/layout.tsx
import { Figtree } from "next/font/google";
import "../style/base/index.scss"; // Global stil dosyasını burada import ediyoruz

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Sunucu tarafında metadata'yı tanımlıyoruz
export const metadata = {
  title: "Next.js Project",
  description: "Next.js ile geliştirilen modern web uygulaması",
  icons: {
    icon: "/favicon.ico", // favicon desteği
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${figtree.className} antialiased `}>
      <div className="relative bg-cover bg-center bg-[url('/image/bg5.webp')] bg-no-repeat p-4">

      <main className="container mx-auto  flex-grow z-50 ">{children}</main>
</div>
      </body>
    </html>
  );
}
