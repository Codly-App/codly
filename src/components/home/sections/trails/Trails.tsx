"use client";

import { Fragment, useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { FaDatabase, FaArrowRight, FaRoute } from "react-icons/fa6";
import { SiJavascript } from "react-icons/si";
import Container from "@/ui/Container";

function HighlightedCode({ code }: { code: string }) {
    const keywords = [
        "INNER JOIN", "LEFT JOIN", "PARTITION BY", "GROUP BY", "ORDER BY",
        "SELECT", "FROM", "WHERE", "HAVING", "LIMIT", "OVER", "RANK",
        "COUNT", "AS", "DESC", "ASC", "function", "async", "await",
        "const", "let", "return", "throw", "new", "if", "fetch", "console",
    ];

    const pattern = new RegExp(
        `(\`[^\`]*\`|"[^"]*"|'[^']*'|\\/\\/.*$\vert{}\\b(?:${keywords.sort((a, b) => b.length - a.length).join("|")})\\b)`,
        "gm"
    );

    const parts = code.split(pattern);

    return (
        <code>
            {parts.map((part, index) => {
                // Índices pares são texto comum (não deram match em nada do nosso Regex)
                if (index % 2 === 0) {
                    return <Fragment key={index}>{part}</Fragment>;
                }

                // Índices ímpares são os matches. Vamos estilizá-los:
                
                // 1. Strings (começam com aspas ou crase)
                if (/^[`"']/.test(part)) {
                    return <span key={index} className="text-[#8bd5a0]">{part}</span>;
                }
                
                // 2. Comentários (começam com //)
                if (part.startsWith("//")) {
                    return <span key={index} className="text-[#6b6584]">{part}</span>;
                }
                
                // 3. Palavras-chave (o que sobrou)
                return <span key={index} className="text-[#c792ea] font-semibold">{part}</span>;
            })}
        </code>
    );
}

type Level = {
    name: string;
    filename: string;
    code: string;
};

type Course = {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    levels: Level[];
};

const courses: Course[] = [
    {
        icon: <FaDatabase size={18} />,
        title: "SQL",
        subtitle: "Bancos de dados na prática",
        levels: [
            {
                name: "Iniciante",
                filename: "consulta.sql",
                code: `SELECT nome, email
FROM usuarios
WHERE ativo = true
ORDER BY criado_em DESC
LIMIT 10;`,
            },
            {
                name: "Intermediário",
                filename: "relatorio.sql",
                code: `SELECT u.nome, COUNT(p.id) AS pedidos
FROM usuarios u
INNER JOIN pedidos p ON p.usuario_id = u.id
GROUP BY u.nome
HAVING COUNT(p.id) > 3;`,
            },
            {
                name: "Avançado · Pro",
                filename: "ranking.sql",
                code: `SELECT nome, salario,
  RANK() OVER (
    PARTITION BY departamento
    ORDER BY salario DESC
  ) AS posicao
FROM funcionarios;`,
            },
        ],
    },
    {
        icon: <SiJavascript size={16} />,
        title: "JavaScript",
        subtitle: "Lógica de programação na web",
        levels: [
            {
                name: "Iniciante",
                filename: "saudacao.js",
                code: `function saudacao(nome) {
  return \`Olá, \${nome}!\`;
}

console.log(saudacao("Ana"));`,
            },
            {
                name: "Intermediário",
                filename: "api.js",
                code: `async function buscarUsuario(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error("Falhou");
  return res.json();
}`,
            },
            {
                name: "Avançado · Pro",
                filename: "contador.js",
                code: `const comContador = (fn) => {
  let chamadas = 0;
  return (...args) => {
    chamadas++;
    return fn(...args);
  };
};`,
            },
        ],
    },
];

const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function CourseWindow({ course }: { course: Course }) {
    const [active, setActive] = useState(0);
    const level = course.levels[active];

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="flex flex-col gap-5 rounded-3xl bg-surface border border-border p-6 transition-shadow duration-300 hover:shadow-[0_20px_45px_-20px_rgba(91,33,182,0.25)]"
        >
            <div className="flex items-center gap-3 px-1">
                <div
                    className="w-10 h-10 rounded-xl text-primary bg-lavender flex items-center justify-center shrink-0"
                >
                    {course.icon}
                </div>
                <div>
                    <h3 className="font-bold text-lg text-foreground leading-tight">{course.title}</h3>
                    <p className="text-xs text-muted">{course.subtitle}</p>
                </div>
            </div>

            <div className="flex gap-1.5 px-1">
                {course.levels.map((lvl, i) => (
                    <button
                    type="button"
                        key={lvl.name}
                        onClick={() => setActive(i)}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                            active === i
                                ? "bg-primary text-white"
                                : "bg-surface-alt text-muted hover:text-foreground"
                        }`}
                    >
                        {lvl.name}
                    </button>
                ))}
            </div>

            <div className="rounded-2xl overflow-hidden border border-black/10" style={{ background: "#171225" }}>
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-2 text-[11px] text-white/40 font-mono">{level.filename}</span>
                </div>
                <AnimatePresence mode="wait">
                    <motion.pre
                        key={level.name}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                        className="px-4 py-4 text-[12.5px] leading-6 font-mono text-[#e4e1f0] overflow-x-auto"
                    >
                        <HighlightedCode code={level.code} />
                    </motion.pre>
                </AnimatePresence>
            </div>

            <motion.a
                href="#planos"
                whileHover={{ x: 4 }}
                className="self-start flex items-center gap-2 font-bold text-sm px-5 py-2.5 hover:bg-primary hover:text-white hover: text-primary-dark border-primary-dark rounded-full border-2 transition-colors duration-75"
            >
                Começar trilha de {course.title}
                <FaArrowRight size={12} />
            </motion.a>
        </motion.div>
    );
}

export default function Trails() {
    return (
        <section id="cursos" className="relative w-full overflow-hidden section-fade-alt ">
            <Container className="py-20 sm:py-24">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="max-w-xl mb-12"
                >
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-lavender px-3 py-1.5 text-xs font-semibold text-primary">
                        <FaRoute size={13} />
                        <span>Trilhas de lançamento</span>
                    </div>
                    <h2 className="font-bold text-3xl sm:text-4xl mb-3 tracking-tight text-foreground">
                        SQL e JavaScript, do zero ao avançado
                    </h2>
                    <p className="text-muted text-base leading-relaxed">
                        Troque de nível e veja o tipo de código que você vai escrever em cada etapa da trilha.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {courses.map((course) => (
                        <CourseWindow key={course.title} course={course} />
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}