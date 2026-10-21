
"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { FiCheck, FiLock, FiFlag } from "react-icons/fi";

type MobileTrailProps = {
    unlocks: number;
    checkpoint: string;
};

const zones = [
    { id: "beginner", color: "#22C55E" },
    { id: "intermediate", color: "#F59E0B" },
    { id: "advanced", color: "#7C3AED" },
] as const;

export default function MobileTrail({ unlocks, checkpoint }: MobileTrailProps) {
    const t = useTranslations("PlansTrail");
    const STEP = 0.4;
    const PER_ZONE = 6;
    const fillPct = ((unlocks - 1) / (zones.length - 1)) * 100;

    return (
        <div className="relative mx-auto max-w-sm rounded-3xl border border-border bg-surface p-5">
            {/* Trilha de fundo e preenchimento */}
            <div className="absolute bottom-10 left-9.5 top-10 w-1 rounded-full bg-border">
                <motion.div
                    className="w-full rounded-full bg-primary"
                    animate={{ height: `${fillPct}%` }}
                    transition={{ duration: STEP * (zones.length - 1) + 0.2, ease: "easeInOut" }}
                />
            </div>

            {zones.map((zone, i) => {
                const unlocked = i < unlocks;
                const delay = unlocked ? i * STEP : 0;
                const isLast = i === zones.length - 1;

                return (
                    <div key={zone.id} className={`relative flex gap-4 ${isLast ? "" : "h-24"}`}>
                        <span
                            className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-4 transition-[background-color,border-color,color] duration-300"
                            style={{
                                background: unlocked ? zone.color : "var(--surface)",
                                borderColor: unlocked ? "var(--surface)" : "var(--border)",
                                color: unlocked ? "#fff" : "var(--muted)",
                                transitionDelay: `${delay}s`,
                            }}
                        >
                            {unlocked ? <FiCheck size={16} /> : <FiLock size={14} />}
                        </span>

                        <div className={`min-w-0 flex-1 pt-0.5 transition-opacity duration-300 ${unlocked ? "opacity-100" : "opacity-50"}`}>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-sm font-bold text-foreground">
                                    {t(`zones.${zone.id}.label`)}
                                </span>

                                {i === unlocks - 1 && (
                                    <motion.span
                                        key={checkpoint}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * STEP + 0.3, duration: 0.3 }}
                                        className="inline-flex items-center gap-1 rounded-full bg-foreground px-2.5 py-1 text-[10px] font-bold text-background"
                                    >
                                        <FiFlag size={10} />
                                        {checkpoint}
                                    </motion.span>
                                )}
                            </div>

                            <p className="mt-0.5 text-xs text-muted">
                                {t(`zones.${zone.id}.description`)}
                            </p>

                            <div className="mt-2 flex gap-1.5">
                                {Array.from({ length: PER_ZONE }).map((_, d) => (
                                    <span
                                        key={d}
                                        className="size-2 rounded-full transition-colors duration-300"
                                        style={{
                                            background: unlocked ? zone.color : "var(--border)",
                                            transitionDelay: unlocked ? `${delay + d * 0.06}s` : "0s",
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
