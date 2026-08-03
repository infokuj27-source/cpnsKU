function createNavbar() {

    return `

<header>

<nav class="navbar">

    <div class="logo">

        <i class="fa-solid fa-graduation-cap"></i>

        <span>CPNS HUB</span>

    </div>

    <div class="search-box">

        <input
id="assistantInput"
type="text"
placeholder="🤖 Tanya apa saja tentang CPNS...">

<div id="assistantSuggestion"></div>
    </div>

    <ul class="nav-links">

        <li><a href="#hero">Beranda</a></li>

        <li><a href="#materi">Materi</a></li>

        <li><a href="#soal">Soal</a></li>

        <li><a href="#informasi">Info</a></li>

        <li><a href="#faq">FAQ</a></li>

    </ul>

    <div class="nav-right">

        <button id="darkMode">

            <i class="fa-solid fa-moon"></i>

        </button>

        <button id="menuBtn">

            <i class="fa-solid fa-bars"></i>

        </button>

    </div>

</nav>
<div id="assistantResult"></div>
</header>

`;

}