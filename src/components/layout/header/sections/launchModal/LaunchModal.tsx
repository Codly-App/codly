"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FiClock, FiCode, FiX, FiArrowRight } from "react-icons/fi";

type LaunchModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

type Countdown = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

const LAUNCH_DATE = new Date("2027-01-05T00:00:00-03:00").getTime();

function getCountdown(): Countdown {
    const difference = Math.max(0, LAUNCH_DATE - Date.now());

    return {
        days: Math.floor(difference / 86_400_000),
        hours: Math.floor((difference / 3_600_000) % 24),
        minutes: Math.floor((difference / 60_000) % 60),
        seconds: Math.floor((difference / 1_000) % 60),
    };
}

export default function LaunchModal({ isOpen, onClose }: LaunchModalProps) {
    const [mounted, setMounted] = useState(false);
    const [countdown, setCountdown] = useState<Countdown | null>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const updateCountdown = () => setCountdown(getCountdown());

        updateCountdown();

        const interval = window.setInterval(updateCountdown, 1000);
        const previousOverflow = document.body.style.overflow;
        const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;

        document.body.style.overflow = "hidden";
        closeButtonRef.current?.focus();

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();

            if (event.key === "Tab") {
                const dialog = document.getElementById("codly-launch-dialog");
                const elements = dialog?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])');

                if (!elements?.length) return;

                const first = elements[0];
                const last = elements[elements.length - 1];

                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            window.clearInterval(interval);
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
            previousFocus?.focus();
        };
    }, [isOpen, onClose]);

    const timeUnits = [
        { label: "Dias", value: countdown?.days },
        { label: "Horas", value: countdown?.hours },
        { label: "Minutos", value: countdown?.minutes },
        { label: "Segundos", value: countdown?.seconds },
    ];

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-9999 flex items-center justify-center overflow-y-auto bg-[#10091f]/75 p-4 backdrop-blur-sm sm:p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) onClose();
                    }}>
                    <motion.div
                        id="codly-launch-dialog"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="codly-launch-title"
                        aria-describedby="codly-launch-description"
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 24, scale: reduceMotion ? 1 : 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: reduceMotion ? 0 : 14, scale: reduceMotion ? 1 : 0.97 }}
                        transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
                        className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-surface p-6 text-foreground shadow-[0_30px_100px_rgba(0,0,0,0.3)] sm:p-9">
                        <div className="pointer-events-none absolute -right-24 -top-28 size-72 rounded-full bg-primary/10 blur-[65px]" />
                        <div className="pointer-events-none absolute -bottom-32 -left-20 size-64 rounded-full bg-primary/10 blur-[70px]" />

                        <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Fechar aviso" className="absolute right-4 top-4 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:bg-lavender hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                            <FiX size={18} />
                        </button>

                        <div className="relative flex flex-col items-center text-center">
                            <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-lavender text-primary shadow-[0_8px_30px_rgba(124,58,237,0.12)]">
                                <FiCode size={30} />
                            </div>

                            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-lavender px-3 py-1.5 text-xs font-semibold text-primary">
                                <span className="relative flex size-2">
                                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-40" />
                                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                                </span>
                                Estamos em desenvolvimento
                            </div>

                            <h2 id="codly-launch-title" className="max-w-sm text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
                                Algo incrível está <span className="text-primary">chegando!</span>
                            </h2>

                            <p id="codly-launch-description" className="mt-4 max-w-sm text-sm leading-6 text-muted sm:text-base">
                                Estamos preparando a Codly para transformar sua jornada na programação com lições, desafios e muita gamificação.
                            </p>

                            <div className="mt-8 w-full">
                                <div className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold text-foreground">
                                    <FiClock size={16} className="text-primary" />
                                    Contagem regressiva para o lançamento
                                </div>

                                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                                    {timeUnits.map((unit) => (
                                        <div key={unit.label} className="flex min-w-0 flex-col items-center justify-center rounded-xl border border-border bg-background px-1 py-4 sm:rounded-2xl sm:py-5">
                                            <span className="text-2xl font-extrabold tabular-nums tracking-tight text-primary sm:text-3xl">
                                                {unit.value === undefined ? "--" : String(unit.value).padStart(2, "0")}
                                            </span>
                                            <span className="mt-1 text-[10px] font-medium text-muted sm:text-xs">
                                                {unit.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <p className="mt-4 text-xs text-muted">
                                    Lançamento previsto para <strong className="text-foreground">05 de janeiro de 2027</strong>
                                </p>
                            </div>

                            <button type="button" onClick={onClose} className="mt-8 inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(124,58,237,0.22)] transition-all duration-300 hover:bg-primary-dark">
                                Entendi, vou aguardar!
                                <FiArrowRight size={17} />
                            </button>

                            <p className="mt-4 text-xs text-muted">
                                O futuro da sua jornada em programação começa aqui. 💜
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
