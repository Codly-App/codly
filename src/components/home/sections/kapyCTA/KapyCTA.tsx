"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { FiArrowRight, FiDownload } from "react-icons/fi";

export default function KapyCTA() {
    const reduceMotion = useReducedMotion();

    const fadeLeft = {
        hidden: { opacity: 0, x: reduceMotion ? 0 : -45 },
        visible: { opacity: 1, x: 0 },
    };

    const fadeRight = {
        hidden: { opacity: 0, x: reduceMotion ? 0 : 45 },
        visible: { opacity: 1, x: 0 },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 25 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="relative w-full overflow-hidden bg-[#100a1d] py-20 sm:py-24 lg:py-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(124,58,237,0.25),transparent_55%)]" />
            <div className="pointer-events-none absolute -right-24 -top-40 size-110 rounded-full bg-primary/20 blur-[110px]" />

            <div className="relative z-10 mx-auto grid w-full max-w-295 items-center gap-12 px-6 md:grid-cols-[0.85fr_1.15fr] md:gap-14 lg:gap-20 lg:px-10 xl:px-6">
                
                <motion.div
                    variants={fadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex items-center justify-center md:justify-end">
                    <div className="absolute h-64 w-64 rounded-full bg-primary/20 blur-[70px]" />

                    <motion.div
                        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.3)]">
                        <Image
                            src="/images/KapyFrontal.jpeg"
                            alt="Kapy, mascote da Codly"
                            width={500}
                            height={650}
                            sizes="(max-width: 640px) 250px, (max-width: 1024px) 280px, 310px"
                            className="h-85 w-62.5 object-cover sm:w-70 lg:h-92.5 lg:w-77.5"
                        />
                    </motion.div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ staggerChildren: reduceMotion ? 0 : 0.15 }}
                    className="flex min-w-0 max-w-xl flex-col items-start text-left">
                    <motion.h2
                        variants={fadeRight}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="w-120 max-w-130.5 text-3xl font-extrabold leading-[1.12] tracking-[-0.04em] text-white sm:text-4xl lg:text-[44px]">
                        Conheça o Kapy e comece a programar hoje!
                    </motion.h2>

                    <motion.p
                        variants={fadeRight}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="mt-5 w-140 max-w-130 text-base leading-7 text-white/65 sm:text-[17px]">
                        Seu mascote vai acompanhar cada lição, cada sequência de estudos e cada conquista. Crie sua conta grátis e comece sua primeira lição em poucos minutos.
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                        <Link href="/cadastro" className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-primary-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-lavender hover:shadow-[0_10px_30px_rgba(124,58,237,0.2)]">
                            Criar conta grátis
                            <FiArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>

                        <Link href="/#instalar-app" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/10">
                            <FiDownload size={16} />
                            Instalar o app (PWA)
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
