"use client";

import Container from "@/ui/Container";
import SectionInfo from "@/ui/SectionInfo";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { FiArrowRight, FiCheck, FiCode, FiStar, FiUsers, FiZap } from "react-icons/fi";
import type { IconType } from "react-icons";
import Link from "next/link";

type Feature = {
    id: number;
    title: string;
    description: string;
};

type Plan = {
    id: string;
    name: string;
    price: string;
    description: string;
    icon: IconType;
    featured: boolean;
    features: Feature[];
};

const plans: Plan[] = [
    {
        id: "free",
        name: "Codly Free",
        price: "Gratuito",
        description: "Tudo o que você precisa para começar sua jornada na programação.",
        icon: FiCode,
        featured: false,
        features: [
            { id: 1, title: "Até 10 linguagens simultâneas", description: "Aprenda e acompanhe seu progresso em até 10 linguagens de programação ao mesmo tempo." },
            { id: 2, title: "Ranking de XP", description: "Acumule experiência, suba no ranking e acompanhe sua evolução." },
            { id: 3, title: "Perfil personalizado", description: "Personalize seu perfil e mostre suas conquistas para a comunidade." },
            { id: 4, title: "Grupo de desafios com amigos", description: "Crie um grupo, convide amigos e compare as pontuações de cada participante." },
        ],
    },
    {
        id: "pro",
        name: "Codly Pro",
        price: "Em breve",
        description: "Mais liberdade, inteligência artificial e colaboração para acelerar seu aprendizado.",
        icon: FiZap,
        featured: true,
        features: [
            { id: 1, title: "Todos os benefícios do Free", description: "Continue aproveitando rankings, personalização e desafios com amigos." },
            { id: 2, title: "Linguagens ilimitadas", description: "Estude quantas linguagens de programação quiser, sem limite de trilhas simultâneas." },
            { id: 3, title: "Assistente com IA", description: "Tire dúvidas, entenda conceitos e receba ajuda durante os estudos." },
            { id: 4, title: "Conversas em grupo", description: "Converse com outros participantes e compartilhe sua experiência." },
            { id: 5, title: "Múltiplos grupos de desafios", description: "Crie e participe de vários grupos para competir e aprender com seus amigos." },
        ],
    },
];

export default function PlanComparison() {
    const reduceMotion = useReducedMotion();

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 35, scale: reduceMotion ? 1 : 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <section id="planos" aria-labelledby="plans-section-title" className="relative w-full scroll-mt-20 bg-background">
            <Container className="py-20 sm:py-24 lg:py-28">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mx-auto max-w-2xl text-center">
                    <SectionInfo icon={<FiStar size={14} />} subTitle="Planos Codly" title="Uma jornada, duas formas de evoluir" />
                    <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
                        Comece gratuitamente e aprenda no seu ritmo. Quando quiser explorar ainda mais possibilidades, o Codly Pro estará ao seu lado.
                    </p>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} transition={{ staggerChildren: reduceMotion ? 0 : 0.15, delayChildren: 0.1 }} className="mx-auto mt-12 grid max-w-5xl grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
                    {plans.map((plan) => {
                        const Icon = plan.icon;

                        return (
                            <motion.article
                                key={plan.id}
                                id={plan.id === "free" ? "plano-gratuito" : "plano-pro"}
                                variants={cardVariants}
                                whileHover={reduceMotion ? undefined : { y: -5 }}
                                className={`relative flex scroll-mt-24 flex-col overflow-hidden rounded-3xl border p-6 transition-shadow duration-300 sm:p-8 ${plan.featured ? "border-primary/50 bg-surface shadow-[0_18px_55px_rgba(124,58,237,0.12)]" : "border-border bg-surface hover:shadow-[0_14px_40px_rgba(91,33,182,0.06)]"}`}>
                                {plan.featured && <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-violet-400 via-primary to-purple-700" />}

                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex size-12 items-center justify-center rounded-2xl bg-lavender text-primary">
                                        <Icon size={23} />
                                    </div>

                                    {plan.featured && (
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-lavender px-3 py-1.5 text-[11px] font-bold text-primary">
                                            <FiStar size={12} />
                                            Experiência completa
                                        </span>
                                    )}
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-xl font-extrabold tracking-tight text-foreground">{plan.name}</h3>
                                    <p className="mt-2 min-h-12 text-sm leading-6 text-muted">{plan.description}</p>

                                    <div className="mt-5 border-b border-border pb-6">
                                        <span className="text-3xl font-extrabold tracking-tight text-foreground">{plan.price}</span>
                                        {plan.id === "free" && <span className="ml-2 text-xs text-muted">para sempre</span>}
                                        {plan.featured && <p className="mt-1 text-xs text-muted">Valores e condições serão anunciados futuramente.</p>}
                                    </div>
                                </div>

                                <div className="flex-1 py-6">
                                    <p className="mb-5 text-xs font-bold uppercase tracking-[0.12em] text-foreground">
                                        {plan.featured ? "Tudo o que você vai desbloquear" : "O que está incluído"}
                                    </p>

                                    <ul className="space-y-5">
                                        {plan.features.map((feature) => (
                                            <li key={feature.id} className="flex items-start gap-3">
                                                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-lavender text-primary">
                                                    <FiCheck size={13} strokeWidth={2.5} />
                                                </span>

                                                <div>
                                                    <h4 className="text-sm font-semibold text-foreground">{feature.title}</h4>
                                                    <p className="mt-1 text-xs leading-5 text-muted sm:text-[13px]">{feature.description}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link href="#lancamento" className={`group mt-auto inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all duration-300 ${plan.featured ? "bg-primary text-white shadow-[0_7px_20px_rgba(124,58,237,0.22)] hover:bg-primary-dark" : "border border-border bg-background text-foreground hover:border-primary/30 hover:bg-lavender hover:text-primary"}`}>
                                    {plan.featured ? "Conhecer o lançamento" : "Quero começar gratuitamente"}
                                    <FiArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </motion.article>
                        );
                    })}
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-10 flex items-center justify-center gap-2 text-center text-xs text-muted">
                    <FiUsers size={16} className="shrink-0 text-primary" />
                    Recursos previstos para o lançamento da plataforma Codly.
                </motion.div>
            </Container>
        </section>
    );
}