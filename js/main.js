/**
 * ==========================================================
 * File      : main.js
 * Project   : CPNS Learning Center
 * Version   : 1.0.0
 * ==========================================================
 */

import { initLoader } from "./loader.js";
import { initNavbar } from "./navbar.js";
import { initDarkMode } from "./darkmode.js";
import { initMobileMenu } from "./mobile-menu.js";
import { initScroll } from "./scroll.js";

// Nanti akan ditambah modul lain
// import { initNavbar } from "./navbar.js";
// import { initDarkMode } from "./darkmode.js";

document.addEventListener("DOMContentLoaded", () => {

    console.log("=====================================");
    console.log("🚀 CPNS Learning Center");
    console.log("Version : 1.0.0");
    console.log("Status  : Running");
    console.log("=====================================");

    // Inisialisasi modul
    initLoader();
    initNavbar();
    initDarkMode();
    initMobileMenu();
    initScroll();
});
