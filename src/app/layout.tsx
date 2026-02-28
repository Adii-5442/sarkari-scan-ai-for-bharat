import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileAppBanner from "@/components/MobileAppBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const currentYear = new Date().getFullYear();

export const metadata: Metadata = {
  metadataBase: new URL("https://sarkariscan.com"),
  title: {
    default: `Sarkari Scan – Sarkari Naukri ${currentYear}, Sarkari Result, Govt Jobs Notification`,
    template: `%s | Sarkari Scan – Govt Jobs ${currentYear}`,
  },
  description: `Sarkari Scan – India's #1 portal for latest sarkari naukri ${currentYear}, sarkari result, government job notifications. Find UPSC, SSC, Railway, Bank, Defence, Teaching & PSU govt jobs. Check eligibility, apply online & get free job alerts. Updated daily.`,
  alternates: {
    canonical: "https://sarkariscan.com",
  },
  manifest: "/site.webmanifest",
  keywords: [
    "sarkari naukri",
    `sarkari naukri ${currentYear}`,
    "sarkari result",
    "government jobs",
    `government jobs ${currentYear}`,
    "govt jobs",
    "sarkari job",
    "sarkari exam",
    "free job alert",
    "railway jobs",
    "bank jobs",
    "SSC recruitment",
    "UPSC jobs",
    "defense jobs",
    "police jobs",
    "teaching jobs",
    "sarkari vacancy",
    "central government jobs",
    "state government jobs",
    "10th pass govt jobs",
    "12th pass govt jobs",
    "sarkariscan",
  ],
  authors: [{ name: "Sarkari Scan", url: "https://sarkariscan.com" }],
  creator: "Sarkari Scan",
  publisher: "Sarkari Scan",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sarkariscan.com",
    siteName: "Sarkari Scan",
    title: `Sarkari Scan – Latest Sarkari Naukri & Government Jobs ${currentYear}`,
    description: `Find latest sarkari naukri ${currentYear}, sarkari result, govt job notifications. UPSC, SSC, Railway, Bank, Defence, Teaching jobs. Check eligibility & apply online. Free job alerts.`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `Sarkari Scan – Latest Government Jobs & Sarkari Naukri ${currentYear}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Sarkari Scan – Sarkari Naukri ${currentYear} | Govt Jobs`,
    description: `Find latest sarkari naukri ${currentYear}. UPSC, SSC, Railway, Bank jobs. Apply online!`,
    images: ["/og-image.png"],
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Sarkari Scan",
              alternateName: ["SarkariScan", "Sarkari Scan App"],
              url: "https://sarkariscan.com",
              description:
                "India's trusted portal for latest sarkari naukri, government job notifications. Check eligibility, apply online & get free job alerts.",
              inLanguage: "en-IN",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://sarkariscan.com/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "Sarkari Scan",
                logo: {
                  "@type": "ImageObject",
                  url: "https://sarkariscan.com/logo.png",
                },
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Sarkari Scan",
              alternateName: "SarkariScan",
              url: "https://sarkariscan.com",
              logo: "https://sarkariscan.com/logo.png",
              description:
                "Sarkari Scan is India's modern platform for latest sarkari naukri notifications, government job alerts, and sarkari result updates.",
              foundingDate: "2024",
              sameAs: [
                "https://play.google.com/store/apps/details?id=com.sarkariscan",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                availableLanguage: ["English", "Hindi"],
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <MobileAppBanner />
        <Footer />
      </body>
    </html>
  );
}
