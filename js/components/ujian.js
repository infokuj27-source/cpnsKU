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
   LIHAT HASIL JAWABAN
========================================== */

function lihatHasilJawaban() {

    const app =
        document.getElementById("app");


    let daftarSoal = "";


    soalUjian.forEach(
        (soal, index) => {

            const jawabanUserSekarang =
                jawabanUser[index];


            /* ==========================================
               TENTUKAN JENIS SOAL
            ========================================== */

            let jenisSoal =
                soal.jenis;


            if (!jenisSoal) {

                jenisSoal =
                    jenisUjianAktif;

            }


            /* ==========================================
               HURUF JAWABAN USER
            ========================================== */

            const hurufJawabanUser =
                jawabanUserSekarang !== null &&
                jawabanUserSekarang !== undefined

                    ? String.fromCharCode(
                        65 +
                        jawabanUserSekarang
                    )

                    : "Tidak dijawab";


            let status = "";

            let statusText = "";

            let jawabanBenar = "";

            let nilaiTKP = null;


            /* ==========================================
               TWK DAN TIU
            ========================================== */

            if (
                jenisSoal === "twk" ||
                jenisSoal === "tiu"
            ) {

                /*
                   JSON jawaban bisa berupa
                   huruf atau index.
                */

                let jawabanBenarIndex;


                if (
                    typeof soal.jawaban ===
                    "number"
                ) {

                    jawabanBenarIndex =
                        soal.jawaban;

                }

                else {

                    jawabanBenarIndex =
                        soal.jawaban
                        .charCodeAt(0) - 65;

                }


                jawabanBenar =
                    String.fromCharCode(
                        65 +
                        jawabanBenarIndex
                    );


                if (
                    jawabanUserSekarang ===
                    jawabanBenarIndex
                ) {

                    status = "benar";

                    statusText =
                        "✓ BENAR";

                }

                else {

                    status = "salah";

                    statusText =
                        "✕ SALAH";

                }

            }


            /* ==========================================
               TKP
            ========================================== */

            else if (
                jenisSoal === "tkp"
            ) {

                if (
                    jawabanUserSekarang === null ||
                    jawabanUserSekarang === undefined
                ) {

                    status =
                        "kosong";

                    statusText =
                        "⚪ TIDAK DIJAWAB";

                }

                else {

                    const pilihanDipilih =
                        soal.pilihan[
                            jawabanUserSekarang
                        ];


                    /*
                       Ambil nilai TKP
                    */

                    if (
                        typeof pilihanDipilih ===
                        "object"
                    ) {

                        nilaiTKP =
                            pilihanDipilih.nilai;

                    }


                    status =
                        `nilai-${nilaiTKP}`;


                    statusText =
                        `NILAI ${nilaiTKP}`;

                }

            }


            /* ==========================================
               JIKA TWK / TIU KOSONG
            ========================================== */

            if (
                jawabanUserSekarang === null &&
                jenisSoal !== "tkp"
            ) {

                status =
                    "kosong";

                statusText =
                    "⚪ TIDAK DIJAWAB";

            }


            /* ==========================================
               BUAT PILIHAN JAWABAN
            ========================================== */

            let pilihanHTML = "";


            soal.pilihan.forEach(
                (pilihan, pilihanIndex) => {

                    const huruf =
                        String.fromCharCode(
                            65 +
                            pilihanIndex
                        );


                    let pilihanClass =
                        "review-pilihan";


                    /*
                       Tandai jawaban user
                    */

                    if (
                        pilihanIndex ===
                        jawabanUserSekarang
                    ) {

                        pilihanClass +=
                            " jawaban-user";

                    }


                    /*
                       Tandai jawaban benar
                       TWK dan TIU
                    */

                    if (
                        (
                            jenisSoal === "twk" ||
                            jenisSoal === "tiu"
                        ) &&
                        huruf === jawabanBenar
                    ) {

                        pilihanClass +=
                            " jawaban-benar";

                    }


                    /*
                       Jika jawaban user salah
                    */

                    if (
                        (
                            jenisSoal === "twk" ||
                            jenisSoal === "tiu"
                        ) &&
                        pilihanIndex ===
                        jawabanUserSekarang &&
                        huruf !== jawabanBenar
                    ) {

                        pilihanClass +=
                            " jawaban-salah";

                    }


                    /*
                       Ambil teks pilihan
                    */

                    let teksPilihan = "";


                    if (
                        typeof pilihan ===
                        "object"
                    ) {

                        teksPilihan =
                            pilihan.teks ||
                            pilihan.text ||
                            pilihan.jawaban ||
                            "";

                    }

                    else {

                        teksPilihan =
                            pilihan;

                    }


                    pilihanHTML += `

                        <div
                            class="${pilihanClass}"
                        >

                            <strong>

                                ${huruf}.

                            </strong>

                            ${teksPilihan}

                            ${
                                pilihanIndex ===
                                jawabanUserSekarang

                                ? `
                                    <span
                                        class="label-jawaban-user"
                                    >
                                        Jawaban Kamu
                                    </span>
                                `

                                : ""
                            }

                        </div>

                    `;

                }
            );


            /* ==========================================
               TAMPILAN SOAL
            ========================================== */

            daftarSoal += `

                <div
                    class="review-soal
                    ${status}"
                >


                    <div
                        class="review-header"
                    >

                        <h3>

                            Soal ${index + 1}

                        </h3>


                        <span
                            class="review-status
                            ${status}"
                        >

                            ${statusText}

                        </span>

                    </div>


                    <div
                        class="review-pertanyaan"
                    >

                        ${soal.pertanyaan}

                    </div>


                    <div
                        class="review-pilihan-container"
                    >

                        ${pilihanHTML}

                    </div>


                    ${
                        jenisSoal === "twk" ||
                        jenisSoal === "tiu"

                        ? `

                        <div
                            class="review-kunci"
                        >

                            🔑 Jawaban Benar:
                            <strong>
                                ${jawabanBenar}
                            </strong>

                        </div>

                        `

                        : ""
                    }


                    ${
                        jenisSoal === "tkp" &&
                        nilaiTKP !== null

                        ? `

                        <div
                            class="review-nilai-tkp"
                        >

                            Nilai jawaban kamu:
                            <strong>

                                ${nilaiTKP}

                            </strong>

                        </div>

                        `

                        : ""
                    }

                </div>

            `;

        }
    );


    /* ==========================================
       TAMPILKAN HALAMAN REVIEW
    ========================================== */

    app.innerHTML = `

        <section
            class="review-page"
        >

            <div
                class="review-container"
            >


                <div
                    class="review-title"
                >

                    <h1>

                        🔍 Cek Jawaban

                    </h1>


                    <p>

                        Lihat kembali jawaban
                        yang telah kamu kerjakan.

                    </p>

                </div>


                ${daftarSoal}


                <div
                    class="review-actions"
                >

                    <button
                        class="btn-secondary"
                        onclick="hitungNilai()"
                    >

                        ← Kembali ke Hasil

                    </button>

                </div>


            </div>

        </section>

    `;

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

    /* ==========================================
       DATA NILAI TWK
    ========================================== */

    let twk = {

        benar: 0,

        salah: 0,

        kosong: 0,

        poin: 0,

        maksimal: 175

    };


    /* ==========================================
       DATA NILAI TIU
    ========================================== */

    let tiu = {

        benar: 0,

        salah: 0,

        kosong: 0,

        poin: 0,

        maksimal: 150

    };


    /* ==========================================
       DATA NILAI TKP
    ========================================== */

    let tkp = {

        nilai5: 0,

        nilai4: 0,

        nilai3: 0,

        nilai2: 0,

        nilai1: 0,

        kosong: 0,

        poin: 0,

        maksimal: 225

    };


    /* ==========================================
       PERIKSA SEMUA SOAL
    ========================================== */

    soalUjian.forEach(
        (soal, index) => {

            const jawaban =
                jawabanUser[index];


            /* ==========================================
               TENTUKAN JENIS SOAL
            ========================================== */

            let jenisSoal =
                soal.jenis;


            /*
               Untuk ujian biasa,
               jenis soal mengikuti ujian aktif
            */

            if (
                !jenisSoal
            ) {

                jenisSoal =
                    jenisUjianAktif;

            }


            /* ==========================================
               JIKA TIDAK DIJAWAB
            ========================================== */

            if (
                jawaban === null
            ) {

                if (
                    jenisSoal === "twk"
                ) {

                    twk.kosong++;

                }

                else if (
                    jenisSoal === "tiu"
                ) {

                    tiu.kosong++;

                }

                else if (
                    jenisSoal === "tkp"
                ) {

                    tkp.kosong++;

                }

                return;

            }


            /* ==========================================
               PENILAIAN TWK
            ========================================== */

            if (
                jenisSoal === "twk"
            ) {

                if (
                    jawaban ===
                    soal.jawaban
                ) {

                    twk.benar++;

                    twk.poin += 5;

                }

                else {

                    twk.salah++;

                }

            }


            /* ==========================================
               PENILAIAN TIU
            ========================================== */

            else if (
                jenisSoal === "tiu"
            ) {

                if (
                    jawaban ===
                    soal.jawaban
                ) {

                    tiu.benar++;

                    tiu.poin += 5;

                }

                else {

                    tiu.salah++;

                }

            }


            /* ==========================================
               PENILAIAN TKP
            ========================================== */

            else if (
                jenisSoal === "tkp"
            ) {

                const nilaiPilihan =
                    soal.pilihan[
                        jawaban
                    ]?.nilai;


                /*
                   Tambahkan poin TKP
                */

                if (
                    nilaiPilihan !==
                    undefined
                ) {

                    tkp.poin +=
                        nilaiPilihan;


                    /*
                       Hitung jumlah
                       jawaban berdasarkan nilai
                    */

                    if (
                        nilaiPilihan === 5
                    ) {

                        tkp.nilai5++;

                    }

                    else if (
                        nilaiPilihan === 4
                    ) {

                        tkp.nilai4++;

                    }

                    else if (
                        nilaiPilihan === 3
                    ) {

                        tkp.nilai3++;

                    }

                    else if (
                        nilaiPilihan === 2
                    ) {

                        tkp.nilai2++;

                    }

                    else if (
                        nilaiPilihan === 1
                    ) {

                        tkp.nilai1++;

                    }

                }

            }

        }
    );


    /* ==========================================
       TOTAL NILAI
    ========================================== */

    const totalPoin =

        twk.poin +

        tiu.poin +

        tkp.poin;


    const totalMaksimal =

        twk.maksimal +

        tiu.maksimal +

        tkp.maksimal;


    /* ==========================================
       KIRIM KE HALAMAN HASIL
    ========================================== */

tampilkanHasil(

    twk,

    tiu,

    tkp,

    totalPoin,

    totalMaksimal,

    jenisUjianAktif

);

/* penutup tampilkanHasil() */
}


/* ==========================================
   HASIL UJIAN
   ========================================== */

    function tampilkanHasil(

    twk,

    tiu,

    tkp,

    totalPoin,

    totalMaksimal,

    jenisUjian

) {

    const app =
        document.getElementById(
            "app"
        );


    const nilaiPersen =
        Math.round(
            (
                totalPoin /
                totalMaksimal
            ) * 100
        );


    app.innerHTML = `

        <section class="hasil-ujian">

            <div class="hasil-card">


                <!-- HEADER -->

                <div class="hasil-icon">

                    🎉

                </div>


                <h1>

                    Ujian Selesai!

                </h1>


                <p>

                    Berikut hasil ujian kamu.

                </p>


                <!-- NILAI TOTAL -->

                <div class="nilai">

                    <strong>

                        ${nilaiPersen}

                    </strong>

                    <span>

                        Nilai Akhir

                    </span>

                </div>


                <!-- TOTAL POIN -->

                <div class="total-poin">

                    🏆 ${totalPoin} / ${totalMaksimal} Poin

                </div>


                <!-- TWK -->
                
                    ${
    jenisUjian === "twk" ||
    jenisUjian === "final"

    ? `

    <div class="hasil-kategori">

        <h3>
            🏛️ TWK
        </h3>


        <div class="kategori-nilai">

            <strong>
                ${twk.poin} / ${twk.maksimal}
            </strong>

            <span>
                Poin
            </span>

        </div>


        <div class="kategori-detail">

            <span>
                ✅ ${twk.benar} Benar
            </span>

            <span>
                ❌ ${twk.salah} Salah
            </span>

            <span>
                ⚪ ${twk.kosong} Kosong
            </span>

        </div>

    </div>

    `

    : ""
}


                <!-- TIU -->

                ${
    jenisUjian === "tiu" ||
    jenisUjian === "final"

    ? `

    <div class="hasil-kategori">

        <h3>
            🧠 TIU
        </h3>


        <div class="kategori-nilai">

            <strong>
                ${tiu.poin} / ${tiu.maksimal}
            </strong>

            <span>
                Poin
            </span>

        </div>


        <div class="kategori-detail">

            <span>
                ✅ ${tiu.benar} Benar
            </span>

            <span>
                ❌ ${tiu.salah} Salah
            </span>

            <span>
                ⚪ ${tiu.kosong} Kosong
            </span>

        </div>

    </div>

    `

    : ""
}


                <!-- TKP -->

                ${
    jenisUjian === "tkp" ||
    jenisUjian === "final"

    ? `

    <div class="hasil-kategori">

        <h3>
            🧠 TKP
        </h3>


        <div class="kategori-nilai">

            <strong>
                ${tkp.poin} / ${tkp.maksimal}
            </strong>

            <span>
                Poin
            </span>

        </div>


        <div class="kategori-detail">

            <span>
                🟢 Nilai 5: ${tkp.nilai5}
            </span>

            <span>
                🔵 Nilai 4: ${tkp.nilai4}
            </span>

            <span>
                🟡 Nilai 3: ${tkp.nilai3}
            </span>

            <span>
                🟠 Nilai 2: ${tkp.nilai2}
            </span>

            <span>
                🔴 Nilai 1: ${tkp.nilai1}
            </span>

            <span>
                ⚪ Kosong: ${tkp.kosong}
            </span>

        </div>

    </div>

    `

    : ""
}


                <!-- TOMBOL -->

                <div class="hasil-actions">

    <button
        class="btn-review"
        onclick="lihatHasilJawaban()"
    >
        🔍 Cek Jawaban
    </button>

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

/* tampilkan pembahasan soal salah dan benar */



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
