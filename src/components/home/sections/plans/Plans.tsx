"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { FiCheck, FiTag } from "react-icons/fi";
import SectionInfo from "@/ui/SectionInfo";

type Plan = {
    name: string;
    tagline: string;
    price: string;
    period: string;
    features: string[];
    cta: string;
    featured?: boolean;
};

const plans: Plan[] = [
    {
        name: "Demo",
        tagline: "Experimente sem compromisso",
        price: "Grátis",
        period: "7 dias",
        features: [
            "Trilhas de nível iniciante",
            "Progresso salvo",
            "XP e sequência diária",
            "Acesso via web e PWA",
        ],
        cta: "Começar demo",
    },
    {
        name: "Básico",
        tagline: "Para estudar com consistência",
        price: "A definir",
        period: "/ mês",
        features: [
            "SQL e JavaScript até intermediário",
            "Progresso completo e histórico",
            "Metas, XP e conquistas",
            "Ranking entre amigos",
        ],
        cta: "Assinar Básico",
        featured: true,
    },
    {
        name: "Pro",
        tagline: "Acesso completo às trilhas",
        price: "A definir",
        period: "/ mês",
        features: [
            "Todo o conteúdo, incluindo Avançado",
            "Desafios Pro combinados",
            "Tudo do plano Básico",
            "Recursos premium futuros",
        ],
        cta: "Assinar Pro",
    },
];

const containerVariants: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.12 },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Plans() {
    return (
        <section id="planos" className="relative w-full overflow-hidden bg-surface-alt border-y border-border">
            <div className="mx-auto w-400 max-w-full py-20 sm:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto text-center mb-14"
                >
                    <SectionInfo icon={<FiTag size={13} />} title="Comece de graça, evolua quando quiser" subTitle="Planos"/>
                    <p className="text-muted text-base leading-relaxed">
                        Preços finais em definição — a estrutura de planos já está pronta para o lançamento.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
                >
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.name}
                            variants={cardVariants}
                            whileHover={{ y: -4 }}
                            transition={{ type: "spring", stiffness: 300, damping: 24 }}
                            className={`relative flex flex-col gap-6 rounded-3xl bg-surface p-8 transition-shadow duration-300 hover:shadow-[0_20px_45px_-20px_rgba(91,33,182,0.25)] ${
                                plan.featured
                                    ? "border-2 border-primary shadow-[0_20px_45px_-20px_rgba(91,33,182,0.3)]"
                                    : "border border-border"
                            }`}
                        >
                            {plan.featured && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold text-white whitespace-nowrap">
                                    Mais popular
                                </span>
                            )}

                            <div>
                                <h3 className="font-bold text-xl text-foreground mb-1">{plan.name}</h3>
                                <p className="text-sm text-muted">{plan.tagline}</p>
                            </div>

                            <div className="flex items-baseline gap-1.5">
                                <span className="font-bold text-3xl text-foreground tracking-tight">
                                    {plan.price}
                                </span>
                                <span className="text-sm text-muted">{plan.period}</span>
                            </div>

                            <div className="flex flex-col gap-3 flex-1">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-start gap-2.5 text-sm">
                                        <FiCheck className="text-primary mt-0.5 shrink-0" size={16} />
                                        <span className="text-foreground">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                href="/cadastro"
                                className={`inline-flex h-12 items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 ${
                                    plan.featured
                                        ? "bg-primary text-white shadow-[0_8px_25px_rgba(124,58,237,0.25)] hover:-translate-y-0.5 hover:bg-primary-dark"
                                        : "border border-border bg-surface-alt text-foreground hover:border-primary/20 hover:bg-lavender hover:text-primary"
                                }`}
                            >
                                {plan.cta}
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}