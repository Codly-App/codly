"use client";

import { motion } from "motion/react";
import { FiAward, FiLock } from "react-icons/fi";
import { FaFire, FaTrophy, FaBookOpen, FaBolt } from "react-icons/fa6";
import SectionInfo from "@/ui/SectionInfo";
import Container from "@/ui/Container";

const achievements = [
    { icon: <FaBookOpen size={22} />, title: "Primeira lição", text: "Conclua sua primeira lição em qualquer trilha.", progress: 1, total: 1, unit: "lição" },
    { icon: <FaFire size={22} />, title: "7 dias", text: "Estude 7 dias seguidos e mantenha a chama acesa.", progress: 4, total: 7, unit: "dias" },
    { icon: <FaBolt size={22} />, title: "1000 XP", text: "Acumule 1000 pontos de experiência.", progress: 620, total: 1000, unit: "XP" },
    { icon: <FaTrophy size={22} />, title: "Curso concluído", text: "Finalize todas as lições de um curso.", progress: 3, total: 12, unit: "lições" },
];

export default function Achievements() {
    return (
        <section className="relative w-full overflow-hidden bg-surface-alt border-b border-border">
            <Container className="py-20 sm:py-24">
                <div className="max-w-xl">
                    <SectionInfo icon={<FiAward size={13} />} subTitle="Conquistas" title="Marcos que mostram sua evolução" />
                    <p className="-mt-4 mb-10 text-base leading-relaxed text-muted">
                        As conquistas aparecem conforme você avança. Os valores abaixo são um exemplo de como o progresso é exibido.
                    </p>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ staggerChildren: 0.12 }}
                    className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {achievements.map((a) => {
                        const unlocked = a.progress >= a.total;
                        const pct = (a.progress / a.total) * 100;
                        return (
                            <motion.div
                                key={a.title}
                                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                                whileHover={{ y: -4 }}
                                className="relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-border bg-surface p-6"
                            >
                                {unlocked && (
                                    <motion.span
                                        animate={{ x: ["-120%", "320%"] }}
                                        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
                                        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-primary/10 blur-md"
                                    />
                                )}

                                <div className="relative flex items-start justify-between">
                                    <span
                                        className={`flex size-12 items-center justify-center rounded-2xl ${
                                            unlocked ? "bg-primary text-white shadow-[0_10px_20px_-8px_rgba(124,58,237,0.7)]" : "bg-surface-alt text-muted"
                                        }`}
                                    >
                                        {a.icon}
                                    </span>
                                    {!unlocked && <FiLock className="text-muted" size={16} />}
                                </div>

                                <div className="relative">
                                    <div className="text-base font-extrabold text-foreground">{a.title}</div>
                                    <p className="mt-1 text-sm leading-relaxed text-muted">{a.text}</p>
                                </div>

                                <div className="relative mt-auto">
                                    <div className="mb-1.5 flex justify-between text-[11px] font-semibold text-muted">
                                        <span>{unlocked ? "Desbloqueada" : "Em andamento"}</span>
                                        <span>{a.progress}/{a.total} {a.unit}</span>
                                    </div>
                                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-alt">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${pct}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                                            className="h-full rounded-full bg-primary"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </Container>
        </section>
    );
}