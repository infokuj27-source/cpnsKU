/* ==========================================
   INTRO CPNS HUB
   ========================================== */


/* ==========================================
   DAFTAR FOTO INTRO
   Foto setelah tombol Mulai diklik
   ========================================== */

const daftarFoto = [

    "assets/img/intro/intro1.png",

    "assets/img/intro/intro3.png",
   "assets/img/intro/intro4.png",
    "assets/img/intro/intro5.png"

];


/* ==========================================
   ELEMEN
   ========================================== */

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


/* ==========================================
   VARIABEL
   ========================================== */

let fotoSekarang = 0;

let slideshow = null;

let introDimulai = false;

let otomatisMasuk = null;


/* ==========================================
   AWAL HALAMAN
   TAMPILKAN HERO1
   ========================================== */

if (introImage) {

    introImage.src =
        "assets/img/hero1.jpg";

}


/* ==========================================
   MULAI INTRO
   ========================================== */

function mulaiIntro() {

    /* Hindari tombol diklik berulang */

    if (introDimulai) {

        return;

    }


    introDimulai = true;


    /* ==========================================
       SEMBUNYIKAN TOMBOL MULAI
       ========================================== */

    if (btnMulai) {

        btnMulai.classList.add(
            "hidden"
        );

    }


    /* ==========================================
       MULAI MUSIK
       ========================================== */

    if (introMusic) {

        introMusic.volume = 0.7;


        introMusic.play()
            .then(function () {

                console.log(
                    "Musik intro berhasil diputar"
                );

            })
            .catch(function (error) {

                console.log(
                    "Musik gagal diputar:",
                    error
                );

            });

    }


    /* ==========================================
       GANTI DARI HERO1 KE FOTO INTRO
       ========================================== */

    if (introImage) {

        introImage.style.opacity = "0";


        setTimeout(function () {

            fotoSekarang = 0;


            introImage.src =
                daftarFoto[
                    fotoSekarang
                ];


            introImage.style.opacity = "1";

        }, 400);

    }


    /* ==========================================
       MULAI SLIDESHOW
       ========================================== */

    slideshow =
        setInterval(
            gantiFoto,
            3000
        );


    /* ==========================================
       TAMPILKAN TOMBOL MASUK
       ========================================== */

    setTimeout(function () {

        if (btnMasuk) {

            btnMasuk.classList.add(
                "muncul"
            );

        }

    }, 5000);


    /* ==========================================
       OTOMATIS MASUK SETELAH 35 DETIK
       ========================================== */

    otomatisMasuk =
        setTimeout(function () {

            masukKeWebsite();

        }, 35000);

}


/* ==========================================
   GANTI FOTO INTRO
   ========================================== */

function gantiFoto() {

    if (!introImage) {

        return;

    }


    introImage.style.opacity = "0";


    setTimeout(function () {

        fotoSekarang++;


        /* Jika sudah sampai foto terakhir */

        if (
            fotoSekarang >=
            daftarFoto.length
        ) {

            fotoSekarang = 0;

        }


        /* Ganti gambar */

        introImage.src =
            daftarFoto[
                fotoSekarang
            ];


        introImage.style.opacity = "1";

    }, 400);

}


/* ==========================================
   MASUK KE WEBSITE
   ========================================== */

function masukKeWebsite() {

    /* Hentikan slideshow */

    if (slideshow) {

        clearInterval(
            slideshow
        );

        slideshow = null;

    }


    /* Hentikan otomatis masuk */

    if (otomatisMasuk) {

        clearTimeout(
            otomatisMasuk
        );

        otomatisMasuk = null;

    }


    /* Hentikan musik */

    if (introMusic) {

        introMusic.pause();

        introMusic.currentTime = 0;

    }


    /* Pindah ke halaman utama */

    window.location.href =
        "home.html";

}


/* ==========================================
   EVENT TOMBOL MULAI
   ========================================== */

if (btnMulai) {

    btnMulai.addEventListener(
        "click",
        mulaiIntro
    );

}


/* ==========================================
   EVENT TOMBOL MASUK
   ========================================== */

if (btnMasuk) {

    btnMasuk.addEventListener(
        "click",
        masukKeWebsite
    );

}
