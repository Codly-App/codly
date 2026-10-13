"use client";

import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";

function subscribe(callback: () => void) {
    const observer = new MutationObserver(callback);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.classList.contains("dark");
const getServerSnapshot = () => false;

export function useTheme() {
    const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const toggleTheme = useCallback(() => {
        const next = !document.documentElement.classList.contains("dark");
        document.documentElement.classList.toggle("dark", next);

        try {
            localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
        } catch {
        }
    }, []);

    return { isDark, toggleTheme };
}