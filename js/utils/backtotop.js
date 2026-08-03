function initBackToTop() {

    const button = document.createElement("button");

    button.id = "backToTop";

    button.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

    document.body.appendChild(button);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}