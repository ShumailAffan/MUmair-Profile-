import type { Metadata } from "next";
import "./globals.css";
import { identity, contact } from "@/lib/data";

const title = `${identity.name} — ${identity.title} | Faisalabad`;
const description = `${identity.positioning}. ${identity.name}, ${identity.title} in ${identity.location}.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://REPLACE-WITH-DOMAIN"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ ["--font-display" as any]: "Georgia, serif", ["--font-body" as any]: "system-ui, sans-serif" }}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Attorney",
              name: identity.name,
              jobTitle: identity.title,
              areaServed: identity.location,
              address: {
                "@type": "PostalAddress",
                streetAddress: contact.officeAddress,
                addressLocality: "Faisalabad",
                addressCountry: "PK",
              },
              openingHours: "Mo-Sa 15:00-19:00",
            }),
          }}
        />
      </head>
      <body className="bg-ivory text-navyink font-sans antialiased">{children}</body>
    </html>
  );
}
