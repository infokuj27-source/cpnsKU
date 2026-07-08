/**
 * ==========================================================
 * File      : mobile-menu.js
 * Module    : Mobile Menu
 * Project   : CPNS Learning Center
 * Version   : 1.0.0
 * ==========================================================
 */

export function initMobileMenu() {

    // Ambil elemen
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.querySelector(".nav-menu");

    // Validasi
    if (!menuBtn || !navMenu) return;

    /**
     * Toggle Menu
     */
    function toggleMenu() {

        navMenu.classList.toggle("active");
        menuBtn.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (!icon) return;

        icon.className = navMenu.classList.contains("active")
            ? "fa-solid fa-xmark"
            : "fa-solid fa-bars";

    }

    /**
     * Tutup Menu
     */
    function closeMenu() {

        navMenu.classList.remove("active");
        menuBtn.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        if (icon) {

            icon.className = "fa-solid fa-bars";

        }

    }

    // Klik tombol
    menuBtn.addEventListener("click", toggleMenu);

    // Klik salah satu menu
    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

    // Klik di luar menu
    document.addEventListener("click", (event) => {

        if (
            !navMenu.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            closeMenu();

        }

    });

}
