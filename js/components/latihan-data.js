/* ==========================================
   DATA LATIHAN SOAL CPNS HUB
   ========================================== */


/* ==========================================
   KONFIGURASI DATA
   ========================================== */

const latihanDataPath = {

    tiu: {

        figural:
            "data/latihan/tiu/figural.json",

        angka:
            "data/latihan/tiu/angka.json",

        perbandingan:
            "data/latihan/tiu/perbandingan.json"

    },


    twk: {

        pancasila:
            "data/latihan/twk/pancasila.json",

        uud:
            "data/latihan/twk/uud.json",

        nasionalisme:
            "data/latihan/twk/nasionalisme.json"

    },


    tkp: {

        pelayanan:
            "data/latihan/tkp/pelayanan.json",

        integritas:
            "data/latihan/tkp/integritas.json",

        profesionalisme:
            "data/latihan/tkp/profesionalisme.json"

    }

};


/* ==========================================
   MEMBACA FILE JSON
   ========================================== */

async function bacaDataLatihan(
    kategori,
    jenis
) {

    try {

        /* Cari lokasi JSON */

        const path =
            latihanDataPath
                [kategori]
                ?. [jenis];


        /* Jika file tidak ditemukan */

        if (!path) {

            console.error(
                "Data latihan tidak ditemukan:",
                kategori,
                jenis
            );

            return [];

        }


        /* Ambil JSON */

        const response =
            await fetch(path);


        /* Cek apakah berhasil */

        if (!response.ok) {

            throw new Error(
                `Gagal membaca ${path}`
            );

        }


        /* Ubah menjadi JSON */

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
            "Error membaca data latihan:",
            error
        );


        return [];

    }

}


/* ==========================================
   CEK DATA LATIHAN
   ========================================== */

async function cekDataLatihan(
    kategori,
    jenis
) {

    const data =
        await bacaDataLatihan(
            kategori,
            jenis
        );


    console.log(
        `Data ${kategori} - ${jenis}:`,
        data
    );


    return data;

}

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        const data =
            await cekDataLatihan(
                "tiu",
                "figural"
            );


        console.log(
            "HASIL DATA FIGURAL:",
            data
        );

    }
);