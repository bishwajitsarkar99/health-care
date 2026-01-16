// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./index.css";
import "./table.css";
import { Toaster } from "react-hot-toast";
// import Header from "./components/Header";
// import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediCare+ - Your Trusted Healthcare Partner",
  description:
    "Book appointments with the best doctors in your area. Quality healthcare at your convenience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} bg-white text-gray-900`}>
        {/* <Header /> */}
        <main className="min-h-screen">
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#fff",
                color: "#222",
                fontWeight: "600",
                borderRadius: "8px",
                padding: "8px 16px",
              },
            }}
          />
        </main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
