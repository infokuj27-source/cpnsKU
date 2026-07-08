/**
 * ==========================================================
 * File      : countdown.js
 * Module    : Countdown
 * Project   : CPNS Learning Center
 * Version   : 1.0.0
 * ==========================================================
 */

export function initCountdown() {

    // ======================================================
    // Ambil Elemen
    // ======================================================

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    // Validasi
    if (!days || !hours || !minutes || !seconds) return;

    // ======================================================
    // Tanggal Target
    // ======================================================

    // Ganti sesuai jadwal resmi CPNS
    const TARGET_DATE = new Date("2026-08-01T00:00:00").getTime();

    // ======================================================
    // Update Countdown
    // ======================================================

    function updateCountdown() {

        const now = Date.now();

        const distance = TARGET_DATE - now;

        // Countdown selesai
        if (distance <= 0) {

            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";

            clearInterval(timer);

            return;

        }

        const day = Math.floor(distance / (1000 * 60 * 60 * 24));

        const hour = Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );

        const minute = Math.floor(
            (distance % (1000 * 60 * 60))
            /
            (1000 * 60)
        );

        const second = Math.floor(
            (distance % (1000 * 60))
            /
            1000
        );

        days.textContent = String(day).padStart(2, "0");
        hours.textContent = String(hour).padStart(2, "0");
        minutes.textContent = String(minute).padStart(2, "0");
        seconds.textContent = String(second).padStart(2, "0");

    }

    // Pertama kali dijalankan
    updateCountdown();

    // Update setiap detik
    const timer = setInterval(updateCountdown, 1000);

}
