
import Link from "next/link";
import Logo from "@/components/layout/header/sections/logo/Logo";

type FooterLink = {
    id: number;
    name: string;
    href: string;
};

type FooterGroup = {
    id: string;
    title: string;
    links: FooterLink[];
};

const footerGroups: FooterGroup[] = [
    {
        id: "produto",
        title: "Produto",
        links: [
            { id: 1, name: "Cursos", href: "/#cursos" },
            { id: 2, name: "Planos", href: "/#planos" },
            { id: 3, name: "Gamificação", href: "/gamification" },
        ],
    },
    {
        id: "empresa",
        title: "Empresa",
        links: [
            { id: 4, name: "Sobre", href: "/" },
            { id: 5, name: "Contato", href: "/contact" },
            { id: 6, name: "Termos e privacidade", href: "/privacysecurity" },
        ],
    },
    {
        id: "plataformas",
        title: "Plataformas",
        links: [
            { id: 7, name: "Web & PWA", href: "/#instalar-app" },
            { id: 8, name: "Android", href: "/#android" },
            { id: 9, name: "iOS", href: "/#ios" },
        ],
    },
];

export default async function Footer() {
    "use cache";
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-border bg-background">
            <div className="mx-auto w-400 max-w-full pt-14 pb-6">
                <div className="grid grid-cols-1 gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] lg:gap-10">
                    <div className="flex max-w-xs flex-col items-start">
                        <Logo />

                        <p className="mt-4 text-sm font-medium text-muted">
                            Codly Tecnologia Educacional LTDA.
                        </p>

                        <p className="mt-1 max-w-65 text-sm leading-6 text-muted">
                            Plataforma gamificada para aprender programação em lições curtas.
                        </p>
                    </div>

                    {footerGroups.map((group) => (
                        <nav key={group.id} aria-label={group.title} className="flex flex-col items-start">
                            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-foreground">
                                {group.title}
                            </h3>

                            <ul className="flex flex-col gap-3">
                                {group.links.map((item) => (
                                    <li key={item.id}>
                                        <Link href={item.href} className="inline-flex text-sm text-muted transition-colors duration-300 hover:text-primary">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>

                <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-5 text-muted">
                        © {currentYear} Codly Tecnologia Educacional LTDA. Todos os direitos reservados.
                    </p>

                    <p className="text-xs text-muted">
                        Feito com carinho e capivaras.
                    </p>
                </div>
            </div>
        </footer>
    );
}
