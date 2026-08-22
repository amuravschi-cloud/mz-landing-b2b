import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Viewport with proper accessibility scaling (Fixes Google Mobile Audit)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#081b15",
};

// Optimized Title & Description (No spam, no typos, high CTR for Google TOP-1)
export const metadata: Metadata = {
  metadataBase: new URL("https://www.mz.md"),
  title: "Metalica Zuev — Металлопрокат в Молдове | 3 Металлобазы и Склад",
  description: "Оптово-розничная продажа металлопроката в Кишиневе, Орхее и по всей Молдове. 450+ позиций: арматура А500С, профильные и круглые трубы, листовой прокат, балка, швеллер. Резка в размер и доставка.",
  keywords: [
    "металлопрокат молдова",
    "металлобаза кишинев",
    "арматура а500с купить молдова",
    "профильная труба кишинев",
    "лист оцинкованный молдова",
    "швеллер кишинев",
    "балка двутавровая молдова",
    "depozit metal chisinau",
    "armatura pret md",
    "teava patrata pret moldova",
    "metalica zuev"
  ],
  alternates: {
    canonical: "https://www.mz.md",
    languages: {
      "ru-MD": "https://www.mz.md",
      "ro-MD": "https://www.mz.md/?lang=ro",
      "x-default": "https://www.mz.md",
    },
  },
  openGraph: {
    title: "Metalica Zuev — Металлопрокат со склада в Молдове",
    description: "450+ наименований металлопроката в наличии. 3 открытые металлобазы и логистический хаб. Комплектация, резка в размер и оперативная доставка.",
    url: "https://www.mz.md",
    siteName: "Metalica Zuev",
    images: [
      {
        url: "/images/real/DSC00319.jpg",
        width: 1200,
        height: 630,
        alt: "Металлобаза Metalica Zuev в Кишиневе",
      },
    ],
    locale: "ru_MD",
    type: "website",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Schema.org LocalBusiness + Organization + AggregateOffer JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.mz.md/#organization",
        "name": "Metalica Zuev SRL",
        "url": "https://www.mz.md",
        "logo": "https://www.mz.md/images/logo/MZ_Logo_Dark_Green.png",
        "foundingDate": "1989",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+373-68-471530",
          "contactType": "sales",
          "areaServed": "MD",
          "availableLanguage": ["Russian", "Romanian"]
        }
      },
      {
        "@type": "AutoPartsStore",
        "@id": "https://www.mz.md/#base1",
        "name": "Metalica Zuev — Металлобаза №1 (Кишинёв)",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "str. Industrială, 48",
          "addressLocality": "Chișinău",
          "addressCountry": "MD"
        },
        "telephone": "+373-68-471530",
        "openingHours": "Mo-Fr 08:00-17:00"
      },
      {
        "@type": "AutoPartsStore",
        "@id": "https://www.mz.md/#base3",
        "name": "Metalica Zuev — Региональная Металлобаза №3 (Орхей)",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "str. Unirii, 49D",
          "addressLocality": "Orhei",
          "addressCountry": "MD"
        },
        "telephone": "+373-68-471530",
        "openingHours": "Mo-Fr 08:00-17:00, Sa 08:00-14:00"
      }
    ]
  };

  return (
    <html lang="ru" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#07120e] text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
