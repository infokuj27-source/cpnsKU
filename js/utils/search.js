function initSearch() {

    const input = document.getElementById("searchInput");

    if (!input) return;

    input.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {

            const text = card.innerText.toLowerCase();

            card.style.display = text.includes(keyword)
                ? "block"
                : "none";

        });

    });

}