import Link from "next/link";

type ItemNav = {
    id: number;
    name: string;
    href: string;
};

const navLinks: ItemNav[] = [
    { id: 1, name: "Cursos", href: "#cursos" },
    { id: 2, name: "Sobre", href: "#cursos" },
    { id: 3, name: "Como funciona", href: "#como-funciona" },
    { id: 4, name: "Gamificação", href: "/gamification" },
    { id: 5, name: "Planos", href: "#planos" },
];

export default function Navigation() {
    return (
        <nav aria-label="Navegação principal" className="flex items-center">
            <ul className="flex items-center gap-8">
                {navLinks.map((item) => (
                    <li key={item.id}>
                        <Link href={item.href} className="group relative inline-flex items-center py-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-primary">
                            {item.name}         
                            <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 group-hover:w-full" />
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}