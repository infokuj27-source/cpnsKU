/**
 * ==========================================================
 * File      : loader.js
 * Module    : Loader
 * Project   : CPNS Learning Center
 * Version   : 1.0.0
 * ==========================================================
 */

export function initLoader() {

    // Ambil elemen loader
    const loader = document.getElementById("loader");

    // Jika loader tidak ada, hentikan fungsi
    if (!loader) return;

    // Konfigurasi
    const LOADER_DELAY = 800;
    const FADE_DURATION = 600;

    // Hilangkan loader setelah halaman selesai dimuat
    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.style.opacity = "0";
            loader.style.pointerEvents = "none";

            setTimeout(() => {

                loader.remove();

            }, FADE_DURATION);

        }, LOADER_DELAY);

    });

}
