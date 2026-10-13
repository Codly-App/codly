"use client";


import Link from "next/link";
import Typewriter from "typewriter-effect";
import { motion, AnimatePresence } from "motion/react";
import {
    FiMail,

    FiInstagram,
    FiArrowUpRight,
    FiCopy,
    FiCheck,
} from "react-icons/fi";
import SectionInfo from "@/ui/SectionInfo";
import FloatingContactIcons from "./sections/FloatingContactIcons";
import FrequentlyQuestions from "./sections/FrequentlyQuestions";
import KapyContactChat from "./sections/KapyContactChat";
import { useState } from "react";

const EMAIL = "contato@codly.com.br";

export default function ContatoMain() {
    const [copied, setCopied] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    async function copyEmail() {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch (err) {
            console.error("Falha ao copiar o e-mail: ", err);
        }
    }

    return (
        <section className="relative w-full overflow-hidden bg-background">
            <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute -left-24 bottom-0 size-72 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative mx-auto w-400 max-w-full py-20 sm:py-24">
                <div className="mb-12 flex items-start justify-between gap-10">
                    <div className="max-w-xl">
                        <SectionInfo icon={<FiMail size={13} />} subTitle="Contato" title="Fale com a gente" />
                        <p className="-mt-4 text-base leading-relaxed text-muted">
                            Pode falar com a gente sobre{" "}
                            <span className="inline-block font-bold text-primary [&>div]:inline">
                                <Typewriter
                                    options={{
                                        strings: [
                                            "dúvidas sobre cursos",
                                            "sugestões de conteúdo",
                                            "problemas técnicos",
                                            "parcerias",
                                        ],
                                        autoStart: true,
                                        loop: true,
                                        delay: 45,
                                        deleteSpeed: 25,
                                    }}
                                />
                            </span>
                        </p>
                    </div>

                    <FloatingContactIcons/>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <KapyContactChat />
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ staggerChildren: 0.12 }}
                        className="flex flex-col gap-5"
                    >
                        <motion.div
                            variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}
                            className="rounded-3xl border border-border bg-surface p-6"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="flex size-11 items-center justify-center rounded-xl bg-lavender text-primary">
                                        <FiMail size={18} />
                                    </span>
                                    <div>
                                        <div className="text-sm font-extrabold text-foreground">Prefere e-mail?</div>
                                        <div className="text-sm text-muted">{EMAIL}</div>
                                    </div>
                                </div>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={copyEmail}
                                    aria-label="Copiar e-mail"
                                    className="relative flex size-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-alt text-primary transition-colors hover:bg-lavender"
                                >
                                    <AnimatePresence mode="wait" initial={false}>
                                        <motion.span
                                            key={copied ? "ok" : "copy"}
                                            initial={{ scale: 0, rotate: -90 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0 }}
                                            transition={{ duration: 0.18 }}
                                        >
                                            {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
                                        </motion.span>
                                    </AnimatePresence>
                                </motion.button>
                            </div>
                            <AnimatePresence>
                                {copied && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden pt-3 text-xs font-semibold text-primary"
                                    >
                                        E-mail copiado!
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <motion.div variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}>
                            <Link
                                href="https://instagram.com/codly"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative block overflow-hidden rounded-3xl bg-linear-to-br from-primary to-primary-dark p-6 text-white shadow-[0_20px_40px_-20px_rgba(91,33,182,0.7)] transition-transform duration-300 hover:-translate-y-1"
                            >
                                <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/20 blur-md transition-transform duration-700 group-hover:translate-x-[420%]" />
                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <motion.span
                                            whileHover={{ rotate: [0, -12, 12, 0] }}
                                            transition={{ duration: 0.5 }}
                                            className="flex size-12 items-center justify-center rounded-2xl bg-white/15"
                                        >
                                            <FiInstagram size={22} />
                                        </motion.span>
                                        <div>
                                            <div className="text-base font-extrabold">@codly</div>
                                            <div className="text-xs text-white/75">Novidades e dicas rápidas de código</div>
                                        </div>
                                    </div>
                                    <FiArrowUpRight
                                        size={20}
                                        className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                                    />
                                </div>
                            </Link>
                        </motion.div>
                        <FrequentlyQuestions openFaq={openFaq} setOpenFaq={setOpenFaq}/>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}