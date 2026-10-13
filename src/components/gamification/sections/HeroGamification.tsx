"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { FiZap, FiTarget, FiUsers } from "react-icons/fi";
import { FaFire, FaTrophy } from "react-icons/fa6";
import SectionInfo from "@/ui/SectionInfo";

const floaters = [
    { icon: <FiZap size={18} />, title: "+40 XP", text: "Lição concluída", className: "left-0 top-4", delay: 0, tone: "bg-lavender text-primary" },
    { icon: <FaFire size={18} />, title: "18 dias", text: "de sequência", className: "right-0 top-24", delay: 0.9, tone: "bg-orange-500/10 text-orange-500" },
    { icon: <FaTrophy size={16} />, title: "Conquista", text: "Primeira lição", className: "left-10 top-52", delay: 1.7, tone: "bg-lavender text-primary" },
];

export default function HeroGamification() {
    const reduceMotion = useReducedMotion();

    const fadeUp: Variants = {
        hidden: { opacity: 0, y: reduceMotion ? 0 : 25 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <section className="relative w-full overflow-hidden border-b border-border bg-background">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(124,58,237,0.08),transparent_50%),radial-gradient(ellipse_at_85%_75%,rgba(167,139,250,0.1),transparent_45%)]" />

            <div className="relative mx-auto grid w-400 max-w-full items-center gap-10 py-20 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
                <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: reduceMotion ? 0 : 0.12 }} className="max-w-2xl">


                    <SectionInfo icon={ <FaFire size={13} />} subTitle="Gamificação, amigos e ranking"/>
                    <motion.h1 variants={fadeUp} className="text-4xl font-extrabold leading-[1.1] tracking-[-0.045em] text-foreground sm:text-5xl lg:text-[56px]">
                        Estudar vira <span className="text-primary">jogo</span>, e você não perde o ritmo.
                    </motion.h1>

                    <motion.p variants={fadeUp} className="mt-6 text-base leading-8 text-muted sm:text-lg">
                        XP por lição, sequência diária, metas, conquistas e um ranking para disputar com amigos. Veja abaixo como cada peça funciona e experimente as demos.
                    </motion.p>

                    <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-border pt-6">
                        <div className="inline-flex items-center gap-2 text-sm font-medium text-muted"><FiZap className="text-primary" size={17} />XP e bônus</div>
                        <div className="inline-flex items-center gap-2 text-sm font-medium text-muted"><FiTarget className="text-primary" size={17} />Metas diárias</div>
                        <div className="inline-flex items-center gap-2 text-sm font-medium text-muted"><FiUsers className="text-primary" size={17} />Amigos e ranking</div>
                    </motion.div>
                </motion.div>

                <div aria-hidden="true" className="relative mx-auto hidden h-80 w-72 lg:block">
                    {floaters.map((f) => (
                        <motion.div
                            key={f.title}
                            animate={reduceMotion ? undefined : { y: [0, -12, 0], rotate: [-2, 2, -2] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
                            className={`absolute flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-[0_18px_40px_-18px_rgba(91,33,182,0.35)] ${f.className}`}
                        >
                            <span className={`flex size-10 items-center justify-center rounded-xl ${f.tone}`}>{f.icon}</span>
                            <div>
                                <div className="text-sm font-extrabold text-foreground">{f.title}</div>
                                <div className="text-xs text-muted">{f.text}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}