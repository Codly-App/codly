
"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { FiArrowLeft, FiLock, FiShield, FiCheckCircle } from "react-icons/fi";

export default function Hero() {
    const reduceMotion = useReducedMotion();

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <section className="relative w-full overflow-hidden border-b border-border bg-background">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(124,58,237,0.08),transparent_50%),radial-gradient(ellipse_at_85%_75%,rgba(167,139,250,0.1),transparent_45%)]" />

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(124,58,237,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(124,58,237,0.025)_1px,transparent_1px)] bg-size-[64px_64px] mask-[linear-gradient(to_bottom,transparent,black_25%,transparent_95%)]" />

            <div className="relative z-10 mx-auto flex w-400 max-w-full flex-col items-start py-20 sm:py-24 lg:py-28">
                <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: reduceMotion ? 0 : 0.12 }} className="max-w-3xl">
                    <motion.div variants={fadeUp}>
                        <Link href="/" className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-primary">
                            <FiArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
                            Voltar para o início
                        </Link>
                    </motion.div>

                    <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-lavender px-4 py-2 text-xs font-bold text-primary">
                        <FiShield size={15} />
                        Privacidade e transparência
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-[60px]">
                        Sua privacidade é <span className="text-primary">importante para nós.</span>
                    </motion.h1>

                    <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                        Na Codly, acreditamos que aprender programação deve ser uma experiência segura e transparente. Conheça como tratamos seus dados pessoais e quais são seus direitos ao utilizar nossa plataforma.
                    </motion.p>

                    <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-border pt-6">
                        <div className="inline-flex items-center gap-2 text-sm font-medium text-muted">
                            <FiLock className="text-primary" size={17} />
                            Proteção de dados
                        </div>

                        <div className="inline-flex items-center gap-2 text-sm font-medium text-muted">
                            <FiCheckCircle className="text-primary" size={17} />
                            Transparência
                        </div>

                        <div className="inline-flex items-center gap-2 text-sm font-medium text-muted">
                            <FiShield className="text-primary" size={17} />
                            Seus direitos
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }} aria-hidden="true" className="pointer-events-none absolute top-1/2 right-8 hidden -translate-y-1/2 xl:block">
                    <div className="relative flex size-56 items-center justify-center rounded-[48px] border border-primary/10 bg-primary/5 rotate-12">
                        <div className="absolute inset-5 rounded-[38px] border border-primary/10" />
                        <FiShield className="-rotate-12 text-primary/20" size={110} />
                        <div className="absolute -right-4 -bottom-4 flex size-14 items-center justify-center rounded-2xl border border-border bg-surface shadow-lg">
                            <FiLock className="text-primary" size={25} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
