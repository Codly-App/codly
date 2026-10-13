"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FiUsers, FiUserPlus, FiCheckCircle, FiBarChart2, FiZap } from "react-icons/fi";
import { FaFire } from "react-icons/fa6";
import SectionInfo from "@/ui/SectionInfo";
import Container from "@/ui/Container";

type Metric = "xp" | "streak";

const steps = [
    { icon: <FiUserPlus size={18} />, title: "Adicione amigos", text: "Busque quem você conhece na Codly e envie um convite." },
    { icon: <FiCheckCircle size={18} />, title: "Aguarde o aceite", text: "Quando o convite é aceito, a pessoa entra no seu ranking." },
    { icon: <FiBarChart2 size={18} />, title: "Dispute no ranking", text: "Compare o XP e a sequência de estudos entre vocês." },
];

const friends = [
    { name: "Marina A.", initials: "MA", color: "var(--primary)", xp: 2480, streak: 42 },
    { name: "Rafael S.", initials: "RS", color: "var(--primary-dark)", xp: 2110, streak: 31 },
    { name: "Você", initials: "EU", color: "#22C55E", xp: 1860, streak: 38, you: true },
    { name: "Diego P.", initials: "DP", color: "#F59E0B", xp: 1540, streak: 9 },
];

const tabs: { key: Metric; label: string }[] = [
    { key: "xp", label: "XP" },
    { key: "streak", label: "Sequência" },
];

export default function FriendsRanking() {
    const [metric, setMetric] = useState<Metric>("xp");

    const sorted = [...friends].sort((a, b) => b[metric] - a[metric]);
    const top = sorted[0][metric];

    return (
        <section className="relative w-full overflow-hidden bg-background border-b border-border">
            <Container className="grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2">
                <div>
                    <SectionInfo icon={<FiUsers size={13} />} subTitle="Amigos e ranking" title="Estudar fica melhor com companhia" />
                    <p className="-mt-4 mb-8 max-w-md text-base leading-relaxed text-muted">
                        O ranking é só entre amigos: sem competição com desconhecidos, só uma motivação extra para aparecer todo dia.
                    </p>

                    <div className="relative flex flex-col gap-6">
                        <span className="absolute bottom-6 left-4.75 top-6 w-px bg-border" />
                        {steps.map((s, i) => (
                            <motion.div
                                key={s.title}
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: i * 0.12, duration: 0.45 }}
                                className="relative flex gap-4"
                            >
                                <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-primary">
                                    {s.icon}
                                </span>
                                <div className="pt-1">
                                    <div className="text-sm font-extrabold text-foreground">{s.title}</div>
                                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{s.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}
                    className="rounded-3xl border border-border bg-surface p-6 shadow-[0_25px_70px_-30px_rgba(91,33,182,0.35)]"
                >
                    <div className="mb-5 flex items-center justify-between">
                        <span className="text-sm font-extrabold text-foreground">Ranking entre amigos</span>
                        <div className="flex rounded-full bg-surface-alt p-1">
                            {tabs.map((t) => (
                                <button
                                    type="button"
                                    key={t.key}
                                    onClick={() => setMetric(t.key)}
                                    className="relative rounded-full px-3.5 py-1.5 text-xs font-bold"
                                >
                                    {metric === t.key && (
                                        <motion.span layoutId="rank-tab" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                                    )}
                                    <span className={`relative ${metric === t.key ? "text-white" : "text-muted"}`}>{t.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        {sorted.map((f, i) => (
                            <motion.div
                                key={f.name}
                                layout
                                transition={{ type: "spring", stiffness: 350, damping: 32 }}
                                className={`flex items-center gap-3 rounded-2xl px-3 py-3 ${f.you ? "bg-lavender ring-1 ring-primary/20" : ""}`}
                            >
                                <span className="w-5 text-center text-xs font-extrabold text-muted">{i + 1}</span>
                                <span
                                    className="flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-extrabold text-white ring-2 ring-surface"
                                    style={{ background: f.color }}
                                >
                                    {f.initials}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="truncate text-sm font-bold text-foreground">{f.name}</span>
                                        <span className={`flex shrink-0 items-center gap-1 text-xs font-extrabold ${metric === "xp" ? "text-primary" : "text-orange-500"}`}>
                                            {metric === "xp" ? <FiZap size={12} /> : <FaFire size={11} />}
                                            {metric === "xp" ? `${f.xp.toLocaleString("pt-BR")} XP` : `${f.streak} dias`}
                                        </span>
                                    </div>
                                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border/40">
                                        <motion.div
                                            animate={{ width: `${(f[metric] / top) * 100}%` }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            className="h-full rounded-full"
                                            style={{ background: f.color }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}