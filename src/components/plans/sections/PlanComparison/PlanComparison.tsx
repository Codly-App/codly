
"use client";

import Container from "@/ui/Container";
import SectionInfo from "@/ui/SectionInfo";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { FiArrowRight, FiCheck, FiCode, FiStar, FiUsers, FiZap } from "react-icons/fi";
import type { IconType } from "react-icons";

type Plan = {
    id: string;
    name: string;
    price: string;
    description: string;
    icon: IconType;
    featured: boolean;
    features: string[];
};

const plans: Plan[] = [
    {
        id: "free",
        name: "Codly Free",
        price: "Gratuito",
        description: "Para começar sua jornada na programação.",
        icon: FiCode,
        featured: false,
        features: [
            "Até 10 linguagens simultâneas",
            "Ranking de XP",
            "Perfil personalizado",
            "Grupo de desafios com amigos",
        ],
    },
    {
        id: "pro",
        name: "Codly Pro",
        price: "Em breve",
        description: "Mais liberdade para evoluir.",
        icon: FiZap,
        featured: true,
        features: [
            "Todos os benefícios do Free",
            "Linguagens ilimitadas",
            "Assistente com IA",
            "Conversas em grupo",
            "Múltiplos grupos de desafios",
        ],
    },
];

export default function PlanComparison() {
    const reduceMotion = useReducedMotion();

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <section id="planos" aria-labelledby="plans-section-title" className="relative w-full scroll-mt-20 bg-background">
            <Container className="py-16 sm:py-20 lg:py-24">

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mx-auto max-w-2xl text-center">
                    <SectionInfo icon={<FiStar size={14} />} subTitle="Planos Codly" title="Uma jornada, duas formas de evoluir" />

                    <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
                        Comece gratuitamente e aprenda no seu ritmo. Quando quiser explorar ainda mais possibilidades, o Codly Pro estará ao seu lado.
                    </p>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} transition={{ staggerChildren: reduceMotion ? 0 : 0.12 }} className="mx-auto mt-9 grid max-w-190 grid-cols-1 items-stretch gap-4 sm:grid-cols-2">

                    {plans.map((plan) => {
                        const Icon = plan.icon;

                        return (
                            <motion.article
                                key={plan.id}
                                id={plan.id === "free" ? "plano-gratuito" : "plano-pro"}
                                variants={cardVariants}
                                whileHover={reduceMotion ? undefined : { y: -4 }}
                                className={`relative flex scroll-mt-24 flex-col rounded-2xl border p-5 transition-all duration-300 sm:p-6 ${plan.featured ? "border-primary/40 bg-surface shadow-[0_10px_35px_rgba(124,58,237,0.08)]" : "border-border bg-surface hover:border-primary/20 hover:shadow-[0_10px_30px_rgba(91,33,182,0.05)]"}`}
                            >
                                {plan.featured && <div aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 rounded-t-2xl bg-primary" />}

                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2.5">
                                        <span className="flex size-9 items-center justify-center rounded-lg bg-lavender text-primary">
                                            <Icon size={17} />
                                        </span>
                                        <h3 className="text-base font-bold tracking-tight text-foreground">{plan.name}</h3>
                                    </div>

                                    {plan.featured && (
                                        <span className="rounded-full bg-lavender px-2.5 py-1 text-[10px] font-semibold text-primary">
                                            PRO
                                        </span>
                                    )}
                                </div>

                                <div className="mt-5 border-b border-border pb-5">
                                    <p className="text-2xl font-extrabold tracking-tight text-foreground">{plan.price}</p>
                                    <p className="mt-1 text-xs leading-5 text-muted">{plan.description}</p>
                                </div>

                                <ul className="flex-1 space-y-3.5 py-5">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-start gap-2.5">
                                            <FiCheck size={16} className="mt-0.5 shrink-0 text-primary" />
                                            <span className="text-sm leading-5 text-foreground/85">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link href="#lancamento" className={`group mt-2 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl px-4 text-xs font-semibold transition-all duration-300 ${plan.featured ? "bg-primary text-white hover:bg-primary-dark" : "border border-border bg-background text-foreground hover:border-primary/30 hover:bg-lavender hover:text-primary"}`}>
                                    {plan.featured ? "Conhecer o lançamento" : "Quero começar gratuitamente"}
                                    <FiArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </motion.article>
                        );
                    })}
                </motion.div>

                <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mx-auto mt-7 flex max-w-lg items-center justify-center gap-2 text-center text-xs leading-5 text-muted">
                    <FiUsers size={15} className="shrink-0 text-primary" />
                    Recursos previstos para o lançamento da plataforma Codly.
                </motion.p>

            </Container>
        </section>
    );
}
