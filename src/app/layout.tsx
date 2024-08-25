import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import ClientProvider from "@/providers/ClientProvider";

import "./globals.css";
import Footer from "@/components/layouts/Footer";
import { AI } from "@/chatBot/rsc/ai";
import { Chat } from "@/chatBot/ui/components/chat";

export const metadata: Metadata = {
  metadataBase: new URL("https://alibaba-toteltech.vercel.app"),

  title: "Alibaba",
  description: "pants shop",
  category: "ecommerce",
  icons: {
    icon: "images/Logo.png",
  },

  authors: { name: "Bouzid khairi" },
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Men",
    "Shoes",
    "Pants",
    "Clothing",
  ],
  creator: "Mohamed khairi bouzid",
  publisher: "Mohamed khairi bouzid",
  openGraph: {
    title: "Alibaba",
    description: "Pants shop",
    url: "https://alibaba-toteltech.vercel.app/",
    siteName: "Alibaba",
    images: "images/Logo.png",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alibaba",
    description: "Pants shop",
    images: ["images/Logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          {children}
          <AI>
            <Chat/>
          </AI>
        </ClientProvider>
      </body>
    </html>
  );
}
