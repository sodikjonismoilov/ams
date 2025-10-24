import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";


const STORAGE_KEY = "theme"; //light or dark

function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
}

export default function ThemeToggle() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initial = saved || (systemDark ? "dark" : "light");
        setTheme(initial);
        applyTheme(initial);
    }, []);

    function toggle () {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        applyTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
    }
    return (
        <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
            {theme === "dark" ? <Sun className="w-10 h-10"/> : <Moon className="w-10 h-10"/>}
            </Button>
    );
}