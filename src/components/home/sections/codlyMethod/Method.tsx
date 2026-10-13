"use client";
import SectionInfo from "@/ui/SectionInfo";
import Container from "@/ui/Container";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { IconType } from "react-icons";
import { FiZap, FiTrendingUp, FiCreditCard, FiSmartphone, FiLayers } from "react-icons/fi";

type TypeCards = {
    id: number;
    icon: IconType;
    title: string;
    description: string;
};

const cards: TypeCards[] = [
    {
        id: 1,
        icon: FiZap,
        title: "Lições de 5 minutos",
        description: "Explicação rápida, exemplo prático e exercícios guiados em cada lição.",
    },
    {
        id: 2,
        icon: FiTrendingUp,
        title: "XP e sequência diária",
        description: "Ganhe XP a cada lição e mantenha sua sequência de estudos ativa.",
    },
    {
        id: 3,
        icon: FiCreditCard,
        title: "Comece sem cartão",
        description: "Explore o conteúdo e comece a aprender antes de escolher um plano.",
    },
    {
        id: 4,
        icon: FiSmartphone,
        title: "Web, Android e iOS",
        description: "Estude pelo navegador ou continue seu progresso pelo celular.",
    },
];

export default function Method() {
    const reduceMotion = useReducedMotion();

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 35, scale: reduceMotion ? 1 : 0.96 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <section id="como-funciona" className="w-full scroll-mt-20 section-fade-lavender">
            <Container className="py-20 sm:py-24">

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ staggerChildren: reduceMotion ? 0 : 0.12 }}
                    className="max-w-2xl">
                    <motion.div variants={fadeUp}>
                        <SectionInfo
                            icon={<FiLayers size={13} />}
                            subTitle="O método Codly"
                            title="Feito para encaixar na sua rotina"
                        />
                    </motion.div>

                    <motion.p variants={fadeUp} className="mt-4 max-w-xl text-sm leading-6 text-muted sm:text-base">
                        Lições curtas, exercícios práticos e progresso visível — sem depender de cursos longos para começar a programar de verdade.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ staggerChildren: reduceMotion ? 0 : 0.12, delayChildren: 0.1 }}
                    className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <motion.article
                                key={card.id}
                                variants={cardVariants}
                                whileHover={reduceMotion ? undefined : { y: -6 }}
                                transition={{ duration: 0.25 }}
                                className="group rounded-2xl border border-border bg-surface p-6 hover:border-primary/20 hover:shadow-[0_14px_35px_rgba(91,33,182,0.08)]">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-lavender text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                                    <Icon size={18} />
                                </div>

                                <h3 className="mt-5 text-base font-bold tracking-tight text-foreground">
                                    {card.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-muted">
                                    {card.description}
                                </p>
                            </motion.article>
                        );
                    })}
                </motion.div>

            </Container>
        </section>
    );
}