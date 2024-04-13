import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/context/theme-provider";

import {
  ClerkProvider,
} from "@clerk/nextjs";
import TopLoadingBar from "@/components/ui/top-loader";
import Header from "@/components/publc_home_page/header";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Pair Pro",
  description: "Stuck on something, find people to pair program with!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={GeistSans.className}>
          <TopLoadingBar />
          <Toaster />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
