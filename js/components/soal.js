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