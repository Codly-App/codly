import type { Metadata } from "next";
import ContactMain from "@/components/contact/ContactMain";

export const metadata: Metadata = {
    title: "Contato",
    description: "Fale com a equipe da Codly. Tire dúvidas, dê sugestões ou reporte um problema.",
};

export default function contactPage() {
    return (
        <ContactMain/>
    )
}