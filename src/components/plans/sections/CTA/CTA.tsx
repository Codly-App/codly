
"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/ui/Container";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { FiArrowRight, FiCalendar, FiCheckCircle } from "react-icons/fi";
import LaunchModal from "@/components/layout/header/sections/launchModal/LaunchModal";

export default function CTA() {
    const [isLaunchOpen, setIsLaunchOpen] = useState(false);
    const reduceMotion = useReducedMotion();

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 25 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const fadeLeft: Variants = {
        hidden: { opacity: 0, x: reduceMotion ? 0 : -35 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <>
            <section id="lancamento" aria-labelledby="plans-cta-title" className="relative isolate w-full scroll-mt-20 overflow-hidden bg-[#1a1032]">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_60%,rgba(124,58,237,0.30),transparent_55%),radial-gradient(ellipse_at_90%_20%,rgba(167,139,250,0.13),transparent_45%)]" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[65px_65px]" />

                <Container className="relative z-10 grid items-center gap-8 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:py-24">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeLeft} className="relative mx-auto flex w-full max-w-80 items-center justify-center sm:max-w-90 lg:max-w-full">
                        <div aria-hidden="true" className="absolute inset-8 rounded-full bg-violet-500/20 blur-[70px]" />

                        <motion.div animate={reduceMotion ? undefined : { y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="relative z-10">
                            <Image src="/images/KapyFrontal.jpeg" alt="Kapy, mascote da Codly, dando boas-vindas aos futuros estudantes" width={420} height={470} sizes="(max-width: 1024px) 320px, 420px" className="mx-auto h-auto w-full max-w-90 rounded-4xl object-cover shadow-[0_25px_80px_rgba(0,0,0,0.28)]" />
                        </motion.div>
                    </motion.div>

                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ staggerChildren: reduceMotion ? 0 : 0.13 }} className="flex flex-col items-center text-center lg:items-start lg:text-left">
                        <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-white/10 px-4 py-2 text-xs font-semibold text-violet-200">
                            <FiCalendar size={15} />
                            Lançamento previsto para 05/01/2027
                        </motion.div>

                        <motion.h2 variants={fadeUp} id="plans-cta-title" className="mt-6 max-w-xl text-3xl font-extrabold leading-[1.12] tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                            Sua próxima conquista <span className="text-violet-300">começa aqui.</span>
                        </motion.h2>

                        <motion.p variants={fadeUp} className="mt-5 max-w-lg text-sm leading-7 text-violet-100/75 sm:text-base">
                            Estamos preparando uma nova forma de aprender programação. Com o Kapy ao seu lado, você poderá explorar linguagens, superar desafios e evoluir com seus amigos.
                        </motion.p>

                        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-start">
                            {["Aprenda no seu ritmo", "Conquiste XP", "Desafie seus amigos"].map((benefit) => (
                                <span key={benefit} className="inline-flex items-center gap-2 text-xs font-medium text-violet-100/80">
                                    <FiCheckCircle size={15} className="shrink-0 text-violet-300" />
                                    {benefit}
                                </span>
                            ))}
                        </motion.div>

                        <motion.div variants={fadeUp} className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                            <button type="button" onClick={() => setIsLaunchOpen(true)} className="group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(124,58,237,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-500 hover:shadow-[0_12px_35px_rgba(124,58,237,0.45)]">
                                Acompanhar lançamento
                                <FiArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </button>

                            <a href="#planos" className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10">
                                Rever os planos
                            </a>
                        </motion.div>

                        <motion.p variants={fadeUp} className="mt-5 text-xs text-violet-200/60">
                            Ainda estamos em desenvolvimento. O acesso à plataforma será disponibilizado no lançamento.
                        </motion.p>
                    </motion.div>
                </Container>
            </section>

            <LaunchModal isOpen={isLaunchOpen} onClose={() => setIsLaunchOpen(false)} />
        </>
    );
}
