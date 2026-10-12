import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Política de Privacidade",
    description: "Como a Codly coleta, usa e protege seus dados pessoais.",
};

export default function PrivacySecurityPage() {
    return (
        <section className="mx-auto w-400 max-w-6xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Política de Privacidade
            </h1>
        </section>
    );
}