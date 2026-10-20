
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Logo from "@/components/layout/header/sections/logo/Logo";
import Container from "@/ui/Container";

type FooterKey =
    | "courses"
    | "plans"
    | "gamification"
    | "about"
    | "contact"
    | "privacy"
    | "webPwa"
    | "android"
    | "ios";

type FooterGroupKey = "product" | "company" | "platforms";

type FooterLink = {
    id: number;
    key: FooterKey;
    href: string;
};

type FooterGroup = {
    id: FooterGroupKey;
    links: FooterLink[];
};

const footerGroups: FooterGroup[] = [
    {
        id: "product",
        links: [
            { id: 1, key: "courses", href: "/#cursos" },
            { id: 2, key: "plans", href: "/Plans" },
            { id: 3, key: "gamification", href: "/gamification" },
        ],
    },
    {
        id: "company",
        links: [
            { id: 4, key: "about", href: "/#sobre" },
            { id: 5, key: "contact", href: "/contact" },
            { id: 6, key: "privacy", href: "/privacysecurity" },
        ],
    },
    {
        id: "platforms",
        links: [
            { id: 7, key: "webPwa", href: "/#instalar-app" },
            { id: 8, key: "android", href: "/#android" },
            { id: 9, key: "ios", href: "/#ios" },
        ],
    },
];

// Calcula o ano dentro de um escopo de cache do Next.js 16.
async function getCurrentYear(): Promise<number> {
    "use cache";

    return new Date().getFullYear();
}

export default async function Footer() {
    const t = await getTranslations("Footer");
    const currentYear = await getCurrentYear();

    return (
        <footer className="w-full border-t border-border bg-background">
            <Container className="pt-14 pb-6">
                <div className="grid grid-cols-1 gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] lg:gap-10">
                    <div className="flex max-w-xs flex-col items-start">
                        <Logo />

                        <p className="mt-4 text-sm font-medium text-muted">
                            {t("companyName")}
                        </p>

                        <p className="mt-1 max-w-65 text-sm leading-6 text-muted">
                            {t("description")}
                        </p>
                    </div>

                    {footerGroups.map((group) => (
                        <nav key={group.id} aria-label={t(group.id)} className="flex flex-col items-start">
                            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-foreground">
                                {t(group.id)}
                            </h3>

                            <ul className="flex flex-col gap-3">
                                {group.links.map((item) => (
                                    <li key={item.id}>
                                        <Link href={item.href} className="inline-flex text-sm text-muted transition-colors duration-300 hover:text-primary">
                                            {t(item.key)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>

                <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-5 text-muted">
                        © {currentYear} {t("companyName")} {t("rights")}
                    </p>

                    <p className="text-xs text-muted">
                        {t("madeWithLove")}
                    </p>
                </div>
            </Container>
        </footer>
    );
}
