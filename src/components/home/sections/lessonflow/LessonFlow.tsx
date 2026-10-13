"use client";

import SectionInfo from "@/ui/SectionInfo";
import Container from "@/ui/Container";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { FiBookOpen } from "react-icons/fi";

type TypeCards = {
    id: number;
    title: string;
    description: string;
};

const cards: TypeCards[] = [
    {
        id: 1,
        title: "Explicação rápida",
        description: "2 a 4 telas direto ao ponto.",
    },
    {
        id: 2,
        title: "Exemplo prático",
        description: "Veja o conceito aplicado.",
    },
    {
        id: 3,
        title: "Exercícios guiados",
        description: "2 a 4 exercícios por lição.",
    },
    {
        id: 4,
        title: "Desafio final",
        description: "Um desafio para fixar o conteúdo.",
    },
    {
        id: 5,
        title: "Resultado",
        description: "XP, acertos e próxima lição.",
    },
];

export default function LessonFlow() {
    const reduceMotion = useReducedMotion();

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
    };

    const stepVariants: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 30, scale: reduceMotion ? 1 : 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <section id="formato-licao" className="relative w-full scroll-mt-20 overflow-hidden bg-background">
            <Container className="py-20 sm:py-24">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ staggerChildren: reduceMotion ? 0 : 0.12 }} className="max-w-2xl">
                    <motion.div variants={fadeUp} className="max-w-xl">
                        <SectionInfo
                            icon={<FiBookOpen size={13} />}
                            subTitle="Formato da lição"
                            title="Do conceito ao desafio em uma sessão só"
                        />
                    </motion.div>

                    <motion.p variants={fadeUp} className="mt-4 max-w-xl text-sm leading-6 text-muted sm:text-base">
                        Aprenda, pratique e evolua em cinco etapas simples, pensadas para transformar conhecimento em habilidade.
                    </motion.p>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ staggerChildren: reduceMotion ? 0 : 0.16, delayChildren: 0.15 }} className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-5 lg:gap-6">
                    <motion.div
                        initial={{ scaleX: reduceMotion ? 1 : 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: reduceMotion ? 0 : 1.2, delay: reduceMotion ? 0 : 0.2, ease: "easeInOut" }}
                        className="pointer-events-none absolute top-5.25 right-[10%] left-[10%] hidden h-px origin-left bg-primary/20 lg:block"
                    />

                    {cards.map((card) => (
                        <motion.article key={card.id} variants={stepVariants} className="group relative flex flex-col items-start">
                            <motion.div
                                whileHover={reduceMotion ? undefined : { y: -5, scale: 1.08 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="relative z-10 flex size-11 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-[0_5px_16px_rgba(124,58,237,0.2)] ring-4 ring-background transition-colors duration-300 group-hover:bg-primary-dark"
                            >
                                {card.id}
                            </motion.div>

                            <h3 className="mt-5 text-sm font-bold tracking-tight text-foreground sm:text-base">
                                {card.title}
                            </h3>

                            <p className="mt-2 max-w-52.5 text-sm leading-6 text-muted">
                                {card.description}
                            </p>
                        </motion.article>
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}
