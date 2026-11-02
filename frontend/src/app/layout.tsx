import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ClerkSync } from "@/components/auth/clerk-sync";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pravasan | ಪ್ರವಾಸನ್ - Karnataka Tour & Travel Platform",
    template: "%s | Pravasan (ಪ್ರವಾಸನ್)",
  },
  description: "Explore Karnataka's rich heritage, Western Ghats, coastal beaches, and royal palaces with Pravasan (ಪ್ರವಾಸನ್). Plan journeys, discover curated destinations, and book authentic Karnataka travel experiences.",
  keywords: ["pravasan", "ಪ್ರವಾಸನ್", "karnataka tourism", "karnataka travel planner", "hampi tour", "mysuru palace", "western ghats", "gokarna beaches"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/tripzyy-icon.svg", type: "image/svg+xml" },
      { url: "/tripzyy-icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/tripzyy-icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;500;600;700;800;900&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Space+Grotesk:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FFF5E9] text-[#171313] antialiased">
        <ClerkProvider>
          <ClerkSync />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
