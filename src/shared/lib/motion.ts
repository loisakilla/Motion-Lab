const STORAGE_KEY = "mlab-reduced-motion";


export function shouldReduceMotion(): boolean {
    const manual = localStorage.getItem(STORAGE_KEY);
    if (manual === "on") return true;
    if (manual === "off") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}


export function setReducedMotion(on: boolean) {
    localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
    document.documentElement.classList.toggle("reduced-motion", on);
}


export function initReducedMotionFromStorage() {
    const manual = localStorage.getItem(STORAGE_KEY);
    if (manual) document.documentElement.classList.toggle("reduced-motion", manual === "on");
}