async function createInformasi() {

    const response = await fetch("data/informasi.json");
    const informasi = await response.json();

    let cards = "";

    informasi.forEach(item => {

        cards += `

        <div class="card" data-aos="fade-up">

            <i class="${item.icon}"></i>

            <h3>${item.judul}</h3>

            <p>${item.deskripsi}</p>

            <a href="${item.link}" target="_blank">

                Baca Selengkapnya

            </a>

        </div>

        `;

    });

    return `

<section id="informasi">

    <div class="section-title">

        <h2>📢 Informasi Penting</h2>

        <p>Kumpulan informasi yang wajib diketahui sebelum mengikuti seleksi CPNS.</p>

    </div>

    <div id="informasiContainer">

        ${cards}

    </div>

</section>

`;

}