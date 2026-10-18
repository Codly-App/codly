"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type NavKey = "courses" | "about" | "howItWorks" | "gamification" | "plans";

type ItemNav = {
    id: number;
    key: NavKey;
    href: string;
};

const navLinks: ItemNav[] = [
    { id: 1, key: "courses", href: "/#cursos" },
    { id: 2, key: "about", href: "/#sobre" },
    { id: 3, key: "howItWorks", href: "/#como-funciona" },
    { id: 4, key: "gamification", href: "/gamification" },
    { id: 5, key: "plans", href: "/planos" },
];

export default function Navigation() {
    const t = useTranslations("Header.navigation");

    return (
        <nav aria-label={t("ariaLabel")} className="flex items-center">
            <ul className="flex items-center gap-8">
                {navLinks.map((item) => (
                    <li key={item.id}>
                        <Link href={item.href} className="group relative inline-flex items-center py-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-primary">
                            {t(item.key)}
                            <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 group-hover:w-full" />
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
