"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { FiZap, FiCheckCircle, FiAward } from "react-icons/fi";
import SectionInfo from "@/ui/SectionInfo";
import Container from "@/ui/Container";

const rules = [
    { title: "Lição concluída", text: "Cada lição finalizada rende XP, mesmo que você erre algum exercício." },
    { title: "Bônus de desempenho", text: "Quanto mais exercícios você acerta, maior o bônus sobre o XP da lição." },
    { title: "Desafio final", text: "Toda lição termina com um desafio. É ele que fecha a lição e libera o resultado com seu XP." },
];

const options = [
    { label: "2/4", bonus: 0 },
    { label: "3/4", bonus: 10 },
    { label: "4/4", bonus: 20 },
];

const BASE = 30;
const GOAL = 1000;

export default function XpSection() {
    const [pick, setPick] = useState(2);
    const [xp, setXp] = useState(620);

    const bonus = options[pick].bonus;
    const gain = BASE + bonus;

    const count = useMotionValue(xp);
    const shown = useTransform(count, (v) => Math.round(v));

    useEffect(() => {
        const controls = animate(count, xp, { duration: 0.7, ease: "easeOut" });
        return () => controls.stop();
    }, [xp, count]);

    const pct = Math.min((xp / GOAL) * 100, 100);
    const reached = xp >= GOAL;

    return (
        <section className="relative w-full overflow-hidden bg-surface-alt border-b border-border">
            <Container className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2">
                <div>
                    <SectionInfo icon={<FiZap size={13} />} subTitle="XP" title="Cada lição vale pontos" />
                    <p className="-mt-4 mb-8 max-w-md text-base leading-relaxed text-muted">
                        O XP mostra sua evolução e alimenta o ranking entre amigos. Você ganha por concluir e ganha mais por acertar.
                    </p>

                    <ol className="flex flex-col gap-5">
                        {rules.map((r, i) => (
                            <motion.li
                                key={r.title}
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: i * 0.1, duration: 0.45 }}
                                className="flex gap-4"
                            >
                                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-white">
                                    {i + 1}
                                </span>
                                <div>
                                    <div className="text-sm font-extrabold text-foreground">{r.title}</div>
                                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{r.text}</p>
                                </div>
                            </motion.li>
                        ))}
                    </ol>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}
                    className="rounded-3xl border border-border bg-surface p-7 shadow-[0_25px_70px_-30px_rgba(91,33,182,0.35)]"
                >
                    <div className="mb-5 flex items-center justify-between">
                        <span className="text-sm font-extrabold text-foreground">Simule uma lição</span>
                        <span className="rounded-full bg-surface-alt px-2.5 py-1 text-[11px] font-semibold text-muted">valores de exemplo</span>
                    </div>

                    <div className="mb-1 text-xs font-bold text-muted">Exercícios acertados</div>
                    <div className="mb-6 grid grid-cols-3 gap-2">
                        {options.map((o, i) => (
                            <button
                                type="button"
                                key={o.label}
                                onClick={() => setPick(i)}
                                className={`h-11 rounded-xl text-sm font-bold transition-colors ${
                                    pick === i ? "bg-primary text-white" : "bg-surface-alt text-muted hover:text-foreground"
                                }`}
                            >
                                {o.label}
                            </button>
                        ))}
                    </div>

                    <div className="mb-6 flex flex-col gap-2 rounded-2xl bg-background p-4 text-sm">
                        <div className="flex justify-between"><span className="text-muted">Lição concluída</span><span className="font-bold text-foreground">+{BASE} XP</span></div>
                        <div className="flex justify-between"><span className="text-muted">Bônus de desempenho</span><span className="font-bold text-primary">+{bonus} XP</span></div>
                        <div className="mt-1 flex justify-between border-t border-border pt-2"><span className="font-extrabold text-foreground">Total da lição</span><span className="font-extrabold text-foreground">+{gain} XP</span></div>
                    </div>

                    <div className="mb-2 flex items-end justify-between">
                        <div>
                            <div className="text-xs text-muted">Seu XP</div>
                            <motion.div className="text-3xl font-extrabold tracking-tight text-foreground">{shown}</motion.div>
                        </div>
                        <div className="text-xs font-semibold text-muted">meta: {GOAL} XP</div>
                    </div>

                    <div className="mb-6 h-2.5 overflow-hidden rounded-full bg-surface-alt">
                        <motion.div
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                            className="h-full rounded-full bg-linear-to-r from-primary to-primary-dark"
                        />
                    </div>

                    {reached ? (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center justify-between gap-3 rounded-2xl border border-primary/20 bg-lavender px-4 py-3"
                        >
                            <span className="flex items-center gap-2 text-sm font-extrabold text-primary"><FiAward size={16} />Conquista: 1000 XP!</span>
                            <button type="button" onClick={() => setXp(620)} className="text-xs font-bold text-muted hover:text-primary">Reiniciar</button>
                        </motion.div>
                    ) : (
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setXp((v) => v + gain)}
                            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-white shadow-[0_8px_25px_rgba(124,58,237,0.25)] transition-colors hover:bg-primary-dark"
                        >
                            <FiCheckCircle size={16} />
                            Concluir lição (+{gain} XP)
                        </motion.button>
                    )}
                </motion.div>
            </Container>
        </section>
    );
}