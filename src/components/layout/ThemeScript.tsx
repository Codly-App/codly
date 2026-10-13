"use client";

import { useServerInsertedHTML } from "next/navigation";

export default function ThemeScript() {
    useServerInsertedHTML(() => <script src="/theme.js" />);

    return null;
}