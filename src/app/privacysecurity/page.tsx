import PrivacySecurity from "@/components/privacysecurity/PrivacySecurity";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Política de Privacidade",
    description: "Como a Codly coleta, usa e protege seus dados pessoais.",
};

export default function PrivacySecurityPage() {
    return (
        <PrivacySecurity />
    );
}