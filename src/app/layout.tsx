import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV Genius AI | Votre prochain emploi commence par un CV exceptionnel",
  description: "Créez des CV modernes, professionnels et optimisés ATS grâce à l'intelligence artificielle. Assistances de recrutement, lettres de motivation et simulateur d'entretien.",
  keywords: "CV, Intelligence Artificielle, ATS, Recrutement, Lettre de motivation, Simulateur entretien, Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground animate-fade-in">
        <AppProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
