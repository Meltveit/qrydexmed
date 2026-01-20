import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { OrganizationSchema, WebSiteSchema } from "@/components/Schema";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "LongevityIndex - Find the Best Longevity & Biohacking Clinics Worldwide",
    template: "%s | LongevityIndex",
  },
  description: "Discover top-rated longevity clinics, stem cell therapy centers, and biohacking facilities across the globe. Compare prices, read reviews, and book consultations.",
  keywords: ["longevity clinics", "stem cell therapy", "biohacking", "anti-aging", "regenerative medicine", "medical tourism", "NAD+ therapy", "exosome therapy"],
  authors: [{ name: "LongevityIndex" }],
  creator: "LongevityIndex",
  publisher: "LongevityIndex",
  metadataBase: new URL("https://longevityindex.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "LongevityIndex - Global Longevity Clinic Directory",
    description: "Find and compare the world's best longevity and biohacking clinics",
    url: "https://longevityindex.com",
    siteName: "LongevityIndex",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LongevityIndex - Global Longevity Clinic Directory",
    description: "Find and compare the world's best longevity and biohacking clinics",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add these when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body className={`${inter.className} antialiased bg-white text-slate-900 min-h-screen`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
