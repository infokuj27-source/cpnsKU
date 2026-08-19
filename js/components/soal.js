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
                class="exam-menu-card twk"
                onclick="mulaiUjian('twk')"
            >

                <div class="exam-menu-icon">
                    🇮🇩
                </div>

                <div class="exam-menu-info">

                    <h3>TWK</h3>

                    <p>
                        Tes Wawasan Kebangsaan
                    </p>

                    <span>
                        30 Soal
                    </span>

                </div>

                <div class="exam-menu-arrow">
                    →
                </div>

            </button>



            <!-- TIU -->

            <button
                class="exam-menu-card tiu"
                onclick="mulaiUjian('tiu')"
            >

                <div class="exam-menu-icon">
                    🧠
                </div>

                <div class="exam-menu-info">

                    <h3>TIU</h3>

                    <p>
                        Tes Intelegensia Umum
                    </p>

                    <span>
                        35 Soal
                    </span>

                </div>

                <div class="exam-menu-arrow">
                    →
                </div>

            </button>



            <!-- TKP -->

            <button
                class="exam-menu-card tkp"
                onclick="mulaiUjian('tkp')"
            >

                <div class="exam-menu-icon">
                    👤
                </div>

                <div class="exam-menu-info">

                    <h3>TKP</h3>

                    <p>
                        Tes Karakteristik Pribadi
                    </p>

                    <span>
                        45 Soal
                    </span>

                </div>

                <div class="exam-menu-arrow">
                    →
                </div>

            </button>



            <!-- FINAL -->

            <button
                class="exam-menu-card final locked"
                id="finalExamButton"
                disabled
            >

                <div class="exam-menu-icon">
                    🔒
                </div>

                <div class="exam-menu-info">

                    <h3>FINAL CPNS</h3>

                    <p>
                        Gabungan TWK, TIU & TKP
                    </p>

                    <span>
                        Selesaikan 3 tes terlebih dahulu
                    </span>

                </div>

                <div class="exam-menu-arrow">
                    🔒
                </div>

            </button>


        </div>

    </section>

    `;

}
