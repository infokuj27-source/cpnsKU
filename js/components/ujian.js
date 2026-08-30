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

function acakSoal(daftarSoal, jumlah) {
    const soalAcak = [...daftarSoal];

    for (let i = soalAcak.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [soalAcak[i], soalAcak[j]] = [
            soalAcak[j],
            soalAcak[i]
        ];
    }

    return soalAcak.slice(0, jumlah);
}

async function mulaiUjian(jenis) {

    jenisUjianAktif = jenis;

    try {

        /* ==========================================
           FINAL CPNS
           AMBIL SOAL DARI TWK, TIU DAN TKP
           ========================================== */

        if (jenis === "final") {

            const [
                responseTWK,
                responseTIU,
                responseTKP
            ] = await Promise.all([

                fetch("data/soal/twk.json"),
                fetch("data/soal/tiu.json"),
                fetch("data/soal/tkp.json")

            ]);


            if (
                !responseTWK.ok ||
                !responseTIU.ok ||
                !responseTKP.ok
            ) {

                throw new Error(
                    "Salah satu file soal tidak ditemukan"
                );

            }


            const dataTWK =
                await responseTWK.json();

            const dataTIU =
                await responseTIU.json();

            const dataTKP =
                await responseTKP.json();


            /* ==========================================
               AMBIL SOAL ACAK
               ========================================== */

            const soalTWK =
                acakSoal(dataTWK, 35);

            const soalTIU =
                acakSoal(dataTIU, 30);

            const soalTKP =
                acakSoal(dataTKP, 45);


            /* ==========================================
               GABUNGKAN SOAL
               ========================================== */

            soalUjian = [

                ...soalTWK,
                ...soalTIU,
                ...soalTKP

            ];


            nomorSoal = 0;

            jawabanUser = new Array(
                soalUjian.length
            ).fill(null);


            tampilkanUjian(jenis);

            return;

        }


        /* ==========================================
           UJIAN TWK, TIU DAN TKP
           ========================================== */

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


        const response =
            await fetch(fileSoal);


        if (!response.ok) {

            throw new Error(
                "File soal tidak ditemukan"
            );

        }


       const dataSoal =
    await response.json();


/* ==========================================
   ACAK DAN AMBIL JUMLAH SOAL
   ========================================== */

let jumlahSoalUjian;


if (jenis === "twk") {

    jumlahSoalUjian = 35;

}

else if (jenis === "tiu") {

    jumlahSoalUjian = 30;

}

else if (jenis === "tkp") {

    jumlahSoalUjian = 45;

}


/* Acak soal tanpa duplikat */

soalUjian = acakSoal(
    dataSoal,
    jumlahSoalUjian
);


        nomorSoal = 0;


        jawabanUser = new Array(
            soalUjian.length
        ).fill(null);


        tampilkanUjian(jenis);


    } catch (error) {

        console.error(error);

        alert(
            "Soal belum dapat dimuat."
        );

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
            <button
                class="btn-navigasi-soal"
                onclick="bukaNavigasiSoal()"
            >
                📋 Pilih Nomor Soal
            </button>
            `
            : ""
     }
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

        ${
    jenis === "final"
    ? `
    <div
        id="navigasiSoal"
        class="navigasi-soal hidden"
    >

        <div class="navigasi-header">

            <h3>📋 Pilih Nomor Soal</h3>

            <button
                onclick="tutupNavigasiSoal()"
            >
                ✕
            </button>

        </div>


        <div
            id="daftarNomorSoal"
            class="daftar-nomor-soal"
        >
        </div>

    </div>
    `
    : ""
}
    `;

     /* ==========================================
       KHUSUS UJIAN FINAL
       ========================================== */
    if (jenis === "final") {

    buatNavigasiSoal();
    mulaiTimerFinal();

}

 /* ==========================================
       TAMPILKAN SOAL
       ========================================== */

    tampilkanSoal();

    /* ==========================================
    ini bagian penutup fungsi tampilkanUjian()
   ========================================== */
}

/* ==========================================
   TIMER UJIAN FINAL
   ========================================== */


function mulaiTimerFinal() {

    const timerElement =
        document.getElementById(
            "timerFinal"
        );


    if (!timerElement) {

        return;

    }


    /* Hentikan timer lama */

    if (timerFinal !== null) {

        clearInterval(timerFinal);

    }


    timerFinal = setInterval(function () {

        waktuFinal--;


        const menit =
            Math.floor(waktuFinal / 60);


        const detik =
            waktuFinal % 60;


        timerElement.textContent =
            "⏱️ " +
            String(menit).padStart(2, "0") +
            ":" +
            String(detik).padStart(2, "0");


        /* Jika waktu habis */

        if (waktuFinal <= 0) {

            clearInterval(timerFinal);

            timerFinal = null;

            alert(
                "Waktu ujian telah habis!"
            );

        }

    }, 1000);

}



/* ==========================================
   BUAT NAVIGASI NOMOR SOAL FINAL
   ========================================== */

function buatNavigasiSoal() {

    const container =
        document.getElementById(
            "daftarNomorSoal"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    soalUjian.forEach((soal, index) => {

        const nomor = index + 1;


        let kategori = "";


        if (nomor <= 35) {

            kategori = "TWK";

        }

        else if (nomor <= 65) {

            kategori = "TIU";

        }

        else {

            kategori = "TKP";

        }


        const tombol =
            document.createElement("button");


        tombol.className =
            "nomor-soal-btn";


        tombol.textContent =
            nomor;


        tombol.title =
            `Soal ${nomor} - ${kategori}`;


        if (jawabanUser[index] !== null) {

            tombol.classList.add(
                "sudah-dijawab"
            );

        }


        tombol.onclick = function() {

            nomorSoal = index;


            tampilkanSoal();

            tutupNavigasiSoal();

        };


        container.appendChild(
            tombol
        );

    });

}

/* ==========================================
   BUKA NAVIGASI SOAL
   ========================================== */

function bukaNavigasiSoal() {

    const navigasi =
        document.getElementById(
            "navigasiSoal"
        );


    if (navigasi) {

        navigasi.classList.remove(
            "hidden"
        );

    }

}

/* ==========================================
   TUTUP NAVIGASI SOAL
   ========================================== */

function tutupNavigasiSoal() {

    const navigasi =
        document.getElementById(
            "navigasiSoal"
        );


    if (navigasi) {

        navigasi.classList.add(
            "hidden"
        );

    }

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


    /* ==========================================
       HENTIKAN TIMER FINAL
       ========================================== */

    if (jenisUjianAktif === "final") {

        if (timerFinal) {

            clearInterval(timerFinal);

            timerFinal = null;

        }

        localStorage.removeItem(
            "final_waktu_mulai"
        );

    }


    // Tandai ujian selesai
    tandaiUjianSelesai(
        jenisUjianAktif
    );


    // Hitung nilai
    hitungNilai();

}

/* ==========================================
   HITUNG NILAI
   ========================================== */

    function hitungNilai() {

    let benar = 0;

    let salah = 0;

    let tidakDijawab = 0;


    soalUjian.forEach(
        (soal, index) => {

            if (
                jawabanUser[index] === null
            ) {

                tidakDijawab++;

            }

            else if (
                jawabanUser[index] === soal.jawaban
            ) {

                benar++;

            }

            else {

                salah++;

            }

        }
    );


    const total =
        soalUjian.length;


    const nilai =
        Math.round(
            (benar / total) * 100
        );


    tampilkanHasil(
        benar,
        salah,
        tidakDijawab,
        total,
        nilai
    );

}


/* ==========================================
   HASIL UJIAN
   ========================================== */

    function tampilkanHasil(
    benar,
    salah,
    tidakDijawab,
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
                    Berikut hasil pengerjaan kamu.
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


                    <div class="hasil-benar">

                        <strong>
                            ${benar}
                        </strong>

                        <span>
                            Benar
                        </span>

                    </div>


                    <div class="hasil-salah">

                        <strong>
                            ${salah}
                        </strong>

                        <span>
                            Salah
                        </span>

                    </div>


                    <div class="hasil-kosong">

                        <strong>
                            ${tidakDijawab}
                        </strong>

                        <span>
                            Tidak Dijawab
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
                        onclick="tampilkanPembahasan('semua')"
                    >
                        📋 Lihat Hasil Soal
                    </button>


                    <button
                        class="btn-primary"
                        onclick="cobaLagiUjian()"
                    >
                        🔄 Coba Lagi
                    </button>


                    <button
                        class="btn-secondary"
                        onclick="
                            location.hash='soal';
                            location.reload();
                        "
                    >
                        ← Kembali ke Website
                    </button>


                </div>

            </div>

        </section>

    `;

}

/* tampilkan pembahasan soal salah dan benar */

    function tampilkanPembahasan(
    filter = "semua"
) {

    const app =
        document.getElementById("app");


    let daftarSoalHTML = "";


    soalUjian.forEach(
        (soal, index) => {

            const jawabanUserSoal =
                jawabanUser[index];


            const jawabanBenar =
                soal.jawaban;


            let status = "";


            /* ==========================================
               STATUS SOAL
               ========================================== */

            if (
                jawabanUserSoal === null
            ) {

                status = "kosong";

            }

            else if (
                jawabanUserSoal === jawabanBenar
            ) {

                status = "benar";

            }

            else {

                status = "salah";

            }


            /* ==========================================
               FILTER
               ========================================== */

            if (
                filter !== "semua" &&
                status !== filter
            ) {

                return;

            }


            /* ==========================================
               TENTUKAN ICON
               ========================================== */

            let iconStatus = "";

            let teksStatus = "";


            if (
                status === "benar"
            ) {

                iconStatus = "🟢";

                teksStatus =
                    "Jawaban Benar";

            }


            else if (
                status === "salah"
            ) {

                iconStatus = "🔴";

                teksStatus =
                    "Jawaban Salah";

            }


            else {

                iconStatus = "⚪";

                teksStatus =
                    "Tidak Dijawab";

            }


            /* ==========================================
               BUAT PILIHAN JAWABAN
               ========================================== */

            let pilihanHTML = "";


            if (soal.pilihan) {

                Object.entries(
                    soal.pilihan
                ).forEach(
                    ([huruf, teks]) => {

                        let classPilihan =
                            "review-pilihan";


                        if (
                            huruf === jawabanBenar
                        ) {

                            classPilihan +=
                                " jawaban-benar";

                        }


                        if (
                            huruf ===
                            jawabanUserSoal
                        ) {

                            classPilihan +=
                                " jawaban-user";

                        }


                        pilihanHTML += `

                            <div
                                class="${classPilihan}"
                            >

                                <strong>
                                    ${huruf}.
                                </strong>

                                ${teks}

                            </div>

                        `;

                    }
                );

            }


            /* ==========================================
               TAMPILKAN SOAL
               ========================================== */

            daftarSoalHTML += `

                <div
                    class="
                        review-soal
                        review-${status}
                    "
                >


                    <div
                        class="review-header"
                    >

                        <strong>
                            Soal ${index + 1}
                        </strong>


                        <span
                            class="
                                status-review
                                status-${status}
                            "
                        >

                            ${iconStatus}
                            ${teksStatus}

                        </span>

                    </div>


                    <div
                        class="review-pertanyaan"
                    >

                        ${
                            soal.soal ||
                            soal.pertanyaan ||
                            ""
                        }

                    </div>


                    <div
                        class="review-pilihan-list"
                    >

                        ${pilihanHTML}

                    </div>


                    <div
                        class="review-jawaban"
                    >

                        <p>

                            <strong>
                                Jawaban Anda:
                            </strong>

                            ${
                                jawabanUserSoal
                                ? jawabanUserSoal
                                : "Tidak dijawab"
                            }

                        </p>


                        <p
                            class="
                                jawaban-benar-text
                            "
                        >

                            <strong>
                                Jawaban Benar:
                            </strong>

                            ${jawabanBenar}

                        </p>

                    </div>


                    ${
                        soal.pembahasan
                        ? `

                        <div
                            class="
                                review-pembahasan
                            "
                        >

                            <strong>
                                💡 Pembahasan
                            </strong>

                            <p>
                                ${soal.pembahasan}
                            </p>

                        </div>

                        `
                        : ""
                    }


                </div>

            `;

        }
    );


    app.innerHTML = `

        <section class="review-page">


            <div
                class="review-container"
            >


                <div
                    class="review-title"
                >

                    <h1>
                        📝 Review Hasil Ujian
                    </h1>


                    <p>
                        Lihat kembali jawaban
                        yang telah kamu kerjakan.
                    </p>

                </div>


                <!-- FILTER -->


                <div
                    class="filter-review"
                >


                    <button
                        onclick="
                            tampilkanPembahasan(
                                'semua'
                            )
                        "
                    >
                        Semua
                    </button>


                    <button
                        onclick="
                            tampilkanPembahasan(
                                'benar'
                            )
                        "
                    >
                        🟢 Benar
                    </button>


                    <button
                        onclick="
                            tampilkanPembahasan(
                                'salah'
                            )
                        "
                    >
                        🔴 Salah
                    </button>


                    <button
                        onclick="
                            tampilkanPembahasan(
                                'kosong'
                            )
                        "
                    >
                        ⚪ Tidak Dijawab
                    </button>


                </div>


                <!-- DAFTAR SOAL -->


                <div
                    class="daftar-review"
                >

                    ${daftarSoalHTML}

                </div>


                <!-- TOMBOL -->


                <div
                    class="review-actions"
                >


                    <button
                        class="btn-primary"
                        onclick="
                            hitungNilai()
                        "
                    >
                        ← Kembali ke Hasil
                    </button>


                    <button
                        class="btn-secondary"
                        onclick="
                            location.hash='soal';
                            location.reload();
                        "
                    >
                        Kembali ke Website
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
