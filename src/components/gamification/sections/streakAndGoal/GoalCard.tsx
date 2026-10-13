"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FiPlus, FiRotateCcw } from "react-icons/fi";


export default function GoalCard() {
    const [goal, setGoal] = useState(2);
    const [done, setDone] = useState(1);

    const pct = Math.min(done / goal, 1);
    const hit = done >= goal;

    function changeGoal(g: number) {
        setGoal(g);
        setDone((d) => Math.min(d, g));
    }

    return (
        <div className="rounded-3xl border border-border bg-surface p-7">
            <div className="mb-6">
                <div className="text-sm font-extrabold text-foreground">Meta diária</div>
                <p className="mt-1 max-w-xs text-sm leading-relaxed text-muted">
                    Escolha estudar 1, 2 ou 3 lições por dia e acompanhe o progresso do dia.
                </p>
            </div>

            <div className="mb-6 grid grid-cols-3 gap-2">
                {[1, 2, 3].map((g) => (
                    <button
                        type="button"
                        key={g}
                        onClick={() => changeGoal(g)}
                        className={`h-11 rounded-xl text-sm font-bold transition-colors ${
                            goal === g ? "bg-primary text-white" : "bg-surface-alt text-muted hover:text-foreground"
                        }`}
                    >
                        {g} {g === 1 ? "lição" : "lições"}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-6">
                <div
                    className="relative flex size-28 shrink-0 items-center justify-center rounded-full transition-[background] duration-500"
                    style={{ background: `conic-gradient(var(--primary) ${pct * 360}deg, var(--surface-alt) 0deg)` }}
                >
                    <div className="absolute inset-2 flex flex-col items-center justify-center rounded-full bg-surface">
                        <span className="text-2xl font-extrabold leading-none text-foreground">{done}/{goal}</span>
                        <span className="mt-1 text-[10px] text-muted">hoje</span>
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-2">
                    {hit ? (
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-xl bg-lavender px-3 py-2 text-sm font-extrabold text-primary">
                            Meta batida!
                        </motion.div>
                    ) : (
                        <p className="text-sm text-muted">Faltam {goal - done} para bater a meta.</p>
                    )}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setDone((d) => Math.min(d + 1, goal))}
                            disabled={hit}
                            className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary text-xs font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-40"
                        >
                            <FiPlus size={14} />
                            Concluir lição
                        </button>
                        <button
                            type="button"
                            onClick={() => setDone(0)}
                            aria-label="Zerar"
                            className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface-alt text-muted transition-colors hover:text-primary"
                        >
                            <FiRotateCcw size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}