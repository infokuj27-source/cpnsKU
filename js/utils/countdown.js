async function initCountdown() {

    try {

        const response = await fetch("data/countdown.json");

        const data = await response.json();

        const targetDate = new Date(data.target);

        const today = new Date();

        const diff = targetDate - today;

        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        const hari = document.getElementById("hariCount");

        if (hari) {

            hari.textContent = days > 0 ? days : 0;

        }

    } catch (error) {

        console.error("Countdown Error :", error);

    }

}