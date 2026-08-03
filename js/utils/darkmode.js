function initDarkMode() {

    const button = document.getElementById("darkMode");

    if (!button) return;

    // Membaca tema yang tersimpan
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    }

    button.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

        } else {

            localStorage.setItem("theme", "light");

        }

        const icon = button.querySelector("i");

if(document.body.classList.contains("dark-mode")){
    icon.className = "fa-solid fa-sun";
}else{
    icon.className = "fa-solid fa-moon";
}

    });

}