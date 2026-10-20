
"use client";

import SectionInfo from "@/ui/SectionInfo";
import Container from "@/ui/Container";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { FaArrowRight, FaFire } from "react-icons/fa6";
import { FiHome, FiBookOpen, FiUsers, FiUser, FiBell, FiPlay, FiCheck } from "react-icons/fi";

const features = ["dailyGoal", "streak", "achievements", "friends"] as const;

const weekDays = [
    { id: "monday", done: true },
    { id: "tuesday", done: true },
    { id: "wednesday", done: true },
    { id: "thursday", done: true },
    { id: "friday", done: true },
    { id: "saturday", done: false },
    { id: "sunday", done: false },
] as const;

export default function GamificationPhoneMockup() {
    const t = useTranslations("GamificationPhoneMockup");

    return (
        <section id="gamificacao" className="relative w-full overflow-hidden bg-background select-none">
            <Container className="grid grid-cols-1 items-center gap-14 py-20 sm:py-24 lg:grid-cols-2">

                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="flex justify-center lg:order-2 lg:justify-end">

                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="relative w-65 sm:w-70">
                        <div className="absolute -inset-10 rounded-full bg-primary/10 blur-3xl" />

                        <div className="relative rounded-[2.5rem] border-10 border-black bg-[#1A1330] shadow-[0_40px_80px_-30px_rgba(91,33,182,0.45)]">
                            <div className="absolute left-1/2 top-0 z-20 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-black" />

                            <div className="relative flex aspect-9/19.5 flex-col overflow-hidden rounded-[1.9rem] bg-background">

                                <div className="flex items-center justify-between px-5 pt-4 text-[10px] font-semibold text-foreground">
                                    <span>9:41</span>
                                    <span className="text-muted">●●●</span>
                                </div>

                                <div className="mt-3 flex items-center justify-between px-4">
                                    <div>
                                        <p className="text-[10px] text-muted">{t("phone.greeting")}</p>
                                        <p className="text-sm font-extrabold leading-tight text-foreground">Ana</p>
                                    </div>

                                    <div className="relative">
                                        <span className="flex size-8 items-center justify-center rounded-full border border-border bg-surface text-muted">
                                            <FiBell size={14} />
                                        </span>
                                        <span className="absolute right-0 top-0 size-2 rounded-full bg-orange-500 ring-2 ring-background" />
                                    </div>
                                </div>

                                <div className="mx-4 mt-3 rounded-2xl bg-linear-to-br from-primary to-primary-dark p-3.5 text-white shadow-[0_12px_24px_-12px_rgba(91,33,182,0.7)]">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <FaFire className="text-orange-300" size={16} />
                                                <span className="text-2xl font-extrabold leading-none">18</span>
                                            </div>

                                            <p className="mt-1 text-[10px] text-white/70">
                                                {t("phone.streakDays")}
                                            </p>
                                        </div>

                                        <div className="relative flex size-14 items-center justify-center rounded-full" style={{ background: "conic-gradient(#fff 240deg, rgba(255,255,255,0.22) 0deg)" }}>
                                            <div className="absolute inset-1.25 flex flex-col items-center justify-center rounded-full bg-primary-dark">
                                                <span className="text-xs font-extrabold leading-none">2/3</span>
                                                <span className="text-[7px] text-white/70">{t("phone.goal")}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex justify-between">
                                        {weekDays.map((day) => (
                                            <div key={day.id} className="flex flex-col items-center gap-1">
                                                <span className="text-[8px] text-white/60">
                                                    {t(`phone.weekDays.${day.id}`)}
                                                </span>

                                                <span className={`flex size-5 items-center justify-center rounded-full ${day.done ? "bg-white text-primary" : "bg-white/15 text-transparent"}`}>
                                                    <FiCheck size={10} strokeWidth={3} />
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mx-4 mt-3">
                                    <p className="mb-1.5 text-[9px] font-bold uppercase tracking-wide text-muted">
                                        {t("phone.continueLearning")}
                                    </p>

                                    <div className="rounded-2xl border border-border bg-surface p-3">
                                        <div className="flex items-center gap-2.5">
                                            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#171225] font-mono text-[9px] font-bold text-[#c792ea]">
                                                SQL
                                            </span>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-xs font-extrabold text-foreground">
                                                    {t("phone.lessonTitle")}
                                                </p>

                                                <p className="text-[9px] text-muted">
                                                    {t("phone.lessonProgress")}
                                                </p>
                                            </div>

                                            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0_6px_12px_-4px_rgba(124,58,237,0.6)]">
                                                <FiPlay size={11} />
                                            </span>
                                        </div>

                                        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-border/60">
                                            <motion.span initial={{ width: 0 }} whileInView={{ width: "66%" }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }} className="block h-full rounded-full bg-primary" />
                                        </div>
                                    </div>
                                </div>

                                <div className="mx-4 mt-3 flex items-center justify-between rounded-2xl border border-border bg-surface px-3 py-2.5">
                                    <div className="flex items-center">
                                        {[
                                            { i: "MA", c: "var(--primary)" },
                                            { i: "RS", c: "var(--primary-dark)" },
                                            { i: "DP", c: "#F59E0B" },
                                        ].map((avatar, index) => (
                                            <span key={avatar.i} className={`flex size-6 items-center justify-center rounded-full text-[8px] font-extrabold text-white ring-2 ring-surface ${index > 0 ? "-ml-2" : ""}`} style={{ background: avatar.c }}>
                                                {avatar.i}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="text-right">
                                        <p className="text-[10px] font-extrabold text-foreground">
                                            {t("phone.ranking")}
                                        </p>

                                        <p className="text-[8px] text-muted">
                                            {t("phone.weeklyXP")}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex-1" />

                                <div className="flex items-center justify-around border-t border-border/60 bg-surface px-5 pb-3 pt-2.5">
                                    <div className="flex flex-col items-center gap-1 text-primary">
                                        <FiHome size={17} />
                                        <span className="size-1 rounded-full bg-primary" />
                                    </div>

                                    <div className="flex flex-col items-center gap-1 text-muted">
                                        <FiBookOpen size={17} />
                                        <span className="size-1" />
                                    </div>

                                    <div className="flex flex-col items-center gap-1 text-muted">
                                        <FiUsers size={17} />
                                        <span className="size-1" />
                                    </div>

                                    <div className="flex flex-col items-center gap-1 text-muted">
                                        <FiUser size={17} />
                                        <span className="size-1" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }} className="lg:order-1">
                    <SectionInfo icon={<FaFire size={13} />} title={t("title")} subTitle={t("subtitle")} />

                    <p className="mb-8 max-w-md text-base leading-relaxed text-muted">
                        {t("description")}
                    </p>

                    <div className="flex flex-col divide-y divide-border">
                        {features.map((feature) => (
                            <div key={feature} className="py-4 first:pt-0">
                                <div className="text-sm font-extrabold text-foreground">
                                    {t(`features.${feature}.title`)}
                                </div>

                                <p className="mt-1 text-sm leading-relaxed text-muted">
                                    {t(`features.${feature}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <motion.div whileHover={{ x: 4 }} className="mt-2 inline-flex">
                        <Link href="/gamification" className="inline-flex items-center gap-2 rounded-3xl border-2 border-primary-dark px-5 py-2.5 text-sm font-bold text-primary-dark transition-colors duration-150 hover:bg-primary hover:text-white dark:text-white">
                            {t("moreDetails")}
                            <FaArrowRight size={12} />
                        </Link>
                    </motion.div>
                </motion.div>

            </Container>
        </section>
    );
}
