function createFooter() {

    const year = new Date().getFullYear();

    return `

<footer>

<div class="footer-container">

    <h2>CPNS HUB</h2>

    <p>

        Website belajar CPNS gratis yang
        mengumpulkan materi, soal,
        informasi dan tryout.

    </p>

    <div class="footer-link">

        <a href="#hero">Beranda</a>

        <a href="#materi">Materi</a>

        <a href="#soal">Soal</a>

        <a href="#informasi">Informasi</a>

    </div>

    <p class="copyright">

        © ${year} CPNS HUB

    </p>

</div>

</footer>

`;

}