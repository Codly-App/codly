"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const languages = [
    { code: "pt-BR", name: "Português", flag: "🇧🇷", short: "PT" },
    { code: "en", name: "English", flag: "🇺🇸", short: "EN" },
    { code: "es", name: "Español", flag: "🇪🇸", short: "ES" },
] as const;

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const reduceMotion = useReducedMotion();

    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const containerRef = useRef<HTMLDivElement>(null);

    const currentLanguage = languages.find((language) => language.code === locale) ?? languages[0];

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: PointerEvent) => {
            if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("pointerdown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    const changeLanguage = (nextLocale: (typeof languages)[number]["code"]) => {
        setIsOpen(false);
        if (nextLocale === locale) return;

        startTransition(() => {
            router.replace(pathname, { locale: nextLocale, scroll: false });
        });
    };

    return (
        <div ref={containerRef} className="relative">
            <button type="button" onClick={() => setIsOpen((prev) => !prev)} disabled={isPending} aria-label={`Idioma atual: ${currentLanguage.name}. Alterar idioma`} aria-haspopup="menu" aria-expanded={isOpen} className="flex h-10 cursor-pointer items-center gap-2 rounded-full border border-border bg-surface px-3 text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-lavender disabled:cursor-wait disabled:opacity-60">
                <span className="text-lg leading-none" aria-hidden="true">{currentLanguage.flag}</span>
                <span className="text-xs font-semibold">{currentLanguage.short}</span>
                <FiChevronDown size={13} className={`text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        role="menu"
                        aria-label="Selecionar idioma"
                        initial={{ opacity: 0, y: reduceMotion ? 0 : -8, scale: reduceMotion ? 1 : 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: reduceMotion ? 0 : -6, scale: reduceMotion ? 1 : 0.96 }}
                        transition={{ duration: reduceMotion ? 0.1 : 0.2 }}
                        className="absolute right-0 top-12 z-100 w-48 overflow-hidden rounded-2xl border border-border bg-surface p-1.5 shadow-[0_15px_45px_rgba(26,19,48,0.15)]"
                    >
                        {languages.map((language) => (
                            <button key={language.code} type="button" role="menuitemradio" aria-checked={locale === language.code} onClick={() => changeLanguage(language.code)} className={`flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors duration-200 hover:bg-lavender hover:text-primary ${locale === language.code ? "bg-lavender font-semibold text-primary" : "text-foreground"}`}>
                                <span className="text-xl" aria-hidden="true">{language.flag}</span>
                                <span className="flex-1">{language.name}</span>
                                {locale === language.code && <FiCheck size={16} />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
