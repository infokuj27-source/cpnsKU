/* ==========================================
   INTRO CPNS HUB
   ========================================== */


/* DAFTAR FOTO */

const daftarFoto = [

    "assets/img/intro/intro1.png",
    "assets/img/intro/intro4.png",


    "assets/img/intro/intro3.png",


    "assets/img/intro/intro5.png"

];


/* ELEMEN */

const introImage =
    document.getElementById(
        "introImage"
    );

    if (introImage) {

    introImage.onerror =
        function () {

            console.error(
                "Gambar pertama gagal dimuat:",
                introImage.src
            );

        };

}


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

    if (!introImage) {

        return;

    }


    /* Sembunyikan gambar lama */

    introImage.style.opacity = "0";


    setTimeout(function () {

        fotoSekarang++;


        /* Jika sudah gambar terakhir,
           kembali ke gambar pertama */

        if (
            fotoSekarang >=
            daftarFoto.length
        ) {

            fotoSekarang = 0;

        }


        /* Buat gambar sementara */

        const gambarBaru =
            new Image();


        gambarBaru.src =
            daftarFoto[fotoSekarang];


        /* Jika gambar berhasil dimuat */

        gambarBaru.onload =
            function () {

                introImage.src =
                    gambarBaru.src;


                introImage.style.opacity =
                    "1";

            };


        /* Jika gambar gagal dimuat */

        gambarBaru.onerror =
            function () {

                console.error(
                    "Gambar gagal dimuat:",
                    daftarFoto[fotoSekarang]
                );


                /* Tampilkan gambar sebelumnya */

                introImage.style.opacity =
                    "1";

            };


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
