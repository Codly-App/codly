import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { routing } from "@/i18n/routing";
import Header from "@/components/layout/header/Header";
import MessegerBot from "@/components/layout/messegerBot/MessegerBot";
import ThemeScript from "@/components/layout/ThemeScript";

import "../globals.css";

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    return (
        <html lang={locale} suppressHydrationWarning className="h-full antialiased">
            <body className="flex min-h-screen flex-col bg-background text-foreground">
                <ThemeScript />

                <NextIntlClientProvider>
                    <Header />

                    <main className="flex-1 pt-16 sm:pt-18 lg:pt-20">
                        {children}
                    </main>

                    <MessegerBot />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
