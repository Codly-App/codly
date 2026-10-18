
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { FiMenu, FiX, FiArrowRight, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/hooks/useTheme";
import LaunchModal from "../launchModal/LaunchModal";

type NavItem = {
    id: number;
    name: string;
    href: string;
};

const navLinks: NavItem[] = [
    { id: 1, name: "Cursos", href: "/#cursos" },
    { id: 2, name: "Como funciona", href: "/#como-funciona" },
    { id: 3, name: "Gamificação", href: "/#gamificacao" },
    { id: 4, name: "Planos", href: "/#planos" },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLaunchOpen, setIsLaunchOpen] = useState(false);

    const { isDark, toggleTheme } = useTheme();
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    const closeMenu = () => setIsOpen(false);

    const openLaunchModal = () => {
        setIsOpen(false);
        setIsLaunchOpen(true);
    };

    return (
        <>
            <button type="button" onClick={() => setIsOpen(true)} aria-label="Abrir menu" aria-expanded={isOpen} aria-controls="codly-mobile-menu" className="flex size-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface text-foreground transition-colors duration-300 hover:border-primary/30 hover:bg-lavender hover:text-primary lg:hidden">
                <FiMenu size={21} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.25 }}
                            onClick={closeMenu}
                            aria-hidden="true"
                            className="fixed inset-0 z-60 bg-[#0f0b1a]/60 backdrop-blur-sm lg:hidden"
                        />

                        <motion.aside
                            id="codly-mobile-menu"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Menu de navegação"
                            initial={{ x: reduceMotion ? 0 : "100%", opacity: reduceMotion ? 0 : 1 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: reduceMotion ? 0 : "100%", opacity: reduceMotion ? 0 : 1 }}
                            transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed inset-y-0 right-0 z-70 flex h-dvh w-[min(88vw,380px)] flex-col border-l border-border bg-background shadow-[-20px_0_60px_rgba(15,11,26,0.18)] lg:hidden"
                        >
                            <div className="flex h-20 shrink-0 items-center justify-between border-b border-border px-6">
                                <Link href="/" onClick={closeMenu} className="flex items-center gap-2.5">
                                    <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-extrabold text-white shadow-[0_5px_15px_rgba(124,58,237,0.25)]">
                                        C
                                    </span>
                                    <span className="text-lg font-extrabold tracking-tight text-foreground">
                                        Codly
                                    </span>
                                </Link>

                                <button type="button" onClick={closeMenu} aria-label="Fechar menu" className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface text-muted transition-colors hover:bg-lavender hover:text-primary">
                                    <FiX size={20} />
                                </button>
                            </div>

                            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-7">
                                <span className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
                                    Explore a Codly
                                </span>

                                <nav aria-label="Navegação mobile">
                                    <ul className="flex flex-col gap-1.5">
                                        {navLinks.map((item) => (
                                            <li key={item.id}>
                                                <Link href={item.href} onClick={closeMenu} className="group flex items-center justify-between rounded-xl px-3 py-3.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:bg-lavender hover:text-primary dark:hover:text-white">
                                                    {item.name}
                                                    <FiArrowRight size={16} className="text-muted/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>

                                <div className="mt-7 border-t border-border pt-6">
                                    <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            {isDark ? <FiMoon className="text-primary" size={18} /> : <FiSun className="text-primary" size={18} />}
                                            <span className="text-sm font-medium text-foreground">Aparência</span>
                                        </div>

                                        <button type="button" role="switch" aria-checked={isDark} aria-label="Ativar tema escuro" onClick={toggleTheme} className={`relative h-7 w-12 cursor-pointer rounded-full transition-colors duration-300 ${isDark ? "bg-primary" : "bg-border"}`}>
                                            <span className={`absolute top-1 left-1 size-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${isDark ? "translate-x-5" : "translate-x-0"}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="shrink-0 border-t border-border bg-background px-6 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                                <div className="flex flex-col gap-3">
                                    <button type="button" onClick={openLaunchModal} className="group flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-[0_7px_20px_rgba(124,58,237,0.22)] transition-colors hover:bg-primary-dark">
                                        Começar grátis
                                        <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                    </button>

                                    <button type="button" onClick={openLaunchModal} className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-foreground transition-colors hover:bg-lavender hover:text-primary">
                                        Entrar na minha conta
                                    </button>
                                </div>

                                <p className="mt-5 text-center text-[11px] text-muted">
                                    Aprenda. Pratique. Evolua. 💜
                                </p>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <LaunchModal isOpen={isLaunchOpen} onClose={() => setIsLaunchOpen(false)} />
        </>
    );
}
