"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FiMessageCircle, FiX, FiSend, FiArrowLeft } from "react-icons/fi";
import { getResponse } from "@/lib/getResponse";

type Message = {
    id: number;
    role: "bot" | "user";
    content: string;
};

const welcomeMessage: Message = {
    id: 0,
    role: "bot",
    content: "Olá! 🦫💜 Eu sou o Kapy, assistente da Codly! Posso te ajudar com dúvidas sobre o aplicativo, instalação, planos, desafios e muito mais. O que gostaria de saber?",
};

export default function MessegerBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
    const [mounted, setMounted] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const nextId = useRef(1);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!isOpen || messages.length === 0) return;

        messagesEndRef.current?.scrollIntoView({
            behavior: reduceMotion ? "instant" : "smooth",
            block: "end",
        });
    }, [isOpen, messages.length, reduceMotion]);

    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setIsOpen(false);
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    const sendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const text = input.trim();
        if (!text || text.length > 300) return;

        const userMessage: Message = {
            id: nextId.current++,
            role: "user",
            content: text,
        };

        const botMessage: Message = {
            id: nextId.current++,
            role: "bot",
            content: getResponse(text),
        };

        setMessages((prev) => [...prev, userMessage, botMessage]);
        setInput("");
        inputRef.current?.focus();
    };

    if (!mounted) return null;

    return createPortal(
        <div className="pointer-events-none fixed inset-0 z-9995">
            <AnimatePresence>
                {isOpen && (
                    <motion.section
                        id="codly-chatbot"
                        role="dialog"
                        aria-label="Assistente Kapy da Codly"
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: reduceMotion ? 0.1 : 0.25, ease: "easeOut" }}
                        className="pointer-events-auto absolute right-4 bottom-22 flex h-[min(560px,calc(100dvh-120px))] w-95 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_20px_70px_rgba(26,19,48,0.2)] sm:right-6 sm:bottom-24">
                        <div className="flex shrink-0 items-center justify-between bg-primary px-5 py-4 text-white">
                            <div className="flex min-w-0 items-center gap-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20 text-xl">
                                    🦫
                                </div>

                                <div className="min-w-0">
                                    <h2 className="truncate text-sm font-bold">Kapy Assistente</h2>
                                    <p className="truncate text-xs text-white/80">Tire suas dúvidas sobre a Codly</p>
                                </div>
                            </div>

                            <button type="button" onClick={() => setIsOpen(false)} aria-label="Fechar chat" className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-white/15">
                                <FiX size={19} />
                            </button>
                        </div>

                        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto bg-background/60 px-4 py-5" aria-live="polite">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex w-full shrink-0 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`min-w-0 max-w-[88%] wrap-break-word rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${message.role === "user" ? "rounded-br-md bg-primary text-white" : "rounded-bl-md border border-border bg-surface text-foreground"}`}>
                                        {message.content}
                                    </div>
                                </motion.div>
                            ))}

                            <div ref={messagesEndRef} className="shrink-0" />
                        </div>

                        <form onSubmit={sendMessage} className="flex shrink-0 items-center gap-2 border-t border-border bg-surface p-3">
                            <label htmlFor="codly-chat-input" className="sr-only">Sua pergunta sobre a Codly</label>

                            <input
                                ref={inputRef}
                                id="codly-chat-input"
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                                maxLength={300}
                                placeholder="Pergunte algo sobre a Codly..."
                                autoComplete="off"
                                className="h-11 min-w-0 flex-1 rounded-xl border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-primary"/>

                            <button type="submit" disabled={!input.trim()} aria-label="Enviar mensagem" className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40">
                                <FiSend size={18} />
                            </button>
                        </form>
                    </motion.section>
                )}
            </AnimatePresence>

            <motion.button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                whileHover={reduceMotion ? undefined : { scale: 1.07 }}
                whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                aria-label={isOpen ? "Fechar assistente" : "Conversar com o Kapy"}
                aria-expanded={isOpen}
                aria-controls="codly-chatbot"
                className="pointer-events-auto absolute right-4 bottom-4 flex size-14 cursor-pointer items-center justify-center rounded-2xl bg-primary text-white shadow-[0_10px_30px_rgba(124,58,237,0.35)] transition-colors hover:bg-primary-dark sm:right-6 sm:bottom-6">
                {isOpen ? <FiArrowLeft size={24} /> : <FiMessageCircle size={25} />}
            </motion.button>
        </div>,
        document.body
    );
}