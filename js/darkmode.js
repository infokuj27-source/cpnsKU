/**
 * ==========================================================
 * File      : darkmode.js
 * Module    : Dark Mode
 * Project   : CPNS Learning Center
 * Version   : 1.0.0
 * ==========================================================
 */

export function initDarkMode() {

    // Ambil tombol dark mode
    const toggle = document.getElementById("themeToggle");

    // Jika tombol tidak ada, hentikan
    if (!toggle) return;

    const STORAGE_KEY = "cpns-theme";

    /**
     * Mengaktifkan tema
     */
    function applyTheme(theme) {

        document.body.classList.toggle("dark", theme === "dark");

        toggle.innerHTML =
            theme === "dark"
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';

    }

    /**
     * Ambil tema yang tersimpan
     */
    const savedTheme = localStorage.getItem(STORAGE_KEY) || "light";

    applyTheme(savedTheme);

    /**
     * Klik tombol
     */
    toggle.addEventListener("click", () => {

        const isDark = document.body.classList.contains("dark");

        const newTheme = isDark ? "light" : "dark";

        applyTheme(newTheme);

        localStorage.setItem(STORAGE_KEY, newTheme);

    });

}
