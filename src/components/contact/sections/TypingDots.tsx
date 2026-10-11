'use client'
import { motion } from "motion/react";

export default function TypingDots() {
    return (
        <div className="flex w-fit items-center gap-1 rounded-2xl rounded-bl-md bg-surface-alt px-4 py-3">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                    className="size-1.5 rounded-full bg-primary"
                />
            ))}
        </div>
    );
}