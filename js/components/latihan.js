/* ==========================================
   LATIHAN SOAL CPNS HUB
   ========================================== */


/* ==========================================
   DATA KATEGORI
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
             POPUP LATIHAN
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
                                id="subbabIcon"
                                class="latihan-icon"
                            >
                                📝
                            </span>


                            <h2 id="subbabJudul">
                                Pilih Materi
                            </h2>


                            <p id="subbabDeskripsi">
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
                     HALAMAN SOAL
                     ================================== -->

                <div
                    id="latihanSoalPage"
                    class="latihan-page latihan-soal-page"
                >

                    <!-- HEADER SOAL -->

                    <div class="latihan-header">

                        <div>

                            <button
                                id="btnKembaliSoal"
                                class="latihan-back"
                            >
                                ← Kembali
                            </button>


                            <span
                                id="soalIcon"
                                class="latihan-icon"
                            >
                                📝
                            </span>


                            <h2 id="soalJudul">
                                Latihan Soal
                            </h2>


                            <p id="soalInfo">
                                Soal nomor 1
                            </p>

                        </div>


                        <button
                            id="btnTutupSoal"
                            class="latihan-close"
                            aria-label="Tutup"
                        >
                            ×
                        </button>

                    </div>


                    <!-- PROGRESS -->

                    <div class="soal-progress">

                        <div class="soal-progress-info">

                            <span>

                                Soal

                                <strong id="nomorSoal">
                                    1
                                </strong>

                                dari

                                <strong id="jumlahSoal">
                                    0
                                </strong>

                            </span>

                        </div>


                        <div class="soal-progress-bar">

                            <div
                                id="soalProgressFill"
                                class="soal-progress-fill"
                            ></div>

                        </div>

                    </div>


                    <!-- CONTAINER SOAL -->

                    <div
                        id="soalContainer"
                        class="soal-container"
                    >

                    </div>


                    <!-- NAVIGASI -->

                    <div class="soal-navigasi">

                        <button
                            id="btnSoalSebelumnya"
                            class="soal-btn soal-btn-secondary"
                        >
                            ← Sebelumnya
                        </button>


                        <button
                            id="btnSoalBerikutnya"
                            class="soal-btn soal-btn-primary"
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
   BACA DATA JSON
   ========================================== */

async function bacaDataLatihan(
    kategori,
    subbab
) {

    const path =
        latihanDataPath?.[kategori]?.[subbab];


    if (!path) {

        console.error(
            "Path JSON tidak ditemukan:",
            kategori,
            subbab
        );

        return [];

    }


    try {

        const response =
            await fetch(path);


        if (!response.ok) {

            throw new Error(
                `Gagal membaca JSON: ${path}`
            );

        }


        const data =
            await response.json();


        console.log(
            "Data latihan berhasil dibaca:",
            data
        );


        return data;

    }

    catch (error) {

        console.error(
            "Error membaca JSON:",
            error
        );


        return [];

    }

}


/* ==========================================
   INIT LATIHAN
   ========================================== */

function initLatihan() {

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
            "Element latihan belum ditemukan."
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


    const btnTutupSoal =
        document.getElementById(
            "btnTutupSoal"
        );


    const btnKembaliLatihan =
        document.getElementById(
            "btnKembaliLatihan"
        );


    const btnKembaliSoal =
        document.getElementById(
            "btnKembaliSoal"
        );


    const btnSoalSebelumnya =
        document.getElementById(
            "btnSoalSebelumnya"
        );


    const btnSoalBerikutnya =
        document.getElementById(
            "btnSoalBerikutnya"
        );


    /* ======================================
       TAMPILKAN KATEGORI
       ====================================== */

    function tampilkanKategori() {

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
                "Kategori tidak ditemukan:",
                kategori
            );

            return;

        }


        latihanKategoriAktif =
            kategori;


        kategoriPage?.classList.remove(
            "aktif"
        );


        subbabPage?.classList.add(
            "aktif"
        );


        soalPage?.classList.remove(
            "aktif"
        );


        const subbabIcon =
            document.getElementById(
                "subbabIcon"
            );


        const subbabJudul =
            document.getElementById(
                "subbabJudul"
            );


        const subbabDeskripsi =
            document.getElementById(
                "subbabDeskripsi"
            );


        if (subbabIcon) {

            subbabIcon.textContent =
                data.icon;

        }


        if (subbabJudul) {

            subbabJudul.textContent =
                data.judul;

        }


        if (subbabDeskripsi) {

            subbabDeskripsi.textContent =
                data.deskripsi;

        }


        const list =
            document.getElementById(
                "latihanSubbabList"
            );


        if (!list) {

            return;

        }


        list.innerHTML = "";


        Object.entries(
            data.subbab
        ).forEach(
            function ([key, subbab]) {

                const tombol =
                    document.createElement(
                        "button"
                    );


                tombol.className =
                    "latihan-subbab";


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
       BUKA POPUP
       ====================================== */

    btnLatihan.addEventListener(
        "click",
        function () {

            latihanMenu.classList.add(
                "aktif"
            );


            tampilkanKategori();

        }
    );


    /* ======================================
       TUTUP POPUP
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


    btnTutupSoal?.addEventListener(
        "click",
        tutupLatihan
    );


    /* ======================================
       KLIK LUAR POPUP
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
       KEMBALI KE KATEGORI
       ====================================== */

    btnKembaliLatihan?.addEventListener(
        "click",
        function () {

            tampilkanKategori();

        }
    );


    /* ======================================
       KEMBALI DARI SOAL KE SUBBAB
       ====================================== */

    btnKembaliSoal?.addEventListener(
        "click",
        function () {

            soalPage?.classList.remove(
                "aktif"
            );


            subbabPage?.classList.add(
                "aktif"
            );

        }
    );


    /* ======================================
       KATEGORI TWK / TIU / TKP
       ====================================== */

    const tombolKategori =
        latihanMenu.querySelectorAll(
            ".latihan-kategori"
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
       SOAL SEBELUMNYA
       ====================================== */

    btnSoalSebelumnya?.addEventListener(
        "click",
        function () {

            if (
                latihanSoalIndex > 0
            ) {

                latihanSoalIndex--;

                tampilkanSoal();

            }

        }
    );


    /* ======================================
       SOAL BERIKUTNYA
       ====================================== */

    btnSoalBerikutnya?.addEventListener(
        "click",
        function () {

            if (
                latihanSoalIndex <
                latihanSoalData.length - 1
            ) {

                latihanSoalIndex++;

                tampilkanSoal();

            } else {

                alert(
                    "Latihan soal selesai! 🎉"
                );

            }

        }
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
        "Membuka latihan:",
        kategori,
        subbab
    );


    /* ======================================
       BACA JSON
       ====================================== */

    const data =
        await bacaDataLatihan(
            kategori,
            subbab
        );


    if (
        !data ||
        !Array.isArray(data) ||
        data.length === 0
    ) {

        alert(
            "Data soal belum tersedia."
        );

        return;

    }


    /* ======================================
       SIMPAN DATA
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
        "Jumlah soal:",
        latihanSoalData.length
    );


    console.log(
        "Data soal:",
        latihanSoalData
    );


    /* ======================================
       HALAMAN
       ====================================== */

    const subbabPage =
        document.getElementById(
            "latihanSubbabPage"
        );


    const soalPage =
        document.getElementById(
            "latihanSoalPage"
        );


    subbabPage?.classList.remove(
        "aktif"
    );


    soalPage?.classList.add(
        "aktif"
    );


    /* ======================================
       JUDUL
       ====================================== */

    const soalJudul =
        document.getElementById(
            "soalJudul"
        );


    const soalIcon =
        document.getElementById(
            "soalIcon"
        );


    if (soalJudul) {

        soalJudul.textContent =
            `${kategori.toUpperCase()} - ${subbab.toUpperCase()}`;

    }


    if (soalIcon) {

        const kategoriData =
            latihanKategoriData[
                kategori
            ];


        soalIcon.textContent =
            kategoriData?.icon || "📝";

    }


    /* ======================================
       TAMPILKAN SOAL PERTAMA
       ====================================== */

    tampilkanSoal();

}


/* ==========================================
   TAMPILKAN SOAL
   ========================================== */

function tampilkanSoal() {

    const container =
        document.getElementById(
            "soalContainer"
        );


    if (
        !container ||
        !latihanSoalData.length
    ) {

        return;

    }


    const soal =
        latihanSoalData[
            latihanSoalIndex
        ];


    if (!soal) {

        return;

    }


    /* ======================================
       ELEMENT INFO
       ====================================== */

    const nomorSoal =
        document.getElementById(
            "nomorSoal"
        );


    const jumlahSoal =
        document.getElementById(
            "jumlahSoal"
        );


    const soalInfo =
        document.getElementById(
            "soalInfo"
        );


    const progressFill =
        document.getElementById(
            "soalProgressFill"
        );


    const btnSebelumnya =
        document.getElementById(
            "btnSoalSebelumnya"
        );


    const btnBerikutnya =
        document.getElementById(
            "btnSoalBerikutnya"
        );


    /* ======================================
       DATA PERTANYAAN
       ====================================== */

    const pertanyaan =
        soal.soal ||
        soal.pertanyaan ||
        soal.question ||
        "Pertanyaan tidak ditemukan";


    /* ======================================
       GAMBAR
       ====================================== */

    let gambarHTML = "";


    if (
        soal.gambar &&
        soal.gambar.trim() !== ""
    ) {

        gambarHTML = `

            <div class="soal-gambar">

                <img
                    src="${soal.gambar}"
                    alt="Gambar soal"
                >

            </div>

        `;

    }


    /* ======================================
       PILIHAN
       ====================================== */

    const pilihanHTML =
        buatPilihanJawaban(
            soal.pilihan
        );


    /* ======================================
       TAMPILKAN SOAL
       ====================================== */

    container.innerHTML = `

        <div class="soal-card">


            <div class="soal-pertanyaan">

                ${pertanyaan}

            </div>


            ${gambarHTML}


            <div class="soal-pilihan-list">

                ${pilihanHTML}

            </div>


        </div>

    `;


    /* ======================================
       INFO NOMOR
       ====================================== */

    const nomor =
        latihanSoalIndex + 1;


    const total =
        latihanSoalData.length;


    if (nomorSoal) {

        nomorSoal.textContent =
            nomor;

    }


    if (jumlahSoal) {

        jumlahSoal.textContent =
            total;

    }


    if (soalInfo) {

        soalInfo.textContent =
            `Latihan soal ${latihanKategoriAktif.toUpperCase()}`;

    }


    /* ======================================
       PROGRESS BAR
       ====================================== */

    if (progressFill) {

        const progress =
            (nomor / total) * 100;


        progressFill.style.width =
            `${progress}%`;

    }


    /* ======================================
       TOMBOL SEBELUMNYA
       ====================================== */

    if (btnSebelumnya) {

        btnSebelumnya.disabled =
            latihanSoalIndex === 0;

    }


    /* ======================================
       TOMBOL BERIKUTNYA
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


    /* ======================================
       AKTIFKAN PILIHAN
       ====================================== */

    aktifkanPilihanJawaban();

}


/* ==========================================
   BUAT PILIHAN JAWABAN
   ========================================== */

function buatPilihanJawaban(
    pilihan
) {

    /* ======================================
       JIKA PILIHAN TIDAK ADA
       ====================================== */

    if (
        !pilihan ||
        typeof pilihan !== "object"
    ) {

        return `

            <p class="soal-error">

                Pilihan jawaban tidak ditemukan.

            </p>

        `;

    }


    /* ======================================
       JSON OBJECT
       A, B, C, D, E
       ====================================== */

    return Object.entries(
        pilihan
    ).map(
        function ([huruf, teks]) {

            return `

                <button
                    type="button"
                    class="soal-jawaban"
                    data-jawaban="${huruf}"
                >

                    <span class="jawaban-label">

                        ${huruf}

                    </span>


                    <span class="jawaban-teks">

                        ${teks}

                    </span>

                </button>

            `;

        }
    ).join("");

}


/* ==========================================
   AKTIFKAN PILIHAN JAWABAN
   ========================================== */

function aktifkanPilihanJawaban() {

    const tombol =
        document.querySelectorAll(
            "#soalContainer .soal-jawaban"
        );


    tombol.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const jawaban =
                        this.dataset.jawaban;


                    /* SIMPAN JAWABAN */

                    latihanJawabanUser[
                        latihanSoalIndex
                    ] =
                        jawaban;


                    /* HAPUS PILIHAN SEBELUMNYA */

                    tombol.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "dipilih"
                            );

                        }
                    );


                    /* TANDAI PILIHAN */

                    this.classList.add(
                        "dipilih"
                    );


                    console.log(
                        "Jawaban soal",
                        latihanSoalIndex + 1,
                        ":",
                        jawaban
                    );

                }
            );

        }
    );


    /* ======================================
       JIKA SUDAH PERNAH DIPILIH
       ====================================== */

    const jawabanTersimpan =
        latihanJawabanUser[
            latihanSoalIndex
        ];


    if (
        jawabanTersimpan
    ) {

        const tombolDipilih =
            document.querySelector(
                `#soalContainer .soal-jawaban[data-jawaban="${jawabanTersimpan}"]`
            );


        if (tombolDipilih) {

            tombolDipilih.classList.add(
                "dipilih"
            );

        }

    }

}