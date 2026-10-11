'use client'


import { motion } from "motion/react";
import {
    FiMail,
    FiMessageCircle,
    FiCode,
} from "react-icons/fi";

export default function FloatingContactIcons() {

    const floaters = [
        { id: "mail", icon: <FiMail size={20} />, className: "left-2 top-2", delay: 0 },
        { id: "chat", icon: <FiMessageCircle size={22} />, className: "left-24 top-16", delay: 0.8 },
        { id: "code", icon: <FiCode size={20} />, className: "left-4 top-28", delay: 1.6 },
    ];

    return (
        <div className="relative hidden h-44 w-48 shrink-0 md:block">
            {floaters.map((f, i) => (
                <motion.span
                    key={f.id}
                    animate={{ y: [0, -14, 0], rotate: [-6, 6, -6] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
                    className={`absolute flex size-14 items-center justify-center rounded-2xl border border-border bg-surface text-primary shadow-[0_14px_30px_-12px_rgba(91,33,182,0.35)] ${f.className}`}
                >
                    {f.icon}
                </motion.span>
            ))}
        </div>
    )
}