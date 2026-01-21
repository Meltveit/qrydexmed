import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { OrganizationSchema, WebSiteSchema } from "@/components/Schema";

const inter = Inter({ subsets: ["latin"] });

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-ES9S2XGF6N";

export const metadata: Metadata = {
  title: {
    default: "Qrydex - The World's AI Index for Longevity & Biohacking",
    template: "%s | Qrydex",
  },
  description: "Discover top-rated longevity clinics, stem cell therapy centers, and biohacking facilities across the globe. Compare prices, read reviews, and book consultations.",
  keywords: ["longevity clinics", "stem cell therapy", "biohacking", "anti-aging", "regenerative medicine", "medical tourism", "NAD+ therapy", "exosome therapy"],
  authors: [{ name: "LongevityIndex" }],
  creator: "Qrydex",
  publisher: "Qrydex",
  metadataBase: new URL("https://www.qrydex.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png", // Ideally generate a specific apple touch icon, but this works for now
  },
  openGraph: {
    title: "Qrydex - Global Longevity Clinic Directory",
    description: "Find and compare the world's best longevity and biohacking clinics",
    url: "https://www.qrydex.com",
    siteName: "Qrydex",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qrydex - Global Longevity Clinic Directory",
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
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
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
