"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { FiCheck, FiTag, FiLock, FiFlag, FiArrowRight } from "react-icons/fi";
import SectionInfo from "@/ui/SectionInfo";
import Container from "@/ui/Container";
import MobileTrail from "./MobileTrail";

type Plan = {
    name: string;
    tagline: string;
    price: string;
    period: string;
    unlocks: number; // quantas zonas da trilha o plano libera
    checkpoint: string;
    features: string[];
    cta: string;
    popular?: boolean;
};

export const plans: Plan[] = [
    {
        name: "Demo",
        tagline: "Experimente sem compromisso",
        price: "Grátis",
        period: "7 dias",
        unlocks: 1,
        checkpoint: "Seu teste termina aqui",
        features: ["Trilhas de nível iniciante", "Progresso salvo", "XP e sequência diária", "Acesso via web e PWA"],
        cta: "Começar demo",
    },
    {
        name: "Básico",
        tagline: "Para estudar com consistência",
        price: "A definir",
        period: "/ mês",
        unlocks: 2,
        checkpoint: "Seu plano vai até aqui",
        features: ["SQL e JavaScript até intermediário", "Progresso completo e histórico", "Metas, XP e conquistas", "Ranking entre amigos"],
        cta: "Assinar Básico",
        popular: true,
    },
    {
        name: "Pro",
        tagline: "Acesso completo às trilhas",
        price: "A definir",
        period: "/ mês",
        unlocks: 3,
        checkpoint: "Trilha completa!",
        features: ["Todo o conteúdo, incluindo Avançado", "Desafios Pro combinados", "Tudo do plano Básico", "Recursos premium futuros"],
        cta: "Assinar Pro",
    },
];

export default function Plans() {
    const [selected, setSelected] = useState(1);
    const plan = plans[selected];
    const zones = [
        { label: "Iniciante", desc: "Lições 1 a 6", color: "#22C55E" },
        { label: "Intermediário", desc: "Lições 7 a 12", color: "#F59E0B" },
        { label: "Avançado · Pro", desc: "Lições 13 a 18", color: "#7C3AED" },
    ];

    const PER_ZONE = 6;
    const TOTAL = PER_ZONE * zones.length;
    const W = 1000;
    const H = 150;

    const points = Array.from({ length: TOTAL }, (_, i) => ({
        x: 44 + i * ((W - 88) / (TOTAL - 1)),
        y: H / 2 + Math.sin(i * 0.85) * 34,
    }));

    const pathD = points.reduce((d, p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`;
        if (i === points.length - 1) return `${d} L ${p.x} ${p.y}`;
        const next = points[i + 1];
        return `${d} Q ${p.x} ${p.y} ${(p.x + next.x) / 2} ${(p.y + next.y) / 2}`;
    }, "");
    const lastIndex = plan.unlocks * PER_ZONE - 1;
    const progress = lastIndex / (TOTAL - 1);
    const flagLeft = `${(points[lastIndex].x / W) * 100}%`;
    const flagColor = zones[plan.unlocks - 1].color;

    return (
        <section id="planos" className="relative w-full overflow-hidden section-fade-alt">
            <Container className="py-20 sm:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto mb-10 max-w-2xl text-center"
                >
                    <SectionInfo icon={<FiTag size={13} />} subTitle="Planos" title="Até onde você quer chegar?" />
                    <p className="text-base leading-relaxed text-muted">
                        Cada plano libera uma parte da trilha. Escolha um e veja até onde o caminho vai. Preços finais em definição.
                    </p>
                </motion.div>

                <div className="mx-auto flex max-w-xl rounded-full border border-border bg-surface p-1">
                    {plans.map((p, i) => (
                        <button
                            type="button"
                            key={p.name}
                            onClick={() => setSelected(i)}
                            className="relative flex-1 rounded-full px-3 py-2.5 text-center"
                        >
                            {selected === i && (
                                <motion.span
                                    layoutId="plan-pill"
                                    className="absolute inset-0 rounded-full bg-primary shadow-[0_8px_20px_-8px_rgba(124,58,237,0.7)]"
                                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                />
                            )}
                            <span className={`relative block text-sm font-bold ${selected === i ? "text-white" : "text-foreground"}`}>
                                {p.name}
                            </span>
                            <span className={`relative block text-[11px] ${selected === i ? "text-white/80" : "text-muted"}`}>
                                {p.price === "Grátis" ? "Grátis 7 dias" : p.popular ? "Mais popular" : "Acesso total"}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="mt-8 md:hidden">
                    <MobileTrail unlocks={plan.unlocks} checkpoint={plan.checkpoint} />
                </div>

                <div className="mt-10 hidden overflow-x-auto pb-2 md:block">
                    <div className="relative mx-auto min-w-180 max-w-5xl pt-14">
                        <motion.div
                            animate={{ left: flagLeft, backgroundColor: flagColor }}
                            transition={{ type: "spring", stiffness: 160, damping: 20 }}
                            style={{ x: "-50%" }}
                            className="absolute top-0 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold text-white text-shadow-md"
                        >
                            <FiFlag size={11} />
                            {plan.checkpoint}
                            <span
                                className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-primary"
                                style={{ backgroundColor: flagColor }}
                            />
                        </motion.div>

                        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Mapa da trilha de lições">
                            <path d={pathD} fill="none" stroke="var(--border)" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 10" />
                            <motion.path
                                d={pathD}
                                fill="none"
                                stroke="var(--primary)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: progress }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            />

                            {points.map((p, i) => {
                                const zoneIndex = Math.floor(i / PER_ZONE);
                                const unlocked = zoneIndex < plan.unlocks;
                                return (
                                    <g key={i}>
                                        <circle
                                            cx={p.x}
                                            cy={p.y}
                                            r="14"
                                            style={{
                                                fill: unlocked ? zones[zoneIndex].color : "var(--surface)",
                                                stroke: unlocked ? "var(--background)" : "var(--border)",
                                                strokeWidth: 3,
                                                transition: "fill 0.4s ease, stroke 0.4s ease",
                                                transitionDelay: `${i * 25}ms`,
                                            }}
                                        />
                                        <text
                                            x={p.x}
                                            y={p.y + 4}
                                            textAnchor="middle"
                                            fontSize="11"
                                            fontWeight="700"
                                            style={{ fill: unlocked ? "#fff" : "var(--muted)", transition: "fill 0.4s ease" }}
                                        >
                                            {i + 1}
                                        </text>
                                    </g>
                                );
                            })}
                        </svg>

                        <div className="mt-2 grid grid-cols-3 text-center">
                            {zones.map((z, i) => {
                                const unlocked = i < plan.unlocks;
                                return (
                                    <div key={z.label} className={`flex items-center justify-center gap-2 transition-opacity duration-300 ${unlocked ? "opacity-100" : "opacity-45"}`}>
                                        <span className="size-2.5 rounded-full" style={{ background: z.color }} />
                                        <span className="text-xs font-bold text-foreground">{z.label}</span>
                                        {!unlocked && <FiLock size={12} className="text-muted" />}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* detalhes do plano */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={plan.name}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="mx-auto mt-10 grid max-w-5xl items-center gap-6 rounded-3xl border border-border bg-surface p-6 sm:p-8 md:grid-cols-[1fr_1.3fr_auto]"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                            <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
                            <div className="mt-4 flex items-baseline gap-1.5">
                                <span className="text-3xl font-bold tracking-tight text-foreground">{plan.price}</span>
                                <span className="text-sm text-muted">{plan.period}</span>
                            </div>
                        </div>

                        <ul className="grid gap-2.5 sm:grid-cols-2">
                            {plan.features.map((f) => (
                                <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                                    <FiCheck className="mt-0.5 shrink-0 text-primary" size={15} />
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/cadastro"
                            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(124,58,237,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark"
                        >
                            {plan.cta}
                            <FiArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </AnimatePresence>
            </Container>
        </section>
    );
}