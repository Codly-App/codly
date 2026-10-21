
"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "motion/react";
import { FiCheck, FiTag, FiLock, FiFlag, FiArrowRight } from "react-icons/fi";
import SectionInfo from "@/ui/SectionInfo";
import Container from "@/ui/Container";
import MobileTrail from "./MobileTrail";

type PlanKey = "demo" | "basic" | "pro";
type FeatureKey = "one" | "two" | "three" | "four";

type Plan = {
    id: PlanKey;
    unlocks: number;
    features: FeatureKey[];
    popular?: boolean;
};

const plans: Plan[] = [
    {
        id: "demo",
        unlocks: 1,
        features: ["one", "two", "three", "four"],
    },
    {
        id: "basic",
        unlocks: 2,
        features: ["one", "two", "three", "four"],
        popular: true,
    },
    {
        id: "pro",
        unlocks: 3,
        features: ["one", "two", "three", "four"],
    },
];

const zones = [
    { id: "beginner", color: "#22C55E" },
    { id: "intermediate", color: "#F59E0B" },
    { id: "advanced", color: "#7C3AED" },
] as const;

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

export default function Plans() {
    const t = useTranslations("PlansTrail");
    const [selected, setSelected] = useState(1);

    const plan = plans[selected];
    const checkpoint = t(`plans.${plan.id}.checkpoint`);

    const lastIndex = plan.unlocks * PER_ZONE - 1;
    const progress = lastIndex / (TOTAL - 1);
    const flagLeft = `${(points[lastIndex].x / W) * 100}%`;

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
                    <SectionInfo
                        icon={<FiTag size={13} />}
                        subTitle={t("subtitle")}
                        title={t("title")}
                    />

                    <p className="text-base leading-relaxed text-muted">
                        {t("description")}
                    </p>
                </motion.div>

                {/* Seletor dos planos */}
                <div className="mx-auto flex max-w-xl rounded-full border border-border bg-surface p-1">
                    {plans.map((item, i) => (
                        <button
                            type="button"
                            key={item.id}
                            onClick={() => setSelected(i)}
                            aria-pressed={selected === i}
                            className="relative min-w-0 flex-1 cursor-pointer rounded-full px-2 py-2.5 text-center sm:px-3"
                        >
                            {selected === i && (
                                <motion.span
                                    layoutId="plan-pill"
                                    className="absolute inset-0 rounded-full bg-primary shadow-[0_8px_20px_-8px_rgba(124,58,237,0.7)]"
                                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                />
                            )}

                            <span className={`relative block text-xs font-bold sm:text-sm ${selected === i ? "text-white" : "text-foreground"}`}>
                                {t(`plans.${item.id}.name`)}
                            </span>

                            <span className={`relative block text-[10px] leading-4 sm:text-[11px] ${selected === i ? "text-white/80" : "text-muted"}`}>
                                {t(`selector.${item.id}`)}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Trilha mobile */}
                <div className="mt-8 md:hidden">
                    <MobileTrail unlocks={plan.unlocks} checkpoint={checkpoint} />
                </div>

                {/* Trilha desktop */}
                <div className="mt-10 hidden overflow-x-auto pb-2 md:block">
                    <div className="relative mx-auto min-w-180 max-w-5xl pt-14">
                        <motion.div
                            animate={{ left: flagLeft }}
                            transition={{ type: "spring", stiffness: 160, damping: 20 }}
                            style={{ x: "-50%" }}
                            className="absolute top-0 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 text-[11px] font-bold text-background"
                        >
                            <FiFlag size={11} />
                            {checkpoint}
                            <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-foreground" />
                        </motion.div>

                        <svg
                            viewBox={`0 0 ${W} ${H}`}
                            className="h-auto w-full"
                            role="img"
                            aria-label={t("mapAriaLabel")}
                        >
                            <path
                                d={pathD}
                                fill="none"
                                stroke="var(--border)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="2 10"
                            />

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

                            {points.map((point, i) => {
                                const zoneIndex = Math.floor(i / PER_ZONE);
                                const unlocked = zoneIndex < plan.unlocks;

                                return (
                                    <g key={i}>
                                        <circle
                                            cx={point.x}
                                            cy={point.y}
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
                                            x={point.x}
                                            y={point.y + 4}
                                            textAnchor="middle"
                                            fontSize="11"
                                            fontWeight="700"
                                            style={{
                                                fill: unlocked ? "#fff" : "var(--muted)",
                                                transition: "fill 0.4s ease",
                                            }}
                                        >
                                            {i + 1}
                                        </text>
                                    </g>
                                );
                            })}
                        </svg>

                        <div className="mt-2 grid grid-cols-3 text-center">
                            {zones.map((zone, i) => {
                                const unlocked = i < plan.unlocks;

                                return (
                                    <div
                                        key={zone.id}
                                        className={`flex items-center justify-center gap-2 transition-opacity duration-300 ${unlocked ? "opacity-100" : "opacity-45"}`}
                                    >
                                        <span className="size-2.5 shrink-0 rounded-full" style={{ background: zone.color }} />

                                        <span className="text-xs font-bold text-foreground">
                                            {t(`zones.${zone.id}.label`)}
                                        </span>

                                        {!unlocked && <FiLock size={12} className="shrink-0 text-muted" />}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Detalhes do plano selecionado */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={plan.id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="mx-auto mt-10 grid max-w-5xl items-center gap-6 rounded-3xl border border-border bg-surface p-6 sm:p-8 md:grid-cols-[1fr_1.3fr_auto]"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-foreground">
                                {t(`plans.${plan.id}.name`)}
                            </h3>

                            <p className="mt-1 text-sm text-muted">
                                {t(`plans.${plan.id}.tagline`)}
                            </p>

                            <div className="mt-4 flex items-baseline gap-1.5">
                                <span className="text-3xl font-bold tracking-tight text-foreground">
                                    {t(`plans.${plan.id}.price`)}
                                </span>

                                <span className="text-sm text-muted">
                                    {t(`plans.${plan.id}.period`)}
                                </span>
                            </div>
                        </div>

                        <ul className="grid gap-2.5 sm:grid-cols-2">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                                    <FiCheck className="mt-0.5 shrink-0 text-primary" size={15} />
                                    {t(`plans.${plan.id}.features.${feature}`)}
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="/cadastro"
                            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(124,58,237,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark"
                        >
                            {t(`plans.${plan.id}.cta`)}
                            <FiArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </AnimatePresence>
            </Container>
        </section>
    );
}
