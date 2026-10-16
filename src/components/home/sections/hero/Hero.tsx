"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { AiOutlineThunderbolt } from "react-icons/ai";

export default function Hero() {
    const t = useTranslations("Hero");
    const reduceMotion = useReducedMotion();

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
        },
    };

    const fadeRight: Variants = {
        hidden: { opacity: 0, x: reduceMotion ? 0 : 45 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <section className="relative flex w-full items-center justify-center overflow-hidden bg-background">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(124,58,237,0.07),transparent_45%),radial-gradient(ellipse_at_85%_75%,rgba(167,139,250,0.10),transparent_45%)]" />

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(124,58,237,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(124,58,237,0.035)_1px,transparent_1px)] bg-size-[64px_64px] mask-[linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]" />

            <motion.div aria-hidden="true" animate={reduceMotion ? undefined : { x: [0, 60, 0], y: [0, -35, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -left-40 top-1/4 size-125 rounded-full bg-primary/5 blur-[110px]" />

            <motion.div aria-hidden="true" animate={reduceMotion ? undefined : { x: [0, -50, 0], y: [0, 40, 0] }} transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute -right-40 bottom-0 size-125 rounded-full bg-violet-300/15 blur-[110px]" />

            <div className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:px-8 lg:py-16">
                <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: reduceMotion ? 0 : 0.13 }} className="flex min-w-0 max-w-xl flex-col items-start">
                    <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-lavender px-3 py-1.5 text-xs font-semibold text-primary">
                        <AiOutlineThunderbolt size={15} />
                        <span>{t("badge")}</span>
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="max-w-xl text-[42px] font-extrabold leading-[1.06] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-[4.2rem]">
                        {t("titleStart")} <span className="text-primary">{t("titleHighlight")}</span>, {t("titleEnd")}
                    </motion.h1>

                    <motion.p variants={fadeUp} className="mt-6 max-w-lg text-base leading-7 text-muted sm:text-lg">
                        {t("description")}
                    </motion.p>

                    <motion.div variants={fadeUp} className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                        <Link href="/cadastro" className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(124,58,237,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_12px_30px_rgba(124,58,237,0.32)]">
                            {t("startFree")}
                            <FiArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>

                        <Link href="/#como-funciona" className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-surface px-6 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/20 hover:bg-lavender hover:text-primary">
                            {t("howItWorks")}
                        </Link>
                    </motion.div>

                    <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted">
                        <span className="flex items-center gap-1.5"><FiCheck className="text-primary" size={14} /> {t("benefit1")}</span>
                        <span className="flex items-center gap-1.5"><FiCheck className="text-primary" size={14} /> {t("benefit2")}</span>
                        <span className="flex items-center gap-1.5"><FiCheck className="text-primary" size={14} /> {t("benefit3")}</span>
                    </motion.div>
                </motion.div>

                <motion.div initial="hidden" animate="visible" variants={fadeRight} className="relative flex items-center justify-center">
                    <div className="absolute h-80 w-80 rounded-full bg-primary/10 blur-[75px]" />

                    <div className="relative">
                        <motion.div animate={reduceMotion ? undefined : { y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="relative overflow-hidden rounded-4xl border border-border bg-surface p-2 shadow-[0_25px_70px_rgba(91,33,182,0.16)]">
                            <Image src="/images/KapyFrontal.jpeg" width={420} height={500} priority alt={t("mascotAlt")} sizes="(max-width: 640px) 270px, (max-width: 1024px) 310px, 320px" className="h-auto w-67.5 rounded-[1.6rem] object-cover sm:w-77.5 lg:w-80" />
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 20, scale: reduceMotion ? 1 : 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.9, ease: "easeOut" }} className="absolute -bottom-5 -right-4 flex items-center gap-3 rounded-2xl border border-border bg-surface/95 px-4 py-3 shadow-xl backdrop-blur-md sm:-right-7">
                            <span className="flex size-9 items-center justify-center rounded-xl bg-lavender text-lg">🔥</span>

                            <div>
                                <strong className="block text-sm font-bold text-foreground">{t("streakDays")}</strong>
                                <span className="text-[11px] text-muted">{t("streakLabel")}</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
