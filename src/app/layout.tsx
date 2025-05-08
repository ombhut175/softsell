import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://softsell.com'), // Replace with your actual domain
  title: {
    default: "SoftSell - Sell Your Software Licenses",
    template: "%s | SoftSell"
  },
  description: "Sell your unused software licenses quickly and securely with SoftSell. Get instant quotes, secure transactions, and expert support for Microsoft, Adobe, and more.",
  keywords: [
    "software license marketplace",
    "sell software licenses",
    "Microsoft license resale",
    "Adobe license marketplace",
    "software license trading",
    "unused software licenses",
    "license resale platform",
    "secure license trading"
  ],
  authors: [{ name: "SoftSell Team" }],
  creator: "SoftSell",
  publisher: "SoftSell",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://softsell.com",
    siteName: "SoftSell",
    title: "SoftSell - Sell Your Software Licenses",
    description: "Sell your unused software licenses quickly and securely with SoftSell. Get instant quotes, secure transactions, and expert support.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SoftSell - Software License Marketplace"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SoftSell - Sell Your Software Licenses",
    description: "Sell your unused software licenses quickly and securely with SoftSell. Get instant quotes, secure transactions, and expert support.",
    images: ["/twitter-image.jpg"],
    creator: "@softsell",
    site: "@softsell"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.png",
        type: "image/png",
        sizes: "32x32",
      },
    ],
    apple: {
      url: "/apple-icon.png",
      sizes: "180x180",
    },
  },
  verification: {
    google: "your-google-site-verification", // Add your Google verification code
    yandex: "your-yandex-verification", // Add your Yandex verification code
    bing: "your-bing-verification", // Add your Bing verification code
  },
  alternates: {
    canonical: "https://softsell.com",
    languages: {
      'en-US': 'https://softsell.com',
      // Add other language versions if available
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#4F46E5" />
        <meta name="color-scheme" content="light dark" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
