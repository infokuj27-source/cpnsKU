/**
 * ==========================================
 * Countdown Module
 * CPNS Learning Center
 * ==========================================
 */

export function initCountdown() {

    const day = document.getElementById("days");
    const hour = document.getElementById("hours");
    const minute = document.getElementById("minutes");
    const second = document.getElementById("seconds");

    if (!day || !hour || !minute || !second) return;

    // Ubah tanggal jika jadwal CPNS diumumkan
    const targetDate = new Date("August 31, 2026 23:59:59").getTime();

    function updateCountdown() {

        const now = new Date().getTime();

        const distance = targetDate - now;

        if (distance <= 0) {

            day.textContent = "00";
            hour.textContent = "00";
            minute.textContent = "00";
            second.textContent = "00";

            return;

        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        day.textContent = String(d).padStart(2, "0");
        hour.textContent = String(h).padStart(2, "0");
        minute.textContent = String(m).padStart(2, "0");
        second.textContent = String(s).padStart(2, "0");

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);

}
