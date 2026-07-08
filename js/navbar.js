/**
 * ==========================================================
 * File      : navbar.js
 * Module    : Navbar
 * Project   : CPNS Learning Center
 * Version   : 1.0.0
 * ==========================================================
 */

export function initNavbar() {

    // Ambil elemen navbar
    const navbar = document.querySelector(".navbar");

    // Jika navbar tidak ada, hentikan
    if (!navbar) return;

    // Konfigurasi
    const SCROLL_OFFSET = 50;

    // Update tampilan navbar saat scroll
    function updateNavbar() {

        if (window.scrollY > SCROLL_OFFSET) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    // Jalankan saat halaman dimuat
    updateNavbar();

    // Jalankan saat user scroll
    window.addEventListener("scroll", updateNavbar);

}
