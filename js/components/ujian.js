/* ==========================================
   SISTEM UJIAN CPNS
   ========================================== */

let soalUjian = [];
let nomorSoal = 0;
let jawabanUser = [];
let jenisUjianAktif = "";
let timerFinal = null;
let waktuFinal = 100 * 60;
let waktuMulaiFinal = null;


/* ==========================================
   MEMBUAT HALAMAN UJIAN
   ========================================== */

async function mulaiUjian(jenis) {

    jenisUjianAktif = jenis;

    let fileSoal = "";

    if (jenis === "twk") {
        fileSoal = "data/soal/twk.json";
    }

    if (jenis === "tiu") {
        fileSoal = "data/soal/tiu.json";
    }

    if (jenis === "tkp") {
        fileSoal = "data/soal/tkp.json";
    }

    if (jenis === "final") {
        fileSoal = "data/soal/final.json";
    }


    try {

        const response = await fetch(fileSoal);

        if (!response.ok) {
            throw new Error("File soal tidak ditemukan");
        }

        soalUjian = await response.json();

        // Acak semua soal menggunakan metode Fisher-Yates
for (let i = soalUjian.length - 1; i > 0; i--) {

    const randomIndex =
        Math.floor(Math.random() * (i + 1));

    [soalUjian[i], soalUjian[randomIndex]] =
        [soalUjian[randomIndex], soalUjian[i]];

}

// Tentukan jumlah soal
let jumlahSoal = 0;

if (jenis === "twk") {
    jumlahSoal = 30;
}

if (jenis === "tiu") {
    jumlahSoal = 35;
}

if (jenis === "tkp") {
    jumlahSoal = 45;
}

// Ambil soal sesuai jumlah
if (jenis !== "final") {
    soalUjian = soalUjian.slice(0, jumlahSoal);
}
        nomorSoal = 0;

   jawabanUser = new Array(soalUjian.length).fill(null);

if (jenis === "final") {
    mulaiTimerFinal();
}

tampilkanUjian(jenis);

    } catch (error) {

        console.error(error);

        alert("Soal belum dapat dimuat.");

    }

}


/* ==========================================
   TAMPILKAN UJIAN
   ========================================== */

function tampilkanUjian(jenis) {

    const app = document.getElementById("app");

    const namaUjian = jenis.toUpperCase();

    app.innerHTML = `

        <section class="ujian-page">

            <div class="ujian-header">

                <h1>📝 Ujian ${namaUjian}</h1>

                <p>
                    Soal ${namaUjian} CPNS
                </p>

            </div>


            <div class="ujian-card">

<div class="ujian-info">

    <span id="nomorSoal">
        Soal 1
    </span>

    <span id="jumlahSoal">
        ${soalUjian.length} Soal
    </span>

    ${
        jenis === "final"
        ? `
        <span id="timerFinal" class="timer-final">
            ⏱️ 100:00
        </span>
        `
        : ""
    }

</div>


                <div id="soalContainer">

                </div>


                <div class="ujian-navigation">

                    <button
                        id="btnPrev"
                        onclick="soalSebelumnya()"
                    >
                        ← Sebelumnya
                    </button>


                    <button
                        id="btnNext"
                        onclick="soalBerikutnya()"
                    >
                        Selanjutnya →
                    </button>

                </div>

            </div>

        </section>

    `;


    tampilkanSoal();

}


/* ==========================================
   TAMPILKAN SOAL
   ========================================== */

function tampilkanSoal() {

    const soal = soalUjian[nomorSoal];

    const container =
        document.getElementById("soalContainer");


    document.getElementById("nomorSoal").innerText =
        `Soal ${nomorSoal + 1}`;


    let pilihanHTML = "";


    soal.pilihan.forEach((pilihan, index) => {

        const huruf =
            String.fromCharCode(65 + index);


        const checked =
            jawabanUser[nomorSoal] === index
                ? "checked"
                : "";


        /* ==========================================
           PILIHAN GAMBAR
           ========================================== */

        if (
            typeof pilihan === "object" &&
            pilihan.gambar
        ) {

            pilihanHTML += `

                <label class="pilihan-soal pilihan-gambar">

                    <input
                        type="radio"
                        name="jawaban"
                        value="${index}"
                        ${checked}
                        onchange="simpanJawaban(${index})"
                    >

                    <span class="huruf-pilihan">
                        ${huruf}
                    </span>

                    <img
                        src="${pilihan.gambar}"
                        alt="Pilihan ${huruf}"
                        class="gambar-pilihan"
                    >

                </label>

            `;

        }


        /* ==========================================
           PILIHAN TEKS
           ========================================== */

        else {

            pilihanHTML += `

                <label class="pilihan-soal">

                    <input
                        type="radio"
                        name="jawaban"
                        value="${index}"
                        ${checked}
                        onchange="simpanJawaban(${index})"
                    >

                    <span>
                        ${huruf}. ${pilihan}
                    </span>

                </label>

            `;

        }

    });


    /* ==========================================
       GAMBAR PERTANYAAN
       ========================================== */

    let gambarHTML = "";


    if (soal.gambar) {

        gambarHTML = `

            <div class="gambar-soal-wrapper">

                <img
                    src="${soal.gambar}"
                    alt="Gambar soal"
                    class="gambar-soal"
                >

            </div>

        `;

    }


    container.innerHTML = `

        <div class="soal">

            <h2>
                ${soal.pertanyaan}
            </h2>


            ${gambarHTML}


            <div class="pilihan-container">

                ${pilihanHTML}

            </div>

        </div>

    `;


    updateTombol();

}


/* ==========================================
   SIMPAN JAWABAN
   ========================================== */

function simpanJawaban(index) {

    if (
        jenisUjianAktif === "final" &&
        !timerFinal
    ) {

        return;

    }

    jawabanUser[nomorSoal] = index;

}


/* ==========================================
   SOAL BERIKUTNYA
   ========================================== */

function soalBerikutnya() {

    if (nomorSoal < soalUjian.length - 1) {

        nomorSoal++;

        tampilkanSoal();

    } else {

        selesaiUjian();

    }

}


/* ==========================================
   SOAL SEBELUMNYA
   ========================================== */

function soalSebelumnya() {

    if (nomorSoal > 0) {

        nomorSoal--;

        tampilkanSoal();

    }

}


/* ==========================================
   UPDATE TOMBOL
   ========================================== */

function updateTombol() {

    const btnPrev =
        document.getElementById("btnPrev");

    const btnNext =
        document.getElementById("btnNext");


    if (nomorSoal === 0) {

        btnPrev.style.display = "none";

    } else {

        btnPrev.style.display = "block";

    }


    if (nomorSoal === soalUjian.length - 1) {

        btnNext.innerText = "Selesai ✓";

    } else {

        btnNext.innerText = "Selanjutnya →";

    }

}


/* ==========================================
   SELESAI UJIAN
   ========================================== */

function selesaiUjian() {
   if (jenisUjianAktif === "final") {

    if (timerFinal) {

        clearInterval(timerFinal);

        timerFinal = null;

    }

    localStorage.removeItem("final_waktu_mulai");

}

    const belumDijawab =
        jawabanUser.filter(
            jawaban => jawaban === null
        ).length;


    if (belumDijawab > 0) {

        const lanjut = confirm(
            `Masih ada ${belumDijawab} soal yang belum dijawab.\n\n` +
            `Soal yang belum dijawab akan dianggap salah.\n\n` +
            `Yakin ingin menyelesaikan ujian?`
        );


        if (!lanjut) {

            return;

        }

    }


    // Tandai ujian selesai
    tandaiUjianSelesai(jenisUjianAktif);


    // Hitung nilai
    hitungNilai();

}


/* ==========================================
   HITUNG NILAI
   ========================================== */

function hitungNilai() {

    let benar = 0;


    soalUjian.forEach((soal, index) => {

        if (
            jawabanUser[index] === soal.jawaban
        ) {

            benar++;

        }

    });


    const total =
        soalUjian.length;


    const nilai =
        Math.round((benar / total) * 100);


    tampilkanHasil(
        benar,
        total,
        nilai
    );

}


/* ==========================================
   HASIL UJIAN
   ========================================== */

function tampilkanHasil(
    benar,
    total,
    nilai
) {

    const app =
        document.getElementById("app");


    app.innerHTML = `

        <section class="hasil-ujian">

            <div class="hasil-card">

                <div class="hasil-icon">
                    🎉
                </div>

                <h1>
                    Ujian Selesai!
                </h1>

                <p>
                    Kamu telah menyelesaikan
                    seluruh soal.
                </p>


                <div class="nilai">

                    <strong>
                        ${nilai}
                    </strong>

                    <span>
                        Nilai
                    </span>

                </div>


                <div class="hasil-detail">

                    <div>
                        <strong>
                            ${benar}
                        </strong>

                        <span>
                            Benar
                        </span>
                    </div>


                    <div>
                        <strong>
                            ${total - benar}
                        </strong>

                        <span>
                            Salah
                        </span>
                    </div>


                    <div>
                        <strong>
                            ${total}
                        </strong>

                        <span>
                            Total
                        </span>
                    </div>

                </div>


                <div class="hasil-actions">

    <button
        class="btn-primary"
        onclick="cobaLagiUjian()"
    >
        🔄 Coba Lagi
    </button>


    <button
        class="btn-secondary"
        onclick="location.hash='soal'; location.reload();"
    >
        ← Kembali ke Website
    </button>

</div>

            </div>

        </section>

    `;

}

/* ==========================================
   STATUS UJIAN CPNS
   ========================================== */

function tandaiUjianSelesai(jenisUjian) {

    localStorage.setItem(
        `ujian_${jenisUjian}_selesai`,
        "true"
    );

    updateFinalButton();

}


/* ==========================================
   CEK STATUS UJIAN
   ========================================== */

function cekUjianSelesai(jenisUjian) {

    return localStorage.getItem(
        `ujian_${jenisUjian}_selesai`
    ) === "true";

}


/* ==========================================
   UPDATE TOMBOL FINAL
   ========================================== */

function updateFinalButton() {

    const finalButton =
        document.getElementById("finalExamButton");

    if (!finalButton) return;


    const twkSelesai =
        cekUjianSelesai("twk");

    const tiuSelesai =
        cekUjianSelesai("tiu");

    const tkpSelesai =
        cekUjianSelesai("tkp");


    if (
        twkSelesai &&
        tiuSelesai &&
        tkpSelesai
    ) {

        finalButton.disabled = false;

        finalButton.classList.remove("locked");

        finalButton.classList.add("unlocked");

        finalButton.innerHTML = `

            <div class="exam-menu-icon">
                🏆
            </div>

            <div class="exam-menu-info">

                <h3>FINAL CPNS</h3>

                <p>
                    Gabungan TWK, TIU & TKP
                </p>

                <span>
                    🔓 Siap dikerjakan
                </span>

            </div>

            <div class="exam-menu-arrow">
                →
            </div>

        `;

        finalButton.onclick = function(){

            mulaiUjian("final");

        };

    }

}

/* ==========================================
   CEK STATUS SAAT WEBSITE DIBUKA
   ========================================== */

document.addEventListener("DOMContentLoaded", function() {

    updateFinalButton();

});

/* ==========================================
   TIMER FINAL CPNS
   ========================================== */

function mulaiTimerFinal() {

    // Hentikan timer sebelumnya jika ada
    if (timerFinal) {
        clearInterval(timerFinal);
    }

    const sekarang = Date.now();

    // Ambil waktu mulai yang tersimpan
    const waktuTersimpan =
        localStorage.getItem("final_waktu_mulai");

    if (waktuTersimpan) {

        waktuMulaiFinal =
            parseInt(waktuTersimpan);

    } else {

        waktuMulaiFinal = sekarang;

        localStorage.setItem(
            "final_waktu_mulai",
            waktuMulaiFinal
        );

    }


    timerFinal = setInterval(() => {

        const sekarangSekarang = Date.now();

        const waktuBerjalan =
            Math.floor(
                (sekarangSekarang - waktuMulaiFinal) / 1000
            );

        const sisaWaktu =
            (100 * 60) - waktuBerjalan;


        if (sisaWaktu <= 0) {

            clearInterval(timerFinal);

            timerFinal = null;

            waktuFinalHabis();

            return;

        }


        tampilkanWaktuFinal(sisaWaktu);

    }, 1000);


    // Tampilkan waktu langsung
    const waktuBerjalan =
        Math.floor(
            (sekarang - waktuMulaiFinal) / 1000
        );

    const sisaWaktu =
        (100 * 60) - waktuBerjalan;


    if (sisaWaktu <= 0) {

        waktuFinalHabis();

    } else {

        tampilkanWaktuFinal(sisaWaktu);

    }

}


/* ==========================================
   TAMPILKAN WAKTU
   ========================================== */

function tampilkanWaktuFinal(totalDetik) {

    const timer =
        document.getElementById("timerFinal");

    if (!timer) return;


    const menit =
        Math.floor(totalDetik / 60);

    const detik =
        totalDetik % 60;


    timer.innerText =
        `⏱️ ${String(menit).padStart(2, "0")}:${String(detik).padStart(2, "0")}`;


    // Peringatan ketika waktu hampir habis
    if (totalDetik <= 300) {

        timer.classList.add("timer-warning");

    }

}


/* ==========================================
   WAKTU FINAL HABIS
   ========================================== */

function waktuFinalHabis() {

    // Pastikan timer berhenti
    if (timerFinal) {

        clearInterval(timerFinal);

        timerFinal = null;

    }


    alert(
        "⏰ Waktu ujian telah habis!\n\n" +
        "Jawaban akan dikumpulkan secara otomatis."
    );


    // Tandai Final selesai
    tandaiUjianSelesai("final");


    // Hitung nilai otomatis
    hitungNilai();

}

/* ==========================================
   COBA LAGI UJIAN
   ========================================== */

function cobaLagiUjian() {

    // Jika mengulang Final,
    // hapus waktu timer sebelumnya
    if (jenisUjianAktif === "final") {

        localStorage.removeItem(
            "final_waktu_mulai"
        );

        if (timerFinal) {

            clearInterval(timerFinal);

            timerFinal = null;

        }

    }


    // Mulai ulang ujian
    mulaiUjian(jenisUjianAktif);

}
