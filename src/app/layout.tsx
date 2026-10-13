import type { Metadata, Viewport } from "next";
import "./globals.css";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import MessegerBot from "@/components/layout/messegerBot/MessegerBot";
import ThemeScript from "@/components/layout/ThemeScript";


const siteUrl = "https://codly.com.br";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),

    title: {
        default: "Codly | Aprenda Programação de Forma Prática e Divertida",
        template: "%s | Codly",
    },

    description: "Aprenda programação de forma prática e gamificada com a Codly. Complete desafios, resolva atividades, evolua suas habilidades, conquiste posições no ranking e aprenda a programar todos os dias.",

    applicationName: "Codly",

    keywords: [
        "Codly",
        "aprender programação",
        "aprender a programar",
        "programação para iniciantes",
        "plataforma para aprender programação",
        "aplicativo para aprender programação",
        "programação gamificada",
        "desafios de programação",
        "exercícios de programação",
        "atividades de programação",
        "lógica de programação",
        "praticar programação",
        "aprender código",
        "desafios de código",
        "ranking de programação",
        "gamificação na programação",
    ],

    authors: [{ name: "Codly" }],
    creator: "Codly",
    publisher: "Codly",

    category: "education",

    alternates: {
        canonical: "/",
        languages: {
        "pt-BR": "/",
        },
    },

    icons: {
        icon: [
        { url: "/favicon.ico" },
        { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
        ],
        apple: [
        { url: "/icons/apple-touch-icon.png", sizes: "180x180" },
        ],
    },

    openGraph: {
        title: "Codly | Aprenda Programação de Forma Prática e Divertida",
        description: "Aprenda programação com desafios, atividades, rankings e uma experiência gamificada criada para tornar sua evolução mais prática, divertida e constante.",
        url: "/",
        siteName: "Codly",
        locale: "pt_BR",
        type: "website",
        images: [
        {
            url: "/og/codly-og.png",
            width: 1200,
            height: 630,
            alt: "Codly - Aprenda programação de forma prática e gamificada",
        },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Codly | Aprenda Programação de Forma Prática e Divertida",
        description: "Desafios, atividades, rankings e aprendizado gamificado para você evoluir na programação.",
        images: ["/og/codly-og.png"],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
        },
    },

    other: {
        "theme-color": "#7c3aed",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#7c3aed",
};


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
            <body className="flex min-h-screen flex-col bg-background text-foreground">
                <ThemeScript />
                <Header />
                <main className="flex-1 pt-16 sm:pt-18 lg:pt-20">
                    {children}
                </main>
                <MessegerBot />
                <Footer />
            </body>
        </html>
    );
}