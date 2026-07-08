/**
 * ==========================================================
 * File      : scroll.js
 * Module    : Smooth Scroll
 * Project   : CPNS Learning Center
 * Version   : 1.0.0
 * ==========================================================
 */

export function initScroll() {

    // Ambil semua link navigasi
    const navLinks = document.querySelectorAll('a[href^="#"]');

    // Validasi
    if (!navLinks.length) return;

    const NAVBAR_HEIGHT = 80;

    navLinks.forEach(link => {

        link.addEventListener("click", function(event){

            const targetId = this.getAttribute("href");

            const target = document.querySelector(targetId);

            if(!target) return;

            event.preventDefault();

            const position =

                target.offsetTop - NAVBAR_HEIGHT;

            window.scrollTo({

                top:position,

                behavior:"smooth"

            });

        });

    });

}
