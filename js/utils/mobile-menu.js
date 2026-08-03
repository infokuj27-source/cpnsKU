function initMobileMenu() {

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.querySelector(".nav-links");

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}