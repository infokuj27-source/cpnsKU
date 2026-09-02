/* ==========================================
   POPUP INFORMASI CPNS HUB
   ========================================== */


/* ==========================================
   DAFTAR INFORMASI POPUP
   ==========================================

   Silakan ubah teks di bagian ini.
   Teks akan muncul DI ATAS gambar.
*/

const popupData = [

    {
        gambar:
            "assets/img/popup/popup1.jpeg",

        judul:
            "📢 Jadwal Belajar CPNS HUB",

        keterangan:
            "Berikut adalah jadwal materi dan pembahasan CPNS HUB bulan September 2026."
    },


    {
        gambar:
            "assets/img/popup/popup1.jpeg",

        judul:
            "📚 Informasi Penting CPNS",

        keterangan:
            "Ikuti jadwal belajar dan jangan lewatkan materi serta pembahasan yang telah disiapkan."
    }

];


/* ==========================================
   VARIABEL
   ========================================== */

let popupIndex = 0;

let popupTouchStartX = 0;

let popupTouchEndX = 0;


/* ==========================================
   MEMBUAT POPUP
   ========================================== */

function buatPopupInformasi() {

    /* Jangan buat popup dua kali */

    if (
        document.getElementById(
            "popupInformasi"
        )
    ) {

        return;

    }


    const popup =
        document.createElement("div");


    popup.id =
        "popupInformasi";


    popup.className =
        "popup-overlay";


    popup.innerHTML = `

        <div class="popup-container">


            <!-- TOMBOL CLOSE -->

            <button
                class="popup-close"
                id="popupClose"
                aria-label="Tutup"
            >
                ×
            </button>


            <!-- AREA POPUP -->

            <div
                class="popup-slider"
                id="popupSlider"
            >


                <!-- INFORMASI TEKS -->

                <div
                    class="popup-info"
                >

                    <h2
                        id="popupJudul"
                    >
                    </h2>


                    <p
                        id="popupKeterangan"
                    >
                    </p>

                </div>


                <!-- GAMBAR -->

                <img
                    id="popupImage"
                    class="popup-image"
                    src=""
                    alt="Informasi CPNS HUB"
                >


                <!-- INDIKATOR -->

                <div
                    class="popup-indicators"
                    id="popupIndicators"
                >
                </div>


            </div>


        </div>

    `;


    document.body.appendChild(
        popup
    );

    /* Tampilkan popup */

setTimeout(function () {

    popup.classList.add(
        "popup-visible"
    );

}, 100);

    /* ==========================================
       TOMBOL CLOSE
       ========================================== */

    const btnClose =
        document.getElementById(
            "popupClose"
        );


    btnClose.addEventListener(
        "click",
        tutupPopup
    );


    /* ==========================================
       KLIK LUAR POPUP
       ========================================== */

    popup.addEventListener(
        "click",
        function (event) {

            if (
                event.target === popup
            ) {

                tutupPopup();

            }

        }
    );


    /* ==========================================
       BUAT INDIKATOR
       ========================================== */

    buatPopupIndicator();


    /* ==========================================
       SWIPE HP
       ========================================== */

    const slider =
        document.getElementById(
            "popupSlider"
        );


    slider.addEventListener(
        "touchstart",
        function (event) {

            popupTouchStartX =
                event.changedTouches[0]
                    .screenX;

        },
        {
            passive: true
        }
    );


    slider.addEventListener(
        "touchend",
        function (event) {

            popupTouchEndX =
                event.changedTouches[0]
                    .screenX;


            prosesSwipe();

        },
        {
            passive: true
        }
    );


    /* ==========================================
       TAMPILKAN DATA PERTAMA
       ========================================== */

    tampilkanPopupGambar(
        "next"
    );

}


/* ==========================================
   INDIKATOR
   ========================================== */

function buatPopupIndicator() {

    const container =
        document.getElementById(
            "popupIndicators"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    popupData.forEach(
        function (item, index) {

            const dot =
                document.createElement(
                    "span"
                );


            dot.className =
                "popup-dot";


            dot.dataset.index =
                index;


            container.appendChild(
                dot
            );

        }
    );

}


/* ==========================================
   TAMPILKAN GAMBAR + TEKS
   ========================================== */

function tampilkanPopupGambar(
    arah
) {

    const image =
        document.getElementById(
            "popupImage"
        );


    const judul =
        document.getElementById(
            "popupJudul"
        );


    const keterangan =
        document.getElementById(
            "popupKeterangan"
        );


    if (
        !image ||
        !judul ||
        !keterangan
    ) {

        return;

    }


    const data =
        popupData[
            popupIndex
        ];


    /* ==========================================
       RESET ANIMASI
       ========================================== */

    image.classList.remove(
        "slide-next",
        "slide-prev"
    );


    void image.offsetWidth;


    /* ==========================================
       ANIMASI
       ========================================== */

    if (
        arah === "next"
    ) {

        image.classList.add(
            "slide-next"
        );

    }

    else {

        image.classList.add(
            "slide-prev"
        );

    }


    /* ==========================================
       GANTI GAMBAR
       ========================================== */

    image.src =
        data.gambar;


    /* ==========================================
       GANTI JUDUL
       ========================================== */

    judul.textContent =
        data.judul;


    /* ==========================================
       GANTI KETERANGAN
       ========================================== */

    keterangan.textContent =
        data.keterangan;


    /* ==========================================
       UPDATE INDIKATOR
       ========================================== */

    updatePopupIndicator();

}


/* ==========================================
   GAMBAR BERIKUTNYA
   ========================================== */

function popupGambarBerikutnya() {

    popupIndex++;


    if (
        popupIndex >=
        popupData.length
    ) {

        popupIndex = 0;

    }


    tampilkanPopupGambar(
        "next"
    );

}


/* ==========================================
   GAMBAR SEBELUMNYA
   ========================================== */

function popupGambarSebelumnya() {

    popupIndex--;


    if (
        popupIndex < 0
    ) {

        popupIndex =
            popupData.length - 1;

    }


    tampilkanPopupGambar(
        "prev"
    );

}


/* ==========================================
   SWIPE
   ========================================== */

function prosesSwipe() {

    const jarak =
        popupTouchEndX -
        popupTouchStartX;


    /* Swipe ke kiri */

    if (
        jarak < -50
    ) {

        popupGambarBerikutnya();

    }


    /* Swipe ke kanan */

    else if (
        jarak > 50
    ) {

        popupGambarSebelumnya();

    }

}


/* ==========================================
   UPDATE INDIKATOR
   ========================================== */

function updatePopupIndicator() {

    const dots =
        document.querySelectorAll(
            ".popup-dot"
        );


    dots.forEach(
        function (dot, index) {

            dot.classList.toggle(
                "active",
                index === popupIndex
            );

        }
    );

}


/* ==========================================
   TUTUP POPUP
   ========================================== */

function tutupPopup() {

    const popup =
        document.getElementById(
            "popupInformasi"
        );


    if (!popup) {

        return;

    }


    popup.classList.add(
        "popup-hidden"
    );

}




/* ==========================================
   JALANKAN POPUP SETELAH HOME.HTML SIAP
   ========================================== */

        buatPopupInformasi();