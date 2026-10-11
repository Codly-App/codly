"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "motion/react";
import {
    FiSend,
    FiZap,
    FiRotateCcw,
} from "react-icons/fi";
import TypingDots from "./TypingDots";

type Answers = { name: string; email: string; subject: string; message: string };
type Msg = { id: string; from: "kapy" | "user"; text: string };

const emptyAnswers: Answers = { name: "", email: "", subject: "", message: "" };
const emailOk = (v: string) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);

const steps: {
    key: keyof Answers;
    ask: (a: Answers) => string;
    placeholder?: string;
    type?: string;
    chips?: string[];
}[] = [
    {
        key: "name",
        ask: () => "Oi! Eu sou o Kapy, o mascote da Codly. Como posso te chamar?",
        placeholder: "Seu nome",
    },
    {
        key: "email",
        ask: (a) => `Prazer, ${a.name}! Qual e-mail a equipe pode usar pra te responder?`,
        placeholder: "voce@email.com",
        type: "email",
    },
    {
        key: "subject",
        ask: () => "Sobre o que você quer falar?",
        chips: ["Dúvida sobre cursos", "Dúvida sobre planos", "Problema técnico", "Sugestão", "Outro"],
    },
    {
        key: "message",
        ask: () => "Perfeito. Agora conta pra gente com detalhes:",
        placeholder: "Escreva sua mensagem...",
    },
];
export default function KapyContactChat() {
    const [msgs, setMsgs] = useState<Msg[]>([]);
    const [step, setStep] = useState(0);
    const [typing, setTyping] = useState(false);
    const [value, setValue] = useState("");
    const [done, setDone] = useState(false);
    const [answers, setAnswers] = useState<Answers>(emptyAnswers);

    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const timers = useRef<number[]>([]);

    const kapySay = useCallback((text: string, cb?: () => void)=> {
        setTyping(true);
        const id = window.setTimeout(() => {
            setTyping(false);
            setMsgs((m) => [...m, { id: crypto.randomUUID(), from: "kapy", text }]); 
            cb?.();
        }, 800 + Math.min(text.length * 8, 500));
        timers.current.push(id);
    },[])

    useEffect(() => {
        kapySay(steps[0].ask(emptyAnswers));
        const pending = timers.current;
        return () => pending.forEach((id) => {window.clearTimeout(id)});
    }, [kapySay]);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, []);

    useEffect(() => {
        if (!typing && msgs.length > 1 && !done) inputRef.current?.focus({ preventScroll: true });
    }, [typing, msgs.length, done]);

    function submit(text: string) {
        const v = text.trim();
        if (!v || typing || done) return;

        const current = steps[step];
        setMsgs((m) => [...m, { id: crypto.randomUUID(), from: "user", text: v }]);
        setValue("");

        if (current.key === "email" && !emailOk(v)) {
            kapySay("Hmm, esse e-mail não parece certo. Pode conferir?");
            return;
        }

        const next = { ...answers, [current.key]: v };
        setAnswers(next);

        if (step < steps.length - 1) {
            setStep(step + 1);
            kapySay(steps[step + 1].ask(next));
        } else {
            kapySay(
                `Prontinho, ${next.name}! Já levei sua mensagem pra equipe. Eles respondem em até 2 dias úteis.`,
                () => setDone(true)
            );
        }
    }

    function reset() {
        setMsgs([]);
        setStep(0);
        setDone(false);
        setValue("");
        setAnswers(emptyAnswers);
        kapySay(steps[0].ask(emptyAnswers));
    }

    const current = steps[step];

    const currentChips =() =>{
        if (current.chips){
            return (
                <div className="flex flex-wrap gap-2">
                    {current.chips.map((c) => (
                        <motion.button
                            key={c}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={typing}
                            onClick={() => submit(c)}
                            className="rounded-full border border-primary/20 bg-lavender px-3.5 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white disabled:opacity-50"
                        >
                            {c}
                        </motion.button>
                    ))}
                </div>
            )
        } else {
            return (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        submit(value);
                    }}
                    className="flex items-center gap-2"
                >
                    <input
                        ref={inputRef}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        disabled={typing}
                        type={current.type ?? "text"}
                        placeholder={current.placeholder}
                        className="h-11 flex-1 rounded-xl border border-border bg-surface-alt px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-primary disabled:opacity-60"
                    />
                    <motion.button
                        type="submit"
                        whileTap={{ scale: 0.9 }}
                        disabled={typing || !value.trim()}
                        aria-label="Enviar"
                        className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-[0_8px_20px_-8px_rgba(124,58,237,0.7)] transition-colors hover:bg-primary-dark disabled:opacity-40"
                    >
                        <FiSend size={16} />
                    </motion.button>
                </form>
            )
        }
    }

    return (
        <div className="flex h-130 flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_25px_70px_-30px_rgba(91,33,182,0.35)]">
            <div className="flex items-center gap-3 border-b border-border bg-surface px-5 py-4">
                <div className="relative">
                    <div
                        role="img"
                        aria-label="Kapy"
                        className="size-11 rounded-full border-2 border-lavender bg-surface-alt bg-no-repeat"
                        style={{
                            backgroundImage: "url('/images/KapyFrontal.jpeg')",
                            backgroundSize: "170% auto",
                            backgroundPosition: "50% 9%",
                        }}
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 flex size-3.5">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-70" />
                        <span className="relative inline-flex size-3.5 rounded-full bg-green-500 ring-2 ring-surface" />
                    </span>
                </div>
                <div>
                    <div className="text-sm font-extrabold text-foreground">Kapy</div>
                    <div className="text-xs text-muted">
                        {typing ? "digitando..." : "mascote da Codly"}
                    </div>
                </div>
            </div>

            <div ref={scrollRef} className="flex flex-1 flex-col gap-3 overflow-y-auto bg-background/60 px-5 py-5">
                <AnimatePresence initial={false}>
                    {msgs.map((m) => (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 12, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 380, damping: 26 }}
                            className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                                m.from === "kapy"
                                    ? "self-start rounded-bl-md bg-surface-alt text-foreground"
                                    : "self-end rounded-br-md bg-primary text-white"
                            }`}
                        >
                            {m.text}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {typing && <TypingDots />}

                {done && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                        className="relative mt-1 overflow-hidden rounded-2xl border border-primary/20 bg-lavender p-4"
                    >
                        <motion.span
                            initial={{ x: -30, y: 20, opacity: 0 }}
                            animate={{ x: [-30, 120, 320], y: [20, -10, -50], opacity: [0, 1, 0] }}
                            transition={{ duration: 1.6, ease: "easeOut" }}
                            className="absolute left-0 top-1/2 text-primary"
                        >
                            <FiSend size={18} />
                        </motion.span>
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <div className="text-sm font-extrabold text-foreground">Mensagem enviada!</div>
                                <div className="text-xs text-muted">Valeu por falar com a gente.</div>
                            </div>
                            <motion.span
                                initial={{ scale: 0, rotate: -20 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.5 }}
                                className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-extrabold text-white shadow-[0_8px_18px_-6px_rgba(124,58,237,0.7)]"
                            >
                                <FiZap size={12} />
                                +50 XP
                            </motion.span>
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="border-t border-border bg-surface px-4 py-3">
                {done ? (
                    <button
                        type="button"
                        onClick={reset}
                        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-alt text-sm font-semibold text-foreground transition-colors hover:bg-lavender hover:text-primary"
                    >
                        <FiRotateCcw size={14} />
                        Enviar outra mensagem
                    </button>
                ) : currentChips()}
            </div>
        </div>
    );
}