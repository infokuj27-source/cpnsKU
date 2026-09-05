/* ==========================================
   LATIHAN SOAL CPNS HUB
   VERSI BERSIH
   ========================================== */


/* ==========================================
   DATA KATEGORI LATIHAN
   ========================================== */

const latihanKategoriData = {

    twk: {

        icon: "🇮🇩",

        judul: "TWK",

        deskripsi:
            "Tes Wawasan Kebangsaan",

        subbab: {

            pancasila: {

                judul: "TWK Pancasila",

                deskripsi:
                    "Latihan soal mengenai Pancasila",

                icon: "🇮🇩"

            },

            uud: {

                judul: "TWK UUD 1945",

                deskripsi:
                    "Latihan soal mengenai UUD 1945",

                icon: "📜"

            },

            nasionalisme: {

                judul: "TWK Nasionalisme",

                deskripsi:
                    "Latihan soal nasionalisme",

                icon: "🦅"

            }

        }

    },


    tiu: {

        icon: "🧠",

        judul: "TIU",

        deskripsi:
            "Tes Intelegensia Umum",

        subbab: {

            figural: {

                judul: "TIU Figural",

                deskripsi:
                    "Latihan soal figural",

                icon: "🔷"

            },

            angka: {

                judul: "TIU Angka",

                deskripsi:
                    "Latihan soal kemampuan numerik",

                icon: "🔢"

            },

            perbandingan: {

                judul: "TIU Perbandingan",

                deskripsi:
                    "Latihan soal perbandingan",

                icon: "⚖️"

            }

        }

    },


    tkp: {

        icon: "🤝",

        judul: "TKP",

        deskripsi:
            "Tes Karakteristik Pribadi",

        subbab: {

            pelayanan: {

                judul: "TKP Pelayanan Publik",

                deskripsi:
                    "Latihan soal pelayanan publik",

                icon: "🤝"

            },

            integritas: {

                judul: "TKP Integritas",

                deskripsi:
                    "Latihan soal integritas",

                icon: "🛡️"

            },

            profesionalisme: {

                judul: "TKP Profesionalisme",

                deskripsi:
                    "Latihan soal profesionalisme",

                icon: "💼"

            }

        }

    }

};


/* ==========================================
   STATE LATIHAN
   ========================================== */

let latihanSoalData = [];

let latihanSoalIndex = 0;

let latihanJawabanUser = {};

let latihanKategoriAktif = "";

let latihanSubbabAktif = "";



/* ==========================================
   COMPONENT LATIHAN
   ========================================== */

function createLatihan() {

    return `

        <!-- ==================================
             TOMBOL LATIHAN
             ================================== -->

        <button
            id="btnLatihan"
            class="btn-latihan"
            aria-label="Latihan Soal"
        >

            <i class="fa-solid fa-pen-to-square"></i>

        </button>


        <!-- ==================================
             MENU LATIHAN
             ================================== -->

        <div
            id="latihanMenu"
            class="latihan-menu"
        >

            <div class="latihan-box">


                <!-- ==================================
                     HALAMAN KATEGORI
                     ================================== -->

                <div
                    id="latihanKategoriPage"
                    class="latihan-page aktif"
                >

                    <div class="latihan-header">

                        <div>

                            <span class="latihan-icon">
                                📝
                            </span>

                            <h2>
                                Latihan Soal
                            </h2>

                            <p>
                                Pilih jenis latihan yang ingin kamu kerjakan
                            </p>

                        </div>


                        <button
                            id="btnTutupLatihan"
                            class="latihan-close"
                            aria-label="Tutup"
                        >
                            ×
                        </button>

                    </div>


                    <div class="latihan-pilihan">


                        <!-- TWK -->

                        <button
                            class="latihan-kategori latihan-twk"
                            data-kategori="twk"
                        >

                            <span class="kategori-icon">
                                🇮🇩
                            </span>

                            <span>

                                <strong>
                                    TWK
                                </strong>

                                <small>
                                    Tes Wawasan Kebangsaan
                                </small>

                            </span>

                        </button>


                        <!-- TIU -->

                        <button
                            class="latihan-kategori latihan-tiu"
                            data-kategori="tiu"
                        >

                            <span class="kategori-icon">
                                🧠
                            </span>

                            <span>

                                <strong>
                                    TIU
                                </strong>

                                <small>
                                    Tes Intelegensia Umum
                                </small>

                            </span>

                        </button>


                        <!-- TKP -->

                        <button
                            class="latihan-kategori latihan-tkp"
                            data-kategori="tkp"
                        >

                            <span class="kategori-icon">
                                🤝
                            </span>

                            <span>

                                <strong>
                                    TKP
                                </strong>

                                <small>
                                    Tes Karakteristik Pribadi
                                </small>

                            </span>

                        </button>


                    </div>

                </div>



                <!-- ==================================
                     HALAMAN SUBBAB
                     ================================== -->

                <div
                    id="latihanSubbabPage"
                    class="latihan-page"
                >

                    <div class="latihan-header">

                        <div>

                            <button
                                id="btnKembaliLatihan"
                                class="latihan-back"
                            >
                                ← Kembali
                            </button>


                            <span
                                id="latihanSubbabIcon"
                                class="latihan-icon"
                            >
                                📝
                            </span>


                            <h2 id="latihanSubbabJudul">
                                Pilih Materi
                            </h2>


                            <p id="latihanSubbabDeskripsi">
                                Pilih jenis soal yang ingin kamu latihan
                            </p>

                        </div>


                        <button
                            id="btnTutupSubbab"
                            class="latihan-close"
                            aria-label="Tutup"
                        >
                            ×
                        </button>

                    </div>


                    <div
                        id="latihanSubbabList"
                        class="latihan-subbab-list"
                    ></div>

                </div>



                <!-- ==================================
                     HALAMAN SOAL LATIHAN
                     ================================== -->

                <div
                    id="latihanSoalPage"
                    class="latihan-page latihan-soal-page"
                >

                    <div class="latihan-header">

                        <div>

                            <button
                                id="btnKembaliLatihanSoal"
                                class="latihan-back"
                            >
                                ← Kembali
                            </button>


                            <span
                                id="latihanSoalIcon"
                                class="latihan-icon"
                            >
                                📝
                            </span>


                            <h2 id="latihanSoalJudul">
                                Latihan Soal
                            </h2>


                            <p id="latihanSoalInfo">
                                Latihan soal
                            </p>

                        </div>


                        <button
                            id="btnTutupLatihanSoal"
                            class="latihan-close"
                            aria-label="Tutup"
                        >
                            ×
                        </button>

                    </div>



                    <!-- ==================================
                         PROGRESS
                         ================================== -->

                    <div class="latihan-progress">

                        <div class="latihan-progress-info">

                            <span>

                                Soal

                                <strong id="latihanNomorSoal">
                                    1
                                </strong>

                                dari

                                <strong id="latihanJumlahSoal">
                                    0
                                </strong>

                            </span>

                        </div>


                        <div class="latihan-progress-bar">

                            <div
                                id="latihanProgressFill"
                                class="latihan-progress-fill"
                            ></div>

                        </div>

                    </div>



                    <!-- ==================================
                         CONTAINER SOAL
                         ================================== -->

                    <div
                        id="latihanSoalContainer"
                        class="latihan-soal-container"
                    >

                    </div>



                    <!-- ==================================
                         NAVIGASI
                         ================================== -->

                    <div class="latihan-soal-navigasi">

                        <button
                            id="btnLatihanSoalSebelumnya"
                            class="latihan-nav-btn"
                        >
                            ← Sebelumnya
                        </button>


                        <button
                            id="btnLatihanSoalBerikutnya"
                            class="latihan-nav-btn"
                        >
                            Berikutnya →
                        </button>

                    </div>

                </div>


            </div>

        </div>

    `;

}



/* ==========================================
   INIT LATIHAN
   ========================================== */

function initLatihan() {

    console.log(
        "🚀 Init Latihan Soal..."
    );


    const btnLatihan =
        document.getElementById(
            "btnLatihan"
        );


    const latihanMenu =
        document.getElementById(
            "latihanMenu"
        );


    if (
        !btnLatihan ||
        !latihanMenu
    ) {

        console.warn(
            "⚠️ Element latihan belum ditemukan."
        );

        return;

    }



    /* ======================================
       ELEMENT HALAMAN
       ====================================== */

    const kategoriPage =
        document.getElementById(
            "latihanKategoriPage"
        );


    const subbabPage =
        document.getElementById(
            "latihanSubbabPage"
        );


    const soalPage =
        document.getElementById(
            "latihanSoalPage"
        );



    /* ======================================
       TOMBOL
       ====================================== */

    const btnTutupLatihan =
        document.getElementById(
            "btnTutupLatihan"
        );


    const btnTutupSubbab =
        document.getElementById(
            "btnTutupSubbab"
        );


    const btnTutupLatihanSoal =
        document.getElementById(
            "btnTutupLatihanSoal"
        );


    const btnKembaliLatihan =
        document.getElementById(
            "btnKembaliLatihan"
        );


    const btnKembaliLatihanSoal =
        document.getElementById(
            "btnKembaliLatihanSoal"
        );


    const btnSebelumnya =
        document.getElementById(
            "btnLatihanSoalSebelumnya"
        );


    const btnBerikutnya =
        document.getElementById(
            "btnLatihanSoalBerikutnya"
        );



    /* ======================================
       BUKA MENU LATIHAN
       ====================================== */

    btnLatihan.addEventListener(
        "click",
        function () {

            latihanMenu.classList.add(
                "aktif"
            );

            tampilkanHalamanKategori();

        }
    );



    /* ======================================
       TUTUP MENU
       ====================================== */

    function tutupLatihan() {

        latihanMenu.classList.remove(
            "aktif"
        );

    }


    btnTutupLatihan?.addEventListener(
        "click",
        tutupLatihan
    );


    btnTutupSubbab?.addEventListener(
        "click",
        tutupLatihan
    );


    btnTutupLatihanSoal?.addEventListener(
        "click",
        tutupLatihan
    );



    /* ======================================
       KLIK AREA LUAR
       ====================================== */

    latihanMenu.addEventListener(
        "click",
        function (event) {

            if (
                event.target === latihanMenu
            ) {

                tutupLatihan();

            }

        }
    );



    /* ======================================
       HALAMAN KATEGORI
       ====================================== */

    function tampilkanHalamanKategori() {

        kategoriPage?.classList.add(
            "aktif"
        );

        subbabPage?.classList.remove(
            "aktif"
        );

        soalPage?.classList.remove(
            "aktif"
        );

    }



    /* ======================================
       HALAMAN SUBBAB
       ====================================== */

    function tampilkanHalamanSubbab() {

        kategoriPage?.classList.remove(
            "aktif"
        );

        subbabPage?.classList.add(
            "aktif"
        );

        soalPage?.classList.remove(
            "aktif"
        );

    }



    /* ======================================
       HALAMAN SOAL
       ====================================== */

    function tampilkanHalamanSoal() {

        kategoriPage?.classList.remove(
            "aktif"
        );

        subbabPage?.classList.remove(
            "aktif"
        );

        soalPage?.classList.add(
            "aktif"
        );

    }



    /* ======================================
       TOMBOL KEMBALI SUBBAB
       ====================================== */

    btnKembaliLatihan?.addEventListener(
        "click",
        function () {

            tampilkanHalamanKategori();

        }
    );



    /* ======================================
       TOMBOL KEMBALI DARI SOAL
       ====================================== */

    btnKembaliLatihanSoal?.addEventListener(
        "click",
        function () {

            tampilkanHalamanSubbab();

        }
    );



    /* ======================================
       KLIK KATEGORI
       ====================================== */

    const tombolKategori =
        document.querySelectorAll(
            "#latihanKategoriPage .latihan-kategori"
        );


    tombolKategori.forEach(
        function (tombol) {

            tombol.addEventListener(
                "click",
                function () {

                    const kategori =
                        this.dataset.kategori;


                    tampilkanSubbab(
                        kategori
                    );

                }
            );

        }
    );



    /* ======================================
       TAMPILKAN SUBBAB
       ====================================== */

    function tampilkanSubbab(
        kategori
    ) {

        const data =
            latihanKategoriData[
                kategori
            ];


        if (!data) {

            console.error(
                "❌ Kategori tidak ditemukan:",
                kategori
            );

            return;

        }


        latihanKategoriAktif =
            kategori;


        tampilkanHalamanSubbab();



        const icon =
            document.getElementById(
                "latihanSubbabIcon"
            );


        const judul =
            document.getElementById(
                "latihanSubbabJudul"
            );


        const deskripsi =
            document.getElementById(
                "latihanSubbabDeskripsi"
            );


        const list =
            document.getElementById(
                "latihanSubbabList"
            );


        if (icon) {

            icon.textContent =
                data.icon;

        }


        if (judul) {

            judul.textContent =
                data.judul;

        }


        if (deskripsi) {

            deskripsi.textContent =
                data.deskripsi;

        }


        if (!list) {

            return;

        }


        list.innerHTML = "";



        /* ==================================
           BUAT TOMBOL SUBBAB
           ================================== */

        Object.entries(
            data.subbab
        ).forEach(
            function (
                [key, subbab]
            ) {

                const tombol =
                    document.createElement(
                        "button"
                    );


                tombol.className =
                    "latihan-subbab";


                tombol.dataset.subbab =
                    key;


                tombol.innerHTML = `

                    <span class="subbab-icon">

                        ${subbab.icon}

                    </span>


                    <span>

                        <strong>
                            ${subbab.judul}
                        </strong>

                        <small>
                            ${subbab.deskripsi}
                        </small>

                    </span>

                `;



                /* ==========================
                   KLIK SUBBAB
                   ========================== */

                tombol.addEventListener(
                    "click",
                    function () {

                        bukaLatihanSoal(
                            kategori,
                            key
                        );

                    }
                );


                list.appendChild(
                    tombol
                );

            }
        );

    }



    /* ======================================
       TOMBOL SOAL SEBELUMNYA
       ====================================== */

    btnSebelumnya?.addEventListener(
        "click",
        function () {

            if (
                latihanSoalIndex > 0
            ) {

                latihanSoalIndex--;

                tampilkanSoalLatihan();

            }

        }
    );



    /* ======================================
       TOMBOL SOAL BERIKUTNYA
       ====================================== */

    btnBerikutnya?.addEventListener(
        "click",
        function () {

            if (
                latihanSoalIndex <
                latihanSoalData.length - 1
            ) {

                latihanSoalIndex++;

                tampilkanSoalLatihan();

            }

        }
    );


    console.log(
        "✅ Init Latihan berhasil."
    );

}



/* ==========================================
   BUKA LATIHAN SOAL
   ========================================== */

async function bukaLatihanSoal(
    kategori,
    subbab
) {

    console.log(
        "📚 Membuka latihan:",
        kategori,
        subbab
    );


    /* ======================================
       CEK FUNGSI BACA DATA
       ====================================== */

    if (
        typeof bacaDataLatihan !==
        "function"
    ) {

        console.error(
            "❌ bacaDataLatihan() tidak ditemukan."
        );

        alert(
            "Sistem data latihan belum siap."
        );

        return;

    }



    /* ======================================
       BACA JSON
       ====================================== */

    const data =
        await bacaDataLatihan(
            kategori,
            subbab
        );


    if (
        !Array.isArray(data) ||
        data.length === 0
    ) {

        console.warn(
            "⚠️ Data soal kosong:",
            kategori,
            subbab
        );

        alert(
            "Data soal belum tersedia."
        );

        return;

    }



    /* ======================================
       SIMPAN STATE
       ====================================== */

    latihanSoalData =
        data;


    latihanSoalIndex =
        0;


    latihanJawabanUser =
        {};



    latihanKategoriAktif =
        kategori;


    latihanSubbabAktif =
        subbab;



    console.log(
        "✅ Data latihan berhasil dibuka:",
        data
    );



    /* ======================================
       TAMPILKAN HALAMAN SOAL
       ====================================== */

    const soalPage =
        document.getElementById(
            "latihanSoalPage"
        );


    const subbabPage =
        document.getElementById(
            "latihanSubbabPage"
        );


    if (subbabPage) {

        subbabPage.classList.remove(
            "aktif"
        );

    }


    if (soalPage) {

        soalPage.classList.add(
            "aktif"
        );

    }



    /* ======================================
       JUDUL
       ====================================== */

    const soalJudul =
        document.getElementById(
            "latihanSoalJudul"
        );


    const soalInfo =
        document.getElementById(
            "latihanSoalInfo"
        );


    const soalIcon =
        document.getElementById(
            "latihanSoalIcon"
        );


    const kategoriData =
        latihanKategoriData[
            kategori
        ];


    const subbabData =
        kategoriData?.subbab?.[
            subbab
        ];



    if (soalJudul) {

        soalJudul.textContent =
            subbabData?.judul ||
            `${kategori.toUpperCase()} - ${subbab.toUpperCase()}`;

    }


    if (soalInfo) {

        soalInfo.textContent =
            subbabData?.deskripsi ||
            `Latihan soal ${kategori.toUpperCase()}`;

    }


    if (soalIcon) {

        soalIcon.textContent =
            subbabData?.icon ||
            kategoriData?.icon ||
            "📝";

    }



    /* ======================================
       TAMPILKAN SOAL PERTAMA
       ====================================== */

    tampilkanSoalLatihan();

}



/* ==========================================
   TAMPILKAN SOAL LATIHAN
   ========================================== */

function tampilkanSoalLatihan() {

    const container =
        document.getElementById(
            "latihanSoalContainer"
        );


    if (!container) {

        console.error(
            "❌ latihanSoalContainer tidak ditemukan."
        );

        return;

    }


    if (
        !latihanSoalData.length
    ) {

        container.innerHTML = `

            <div class="soal-kosong">

                <h3>
                    😕 Soal belum tersedia
                </h3>

                <p>
                    Belum ada data soal untuk latihan ini.
                </p>

            </div>

        `;

        return;

    }



    const soal =
        latihanSoalData[
            latihanSoalIndex
        ];


    if (!soal) {

        console.error(
            "❌ Soal tidak ditemukan:",
            latihanSoalIndex
        );

        return;

    }



    /* ======================================
       IDENTITAS SOAL
       ====================================== */

    const idSoal =
        soal.id ??
        latihanSoalIndex;



    /* ======================================
       PERTANYAAN
       ====================================== */

    const pertanyaan =
        soal.soal ||
        soal.pertanyaan ||
        soal.question ||
        "Pertanyaan tidak ditemukan.";



    /* ======================================
       PILIHAN
       ====================================== */

    const pilihan =
        soal.pilihan ||
        soal.options ||
        {};



    /* ======================================
       GAMBAR
       ====================================== */

    let gambarHTML = "";


    if (
        soal.gambar &&
        typeof soal.gambar === "string" &&
        soal.gambar.trim() !== ""
    ) {

        gambarHTML = `

            <div class="latihan-gambar-soal">

                <img
                    src="${soal.gambar}"
                    alt="Gambar soal"
                    loading="lazy"
                >

            </div>

        `;

    }



    /* ======================================
       BUAT PILIHAN
       ====================================== */

    const pilihanHTML =
        buatPilihanLatihan(
            pilihan,
            idSoal
        );



    /* ======================================
       RENDER SOAL
       ====================================== */

    container.innerHTML = `

        <div
            class="latihan-soal-card"
            data-soal-id="${idSoal}"
        >


            <div class="latihan-soal-nomor">

                Soal ${latihanSoalIndex + 1}

            </div>


            <div class="latihan-soal-pertanyaan">

                ${pertanyaan}

            </div>


            ${gambarHTML}


            <div class="latihan-pilihan-jawaban">

                ${pilihanHTML}

            </div>


            <div
                id="latihanPembahasan"
                class="latihan-pembahasan"
            ></div>


        </div>

    `;



    /* ======================================
       UPDATE PROGRESS
       ====================================== */

    updateProgressLatihan();



    /* ======================================
       AKTIFKAN PILIHAN
       ====================================== */

    aktifkanPilihanLatihan();

}



/* ==========================================
   BUAT PILIHAN JAWABAN
   ========================================== */

function buatPilihanLatihan(
    pilihan,
    idSoal
) {

    /* ======================================
       FORMAT OBJECT
       ====================================== */

    if (
        pilihan &&
        typeof pilihan === "object" &&
        !Array.isArray(pilihan)
    ) {

        return Object.entries(
            pilihan
        )
        .map(
            function (
                [huruf, teks]
            ) {

                return buatTombolPilihan(
                    huruf,
                    teks,
                    idSoal
                );

            }
        )
        .join("");

    }



    /* ======================================
       FORMAT ARRAY
       ====================================== */

    if (
        Array.isArray(pilihan)
    ) {

        const huruf =
            ["A", "B", "C", "D", "E"];


        return pilihan
            .map(
                function (
                    jawaban,
                    index
                ) {

                    let teks =
                        jawaban;


                    if (
                        typeof jawaban ===
                        "object"
                    ) {

                        teks =
                            jawaban.teks ||
                            jawaban.text ||
                            jawaban.jawaban ||
                            jawaban.value ||
                            "";

                    }


                    return buatTombolPilihan(
                        huruf[index],
                        teks,
                        idSoal
                    );

                }
            )
            .join("");

    }



    return `

        <p class="latihan-format-error">

            Format pilihan jawaban tidak ditemukan.

        </p>

    `;

}



/* ==========================================
   BUAT SATU TOMBOL PILIHAN
   ========================================== */

function buatTombolPilihan(
    huruf,
    teks,
    idSoal
) {

    return `

        <button
            type="button"
            class="latihan-pilihan-jawaban-btn"
            data-jawaban="${huruf}"
            data-soal-id="${idSoal}"
        >

            <span class="latihan-jawaban-huruf">

                ${huruf}

            </span>


            <span class="latihan-jawaban-teks">

                ${teks}

            </span>

        </button>

    `;

}



/* ==========================================
   AKTIFKAN PILIHAN JAWABAN
   ========================================== */

function aktifkanPilihanLatihan() {

    const tombol =
        document.querySelectorAll(
            "#latihanSoalContainer .latihan-pilihan-jawaban-btn"
        );


    tombol.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const jawaban =
                        this.dataset.jawaban;


                    const idSoal =
                        this.dataset.soalId;



                    /* ==========================
                       SIMPAN JAWABAN
                       ========================== */

                    latihanJawabanUser[
                        idSoal
                    ] = jawaban;



                    /* ==========================
                       HAPUS PILIHAN LAMA
                       ========================== */

                    tombol.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "dipilih"
                            );

                        }
                    );



                    /* ==========================
                       AKTIFKAN PILIHAN
                       ========================== */

                    this.classList.add(
                        "dipilih"
                    );



                    console.log(
                        "Jawaban dipilih:",
                        jawaban
                    );



                    /* ==========================
                       PEMBAHASAN
                       ========================== */

                    tampilkanPembahasanLatihan();

                }
            );

        }
    );



    /* ======================================
       TANDAI JAWABAN SEBELUMNYA
       ====================================== */

    const soal =
        latihanSoalData[
            latihanSoalIndex
        ];


    if (!soal) {

        return;

    }


    const idSoal =
        soal.id ??
        latihanSoalIndex;


    const jawabanTersimpan =
        latihanJawabanUser[
            idSoal
        ];


    if (
        jawabanTersimpan
    ) {

        const tombolDipilih =
            document.querySelector(
                `#latihanSoalContainer .latihan-pilihan-jawaban-btn[data-jawaban="${jawabanTersimpan}"]`
            );


        tombolDipilih?.classList.add(
            "dipilih"
        );

    }

}



/* ==========================================
   PEMBAHASAN
   ========================================== */

function tampilkanPembahasanLatihan() {

    const soal =
        latihanSoalData[
            latihanSoalIndex
        ];


    if (!soal) {

        return;

    }


    const pembahasan =
        soal.pembahasan;


    const jawabanBenar =
        soal.jawaban;



    const container =
        document.getElementById(
            "latihanPembahasan"
        );


    if (!container) {

        return;

    }



    if (
        !pembahasan &&
        !jawabanBenar
    ) {

        container.innerHTML =
            "";

        return;

    }



    container.innerHTML = `

        <div class="latihan-pembahasan-box">

            ${
                jawabanBenar
                    ? `
                        <strong>
                            Jawaban: ${jawabanBenar}
                        </strong>
                      `
                    : ""
            }


            ${
                pembahasan
                    ? `
                        <p>
                            ${pembahasan}
                        </p>
                      `
                    : ""
            }

        </div>

    `;

}



/* ==========================================
   UPDATE PROGRESS
   ========================================== */

function updateProgressLatihan() {

    const nomor =
        document.getElementById(
            "latihanNomorSoal"
        );


    const jumlah =
        document.getElementById(
            "latihanJumlahSoal"
        );


    const progress =
        document.getElementById(
            "latihanProgressFill"
        );


    const btnSebelumnya =
        document.getElementById(
            "btnLatihanSoalSebelumnya"
        );


    const btnBerikutnya =
        document.getElementById(
            "btnLatihanSoalBerikutnya"
        );


    const total =
        latihanSoalData.length;


    const sekarang =
        latihanSoalIndex + 1;



    /* ======================================
       NOMOR
       ====================================== */

    if (nomor) {

        nomor.textContent =
            sekarang;

    }


    if (jumlah) {

        jumlah.textContent =
            total;

    }



    /* ======================================
       PROGRESS BAR
       ====================================== */

    if (progress) {

        const persen =
            total > 0
                ? (
                    sekarang /
                    total
                ) * 100
                : 0;


        progress.style.width =
            `${persen}%`;

    }



    /* ======================================
       SEBELUMNYA
       ====================================== */

    if (btnSebelumnya) {

        btnSebelumnya.disabled =
            latihanSoalIndex === 0;

    }



    /* ======================================
       BERIKUTNYA
       ====================================== */

    if (btnBerikutnya) {

        if (
            latihanSoalIndex ===
            total - 1
        ) {

            btnBerikutnya.textContent =
                "Selesai ✓";

        } else {

            btnBerikutnya.textContent =
                "Berikutnya →";

        }

    }

}
