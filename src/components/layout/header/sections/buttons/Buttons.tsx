"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/hooks/useTheme";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import LaunchModal from "../launchModal/LaunchModal";

export default function Buttons() {
    const { isDark, toggleTheme } = useTheme();
    const [isLaunchOpen, setIsLaunchOpen] = useState(false);

    return (
        <>
            <div className="flex items-center gap-2">
                <LanguageSwitcher />

                <button type="button" onClick={toggleTheme} aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"} className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-lavender hover:text-primary">
                    {isDark ? <FiSun size={17} /> : <FiMoon size={17} />}
                </button>

                <button type="button" onClick={() => setIsLaunchOpen(true)} className="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-surface px-5 text-sm font-medium text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-lavender hover:text-primary">
                    Entrar
                </button>

                <Link href="/cadastro" className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white shadow-[0_6px_18px_rgba(124,58,237,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_8px_24px_rgba(124,58,237,0.3)]">
                    Começar grátis
                </Link>
            </div>

            <LaunchModal isOpen={isLaunchOpen} onClose={() => setIsLaunchOpen(false)} />
        </>
    );
}
