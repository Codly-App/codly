'use client'

import Link from "next/link";

import { motion, AnimatePresence } from "motion/react";
import {
    FiArrowRight,
    FiChevronDown,
} from "react-icons/fi";

type FrequentlyQuestionsProps =  Readonly<{
    openFaq: number | null;
    setOpenFaq: (value: number | null) => void;
}>

export default function FrequentlyQuestions({openFaq, setOpenFaq}:FrequentlyQuestionsProps) {

    const miniFaq = [
        { q: "Preciso saber programar antes?", a: "Não, as trilhas começam do zero, com lições curtas." },
        { q: "Como funciona o período demo?", a: "São 7 dias grátis com acesso ao conteúdo iniciante." },
        { q: "Posso usar pelo celular?", a: "Sim, no navegador, como PWA e nos apps Android e iOS." },
    ];

    return (
        <motion.div
            variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}
            className="rounded-3xl border border-border bg-surface p-6"
        >
            <div className="mb-2 text-sm font-extrabold text-foreground">Dúvidas rápidas</div>
            {miniFaq.map((item, i) => {
                const open = openFaq === i;
                return (
                    <div key={item.q} className="border-b border-border last:border-b-0">
                        <button
                            type="button"
                            onClick={() => setOpenFaq(open ? null : i)}
                            className="flex w-full items-center justify-between gap-3 py-3.5 text-left"
                        >
                            <span className="text-[13.5px] font-bold text-foreground">{item.q}</span>
                            <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-primary">
                                <FiChevronDown size={16} />
                            </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                            {open && (
                                <motion.p
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="overflow-hidden pb-3.5 text-[13px] text-muted"
                                >
                                    {item.a}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
            <Link
                href="/faq"
                className="group mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold text-primary"
            >
                Ver todas as perguntas
                <FiArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
        </motion.div>
    )
}