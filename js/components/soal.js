async function createSoal() {

    const response = await fetch("data/soal.json");
    const soal = await response.json();

    let cards = "";

    soal.forEach(item => {

        cards += `

        <div class="card" data-aos="zoom-in">

            <i class="${item.icon}"></i>

            <h3>${item.judul}</h3>

            <p>${item.deskripsi}</p>

            <a href="${item.link}" target="_blank">

                Mulai Latihan

            </a>

        </div>

        `;

    });

    return `

<section id="soal">

    <div class="section-title">

        <h2>📝 Soal & Tryout</h2>

        <p>Latihan CAT CPNS secara gratis maupun premium.</p>

    </div>

    <div id="soalContainer">

        ${cards}

    </div>

</section>

`;

}

/* ==========================================
   MENU UJIAN CPNS
   ========================================== */

function createExamMenu() {

    const twkSelesai =
        localStorage.getItem("ujian_twk_selesai") === "true";

    const tiuSelesai =
        localStorage.getItem("ujian_tiu_selesai") === "true";

    const tkpSelesai =
        localStorage.getItem("ujian_tkp_selesai") === "true";

    const semuaSelesai =
        twkSelesai &&
        tiuSelesai &&
        tkpSelesai;


    return `

    <section class="exam-menu">

        <div class="exam-menu-header">

            <span>📚</span>

            <div>

                <h2>Latihan SKD CPNS</h2>

                <p>
                    Uji kemampuanmu melalui TWK, TIU, dan TKP
                </p>

            </div>

        </div>


        <div class="exam-menu-grid">


            <!-- TWK -->

            <button
                class="exam-menu-card twk ${twkSelesai ? "completed" : ""}"
                onclick="mulaiUjian('twk')"
            >

                <div class="exam-menu-icon">

                    ${twkSelesai ? "✅" : "🇮🇩"}

                </div>

                <div class="exam-menu-info">

                    <h3>TWK</h3>

                    <p>
                        Tes Wawasan Kebangsaan
                    </p>

                    <span>

                        ${twkSelesai
                            ? "✅ Sudah selesai"
                            : "30 Soal"
                        }

                    </span>

                </div>

                <div class="exam-menu-arrow">

                    ${twkSelesai ? "✓" : "→"}

                </div>

            </button>



            <!-- TIU -->

            <button
                class="exam-menu-card tiu ${tiuSelesai ? "completed" : ""}"
                onclick="mulaiUjian('tiu')"
            >

                <div class="exam-menu-icon">

                    ${tiuSelesai ? "✅" : "🧠"}

                </div>

                <div class="exam-menu-info">

                    <h3>TIU</h3>

                    <p>
                        Tes Intelegensia Umum
                    </p>

                    <span>

                        ${tiuSelesai
                            ? "✅ Sudah selesai"
                            : "35 Soal"
                        }

                    </span>

                </div>

                <div class="exam-menu-arrow">

                    ${tiuSelesai ? "✓" : "→"}

                </div>

            </button>



            <!-- TKP -->

            <button
                class="exam-menu-card tkp ${tkpSelesai ? "completed" : ""}"
                onclick="mulaiUjian('tkp')"
            >

                <div class="exam-menu-icon">

                    ${tkpSelesai ? "✅" : "👤"}

                </div>

                <div class="exam-menu-info">

                    <h3>TKP</h3>

                    <p>
                        Tes Karakteristik Pribadi
                    </p>

                    <span>

                        ${tkpSelesai
                            ? "✅ Sudah selesai"
                            : "45 Soal"
                        }

                    </span>

                </div>

                <div class="exam-menu-arrow">

                    ${tkpSelesai ? "✓" : "→"}

                </div>

            </button>



            <!-- FINAL -->

            <button
                class="exam-menu-card final ${semuaSelesai ? "unlocked" : "locked"}"
                id="finalExamButton"
                 ${semuaSelesai ? 'onclick="mulaiUjian(\'final\')"' : "disabled"}
            >

                <div class="exam-menu-icon">

                    ${semuaSelesai ? "🏆" : "🔒"}

                </div>

                <div class="exam-menu-info">

                    <h3>FINAL CPNS</h3>

                    <p>
                        Gabungan TWK, TIU & TKP
                    </p>

                    <span>

                        ${
                            semuaSelesai
                            ? "🔓 Siap dikerjakan"
                            : "Selesaikan 3 tes terlebih dahulu"
                        }

                    </span>

                </div>

                <div class="exam-menu-arrow">

                    ${semuaSelesai ? "→" : "🔒"}

                </div>

            </button>


        </div>

    </section>

    `;

}
