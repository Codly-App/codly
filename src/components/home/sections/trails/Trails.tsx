
"use client";

import { Fragment, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { FaDatabase, FaArrowRight, FaRoute } from "react-icons/fa6";
import { SiJavascript } from "react-icons/si";
import Container from "@/ui/Container";
import SectionInfo from "@/ui/SectionInfo";

type CourseKey = "sql" | "javascript";
type LevelKey = "beginner" | "intermediate" | "advanced";

type Level = {
    id: LevelKey;
    filename: string;
    code: string;
};

type Course = {
    id: CourseKey;
    icon: React.ReactNode;
    title: string;
    levels: Level[];
};

const sqlLevels: Level[] = [
    {
        id: "beginner",
        filename: "consulta.sql",
        code: `SELECT nome, email
FROM usuarios
WHERE ativo = true
ORDER BY criado_em DESC
LIMIT 10;`,
    },
    {
        id: "intermediate",
        filename: "relatorio.sql",
        code: `SELECT u.nome, COUNT(p.id) AS pedidos
FROM usuarios u
INNER JOIN pedidos p ON p.usuario_id = u.id
GROUP BY u.nome
HAVING COUNT(p.id) > 3;`,
    },
    {
        id: "advanced",
        filename: "ranking.sql",
        code: `SELECT nome, salario,
  RANK() OVER (
    PARTITION BY departamento
    ORDER BY salario DESC
  ) AS posicao
FROM funcionarios;`,
    },
];

const javascriptLevels: Level[] = [
    {
        id: "beginner",
        filename: "greeting.js",
        code: `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Ana"));`,
    },
    {
        id: "intermediate",
        filename: "api.js",
        code: `async function fetchUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error("Failed");
  return res.json();
}`,
    },
    {
        id: "advanced",
        filename: "counter.js",
        code: `const withCounter = (fn) => {
  let calls = 0;
  return (...args) => {
    calls++;
    return fn(...args);
  };
};`,
    },
];

const localizedCode = {
    "pt-BR": {
        greeting: "Olá",
        error: "Falhou",
    },
    en: {
        greeting: "Hello",
        error: "Failed",
    },
    es: {
        greeting: "Hola",
        error: "Error",
    },
} as const;

function getJavaScriptLevels(locale: string): Level[] {
    const texts = localizedCode[locale as keyof typeof localizedCode] ?? localizedCode["pt-BR"];

    return javascriptLevels.map((level) => {
        if (level.id === "beginner") {
            return {
                ...level,
                code: level.code.replace("Hello", texts.greeting),
            };
        }

        if (level.id === "intermediate") {
            return {
                ...level,
                code: level.code.replace('"Failed"', `"${texts.error}"`),
            };
        }

        return level;
    });
}

function HighlightedCode({ code }: { code: string }) {
    const keywords = [
        "INNER JOIN", "LEFT JOIN", "PARTITION BY", "GROUP BY",
        "ORDER BY", "SELECT", "FROM", "WHERE", "HAVING",
        "LIMIT", "OVER", "RANK", "COUNT", "AS", "DESC",
        "ASC", "function", "async", "await", "const",
        "let", "return", "throw", "new", "if",
    ];

    const pattern = new RegExp(
        `(\`[^\`]*\`|"[^"]*"|'[^']*'|\\/\\/[^\\n]*|\\b(?:${keywords.join("|")})\\b)`,
        "gm"
    );

    const parts = code.split(pattern);

    return (
        <code>
            {parts.map((part, index) => {
                if (index % 2 === 0) {
                    return <Fragment key={index}>{part}</Fragment>;
                }

                if (/^[`"']/.test(part)) {
                    return <span key={index} className="text-[#8bd5a0]">{part}</span>;
                }

                if (part.startsWith("//")) {
                    return <span key={index} className="text-[#6b6584]">{part}</span>;
                }

                return <span key={index} className="font-semibold text-[#c792ea]">{part}</span>;
            })}
        </code>
    );
}

const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

function CourseWindow({ course }: { course: Course }) {
    const t = useTranslations("Trails");
    const [active, setActive] = useState(0);
    const level = course.levels[active];

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="flex min-w-0 flex-col gap-5 rounded-3xl border border-border bg-surface p-4 transition-shadow duration-300 hover:shadow-[0_20px_45px_-20px_rgba(91,33,182,0.25)] sm:p-6"
        >
            <div className="flex items-center gap-3 px-1">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-lavender text-primary">
                    {course.icon}
                </div>

                <div>
                    <h3 className="text-lg font-bold leading-tight text-foreground">
                        {course.title}
                    </h3>

                    <p className="text-xs text-muted">
                        {t(`courses.${course.id}.subtitle`)}
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-1.5 px-1">
                {course.levels.map((lvl, i) => (
                    <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setActive(i)}
                        aria-pressed={active === i}
                        className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${active === i ? "bg-primary text-white" : "bg-surface-alt text-muted hover:text-foreground"}`}
                    >
                        {t(`levels.${lvl.id}`)}
                    </button>
                ))}
            </div>

            <div className="min-w-0 overflow-hidden rounded-2xl border border-black/10 bg-[#171225]">
                <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5">
                    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="size-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="size-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-2 font-mono text-[11px] text-white/40">
                        {level.filename}
                    </span>
                </div>

                <AnimatePresence mode="wait">
                    <motion.pre
                        key={`${course.id}-${level.id}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-6 text-[#e4e1f0]"
                    >
                        <HighlightedCode code={level.code} />
                    </motion.pre>
                </AnimatePresence>
            </div>

            <motion.a
                href="#planos"
                whileHover={{ x: 4 }}
                className="inline-flex self-start items-center gap-2 rounded-full border-2 border-primary-dark px-5 py-2.5 text-sm font-bold text-primary-dark transition-colors duration-150 hover:bg-primary hover:text-white dark:text-white"
            >
                {t(`courses.${course.id}.button`)}
                <FaArrowRight size={12} />
            </motion.a>
        </motion.div>
    );
}

export default function Trails() {
    const t = useTranslations("Trails");
    const locale = useLocale();

    const courses: Course[] = [
        {
            id: "sql",
            icon: <FaDatabase size={18} />,
            title: "SQL",
            levels: sqlLevels,
        },
        {
            id: "javascript",
            icon: <SiJavascript size={16} />,
            title: "JavaScript",
            levels: getJavaScriptLevels(locale),
        },
    ];

    return (
        <section id="cursos" className="relative w-full overflow-hidden section-fade-alt">
            <Container className="py-20 sm:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 max-w-xl"
                >
                    <SectionInfo
                        icon={<FaRoute size={13} />}
                        subTitle={t("subtitle")}
                        title={t("title")}
                    />

                    <p className="text-base leading-relaxed text-muted">
                        {t("description")}
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-1 gap-6 md:grid-cols-2"
                >
                    {courses.map((course) => (
                        <CourseWindow key={course.id} course={course} />
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}
