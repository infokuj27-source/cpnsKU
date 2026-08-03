function createDashboard() {

    return `

<section id="dashboard">

    <div class="section-title">

        <h2>Dashboard Belajar</h2>

        <p>Pantau semua sumber belajar CPNS dalam satu tempat.</p>

    </div>

<div class="progress-card">

    <div class="progress-header">

        <h3>📊 Progress Belajar</h3>

        <span id="progressText">0%</span>

    </div>

    <div class="progress">

        <div
            id="progressFill"
            class="progress-fill">

        </div>

    </div>

    <small id="progressDetail">

        0 dari 0 materi selesai

    </small>

</div>

    <div class="dashboard-grid">

        <div class="card dashboard-card">

            <i class="fa-solid fa-book"></i>

            <h3 id="materiCount">0</h3>

            <p>Materi</p>

        </div>

        <div class="card dashboard-card">

            <i class="fa-solid fa-file-pen"></i>

            <h3 id="soalCount">0</h3>

            <p>Website Soal</p>

        </div>

        <div class="card dashboard-card">

            <i class="fa-solid fa-circle-info"></i>

            <h3 id="informasiCount">0</h3>

            <p>Informasi</p>

        </div>

        <div class="card dashboard-card">

            <i class="fa-solid fa-calendar-days"></i>

            <h3 id="hariCount">-</h3>

            <p>Hari Menuju Tes</p>

        </div>

    </div>

</section>

`;

}