/**
 * ==========================================
 * Loader Module
 * ==========================================
 */

function initLoader() {

    const loader = document.getElementById("loader");

    if (!loader) {
        return;
    }

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.style.opacity = "0";

            loader.style.pointerEvents = "none";

            setTimeout(() => {

                loader.remove();

            },600);

        },800);

    });

}

initLoader();
