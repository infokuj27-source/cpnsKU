/* ==========================================
   SISTEM UJIAN CPNS
   ========================================== */

let soalUjian = [];
let nomorSoal = 0;
let jawabanUser = [];


/* ==========================================
   MEMBUAT HALAMAN UJIAN
   ========================================== */

async function mulaiUjian(jenis) {

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

        nomorSoal = 0;

        jawabanUser = new Array(soalUjian.length).fill(null);

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

    });


    container.innerHTML = `

        <div class="soal">

            <h2>
                ${soal.pertanyaan}
            </h2>

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

        const lanjut =
            confirm(
                `Masih ada ${belumDijawab} soal yang belum dijawab.\n\nYakin ingin menyelesaikan ujian?`
            );


        if (!lanjut) {

            return;

        }

    }


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


                <button
                    class="btn-primary"
                    onclick="location.hash='materi'; location.reload();"
                >
                    ← Kembali ke Website
                </button>

            </div>

        </section>

    `;

}
