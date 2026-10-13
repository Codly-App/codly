"use client";

import { motion } from "motion/react";
import { FiTarget } from "react-icons/fi";
import SectionInfo from "@/ui/SectionInfo";
import Container from "@/ui/Container";
import GoalCard from "./GoalCard";
import StreakCard from "./StreakCard";

export const days = ["S", "T", "Q", "Q", "S", "S", "D"];

export function longestRun(list: boolean[]) {
    let best = 0;
    let run = 0;
    for (const d of list) {
        run = d ? run + 1 : 0;
        best = Math.max(best, run);
    }
    return best;
}

export default function StreakAndGoal() {
    return (
        <section className="relative w-full overflow-hidden bg-background border-b border-border">
            <Container className="py-20 sm:py-24">
                <div className="max-w-xl">
                    <SectionInfo icon={<FiTarget size={13} />} subTitle="Rotina" title="Constância vale mais que pressa" />
                    <p className="-mt-4 mb-10 text-base leading-relaxed text-muted">
                        Sequência e meta diária trabalham juntas para criar o hábito de estudar um pouco todo dia.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}
                    className="grid gap-6 lg:grid-cols-2"
                >
                    <StreakCard />
                    <GoalCard />
                </motion.div>
            </Container>
        </section>
    );
}