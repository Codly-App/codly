
"use client";

import SectionInfo from "@/ui/SectionInfo";
import Container from "@/ui/Container";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { FiBookOpen, FiCode, FiCheckSquare, FiTarget, FiAward } from "react-icons/fi";
import type { IconType } from "react-icons";

type TypeCards = {
    id: number;
    icon: IconType;
    title: string;
    description: string;
};

const cards: TypeCards[] = [
    { id: 1, icon: FiBookOpen, title: "Explicação rápida", description: "2 a 4 telas direto ao ponto." },
    { id: 2, icon: FiCode, title: "Exemplo prático", description: "Veja o conceito aplicado." },
    { id: 3, icon: FiCheckSquare, title: "Exercícios guiados", description: "2 a 4 exercícios por lição." },
    { id: 4, icon: FiTarget, title: "Desafio final", description: "Um desafio para fixar o conteúdo." },
    { id: 5, icon: FiAward, title: "Resultado", description: "XP, acertos e próxima lição." },
];

export default function LessonFlow() {
    const reduceMotion = useReducedMotion();

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 24, scale: reduceMotion ? 1 : 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <section id="formato-licao" className="relative w-full scroll-mt-20 overflow-hidden bg-background">
            <Container className="py-16 sm:py-20 lg:py-24">

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ staggerChildren: reduceMotion ? 0 : 0.12 }} className="max-w-2xl">
                    <motion.div variants={fadeUp} className="max-w-xl">
                        <SectionInfo icon={<FiBookOpen size={13} />} subTitle="Formato da lição" title="Do conceito ao desafio em uma sessão só" />
                    </motion.div>

                    <motion.p variants={fadeUp} className="mt-4 max-w-xl text-sm leading-6 text-muted sm:text-base">
                        Aprenda, pratique e evolua em cinco etapas simples, pensadas para transformar conhecimento em habilidade.
                    </motion.p>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} transition={{ staggerChildren: reduceMotion ? 0 : 0.1, delayChildren: 0.1 }} className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6">

                    {cards.map((card, index) => {
                        const Icon = card.icon;

                        return (
                            <motion.article
                                key={card.id}
                                variants={cardVariants}
                                whileHover={reduceMotion ? undefined : { y: -5 }}
                                className={`group relative flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 transition-all duration-300 hover:border-primary/25 hover:shadow-[0_12px_35px_rgba(91,33,182,0.08)] sm:min-h-46 sm:flex-col sm:items-start sm:gap-3 sm:p-5 lg:col-span-2 ${index === 3 ? "lg:col-start-2" : ""}`}>
                                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lavender text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                                    <Icon size={20} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h3 className="text-sm font-bold tracking-tight text-foreground sm:text-base">
                                        {card.title}
                                    </h3>
                                    <p className="mt-1 text-xs leading-5 text-muted sm:mt-2 sm:text-sm">
                                        {card.description}
                                    </p>
                                </div>

                                <span aria-hidden="true" className="absolute right-4 top-3 text-xs font-extrabold tracking-wide text-primary/35 sm:right-5 sm:top-5">
                                    {String(card.id).padStart(2, "0")}
                                </span>
                            </motion.article>
                        );
                    })}
                </motion.div>
            </Container>
        </section>
    );
}
