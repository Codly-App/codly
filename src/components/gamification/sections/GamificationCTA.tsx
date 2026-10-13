"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FiArrowRight } from "react-icons/fi";
import Container from "@/ui/Container";

export default function GamificationCTA() {
    return (
        <section className="relative w-full overflow-hidden bg-[#100a1d]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(124,58,237,0.25),transparent_55%)]" />
            <div className="pointer-events-none absolute -right-24 -top-40 size-110 rounded-full bg-primary/20 blur-[110px]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-32 bg-linear-to-b from-background to-transparent dark:block" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-32 bg-linear-to-t from-background to-transparent dark:block" />

            <Container className="relative py-20 sm:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7 }}
                    className="text-center"
                >
                    <h2 className="mx-auto max-w-2xl text-3xl font-extrabold leading-[1.12] tracking-[-0.04em] text-white sm:text-4xl lg:text-[44px]">
                        Pronto para transformar estudo em hábito?
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/65 sm:text-[17px]">
                        Crie sua conta grátis, faça a primeira lição e comece sua sequência hoje mesmo.
                    </p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link href="/cadastro" className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-primary-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-lavender">
                            Criar conta grátis
                            <FiArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        <Link href="/#planos" className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/10">
                            Ver planos
                        </Link>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}