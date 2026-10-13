"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {  FiCheck } from "react-icons/fi";
import { FaFire } from "react-icons/fa6";
import { days, longestRun } from "./StreakAndGoal";

export default function StreakCard() {
    const [studied, setStudied] = useState<boolean[]>([true, true, true, true, false, false, false]);
    const streak = longestRun(studied);

    function toggle(i: number) {
        setStudied((s) => s.map((v, idx) => (idx === i ? !v : v)));
    }

    return (
        <div className="rounded-3xl border border-border bg-surface p-7">
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <div className="text-sm font-extrabold text-foreground">Sequência diária</div>
                    <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted">
                        Estudou no dia, a sequência cresce. Pulou um dia, ela recomeça. Clique nos dias para testar.
                    </p>
                </div>
                <motion.div
                    animate={{ scale: 1 + Math.min(streak, 7) * 0.06 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14 }}
                    className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500"
                >
                    <FaFire size={26} />
                </motion.div>
            </div>

            <div className="mb-6 flex items-end gap-2">
                <motion.span key={streak} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl font-extrabold leading-none tracking-tight text-foreground">
                    {streak}
                </motion.span>
                <span className="mb-1 text-sm text-muted">{streak === 1 ? "dia seguido" : "dias seguidos"}</span>
            </div>

            <div className="grid grid-cols-7 gap-2">
                {days.map((d, i) => (
                    <div key={d} className="flex flex-col items-center gap-2">
                        <span className="text-[11px] font-semibold text-muted">{d}</span>
                        <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() => toggle(i)}
                            aria-label={`Alternar dia ${i + 1}`}
                            className={`flex size-10 items-center justify-center rounded-full border transition-colors ${
                                studied[i] ? "border-primary bg-primary text-white" : "border-border bg-surface-alt text-transparent hover:text-muted"
                            }`}
                        >
                            <FiCheck size={16} strokeWidth={3} />
                        </motion.button>
                    </div>
                ))}
            </div>
        </div>
    );
}