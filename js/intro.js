/* ==========================================
   INTRO CPNS HUB
   ========================================== */


/* DAFTAR FOTO */

const daftarFoto = [

    "assets/img/intro1.jpg",

    "assets/img/intro2.jpg",

    "assets/img/intro3.jpg",

    "assets/img/intro4.jpg",

    "assets/img/intro5.jpg"

];


/* ELEMEN */

const introImage =
    document.getElementById(
        "introImage"
    );


const btnMulai =
    document.getElementById(
        "btnMulai"
    );


const btnMasuk =
    document.getElementById(
        "btnMasuk"
    );


const introMusic =
    document.getElementById(
        "introMusic"
    );


/* INDEX FOTO */

let fotoSekarang = 0;


/* SLIDESHOW */

let slideshow = null;


/* ==========================================
   GANTI FOTO
   ========================================== */

function gantiFoto() {

    if (!introImage) return;


    introImage.style.opacity = "0";


    setTimeout(function () {

        fotoSekarang++;


        if (
            fotoSekarang >=
            daftarFoto.length
        ) {

            fotoSekarang = 0;

        }


        introImage.src =
            daftarFoto[fotoSekarang];


        introImage.style.opacity = "1";

    }, 400);

}


/* ==========================================
   TAMPILKAN TOMBOL MASUK
   ========================================== */

function tampilkanTombolMasuk() {

    setTimeout(
        function () {

            if (btnMasuk) {

                btnMasuk.classList.add(
                    "muncul"
                );

            }

        },
        5000
    );

}


/* ==========================================
   MULAI INTRO
   ========================================== */

function mulaiIntro() {

    /* Cegah tombol diklik berulang */

    btnMulai.disabled = true;


    /* Sembunyikan tombol mulai */

    btnMulai.classList.add(
        "hilang"
    );


    /* PUTAR MUSIK */

    if (introMusic) {

        introMusic.volume = 1.0;


        introMusic.play()
            .then(function () {

                console.log(
                    "Musik berhasil diputar"
                );

            })
            .catch(function (error) {

                console.error(
                    "Musik gagal diputar:",
                    error
                );

            });

    }


    /* MULAI SLIDESHOW */

    slideshow =
        setInterval(
            gantiFoto,
            5000
        );


    /* TAMPILKAN TOMBOL MASUK */

    tampilkanTombolMasuk();


    /* OTOMATIS MASUK SETELAH 35 DETIK */

    setTimeout(
        function () {

            masukKeWebsite();

        },
        35000
    );

}


/* ==========================================
   MASUK KE HALAMAN UTAMA
   ========================================== */

function masukKeWebsite() {

    if (slideshow) {

        clearInterval(
            slideshow
        );

    }


    if (introMusic) {

        introMusic.pause();

        introMusic.currentTime = 0;

    }


    window.location.href =
        "home.html";

}


/* ==========================================
   KLIK TOMBOL MULAI
   ========================================== */

if (btnMulai) {

    btnMulai.addEventListener(
        "click",
        mulaiIntro
    );

}


/* ==========================================
   KLIK MASUK WEBSITE
   ========================================== */

if (btnMasuk) {

    btnMasuk.addEventListener(
        "click",
        masukKeWebsite
    );

}