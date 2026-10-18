"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { FiArrowDown, FiCheck, FiZap, FiStar } from "react-icons/fi";
import Container from "@/ui/Container";
import Link from "next/link";

export default function Hero() {
    const reduceMotion = useReducedMotion();

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const benefits = [
        "Comece sem pagar nada",
        "Aprenda no seu ritmo",
        "Evolua com desafios",
    ];

    return (
        <section aria-labelledby="plans-hero-title" className="relative isolate w-full overflow-hidden bg-background">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(124,58,237,0.10),transparent_60%)]" />

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(124,58,237,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(124,58,237,0.035)_1px,transparent_1px)] bg-size-[64px_64px] mask-[linear-gradient(to_bottom,black,transparent_90%)]" />

            <motion.div
                aria-hidden="true"
                animate={reduceMotion ? undefined : { x: [0, 35, 0], y: [0, -25, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -left-40 top-10 size-96 rounded-full bg-primary/5 blur-[110px]" />

            <motion.div
                aria-hidden="true"
                animate={reduceMotion ? undefined : { x: [0, -35, 0], y: [0, 25, 0] }}
                transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute -right-40 bottom-0 size-96 rounded-full bg-violet-400/10 blur-[110px]" />

            <Container className="relative z-10 flex min-h-130 flex-col items-center justify-center py-20 text-center sm:min-h-145 sm:py-24 lg:py-28">
                <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: reduceMotion ? 0 : 0.12 }} className="flex max-w-4xl flex-col items-center">

                    <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-lavender px-4 py-2 text-xs font-semibold text-primary">
                        <FiZap size={14} />
                        Seu aprendizado começa aqui
                    </motion.div>

                    <motion.h1 variants={fadeUp} id="plans-hero-title" className="max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-[4.25rem]">
                        Comece grátis. <span className="text-primary">Evolua sem limites.</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                        Aprender programação deve ser simples, acessível e divertido. Conheça os planos da Codly e descubra a melhor maneira de desenvolver suas habilidades, um desafio de cada vez.
                    </motion.p>

                    <motion.div variants={fadeUp} className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                        <Link href="#planos" className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(124,58,237,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_12px_30px_rgba(124,58,237,0.3)] sm:w-auto">
                            Conhecer os planos
                            <FiArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-1" />
                        </Link>

                        <Link href="#plano-gratuito" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-7 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/30 hover:bg-lavender hover:text-primary sm:w-auto">
                            <FiStar size={16} />
                            Explorar plano gratuito
                        </Link>
                    </motion.div>

                    <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                        {benefits.map((benefit) => (
                            <span key={benefit} className="inline-flex items-center gap-2 text-xs font-medium text-muted sm:text-sm">
                                <FiCheck size={15} className="shrink-0 text-primary" />
                                {benefit}
                            </span>
                        ))}
                    </motion.div>

                </motion.div>
            </Container>

            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-background to-transparent" />
        </section>
    );
}
