async function createMateri() {

    const response = await fetch("data/materi.json");

    const materi = await response.json();

    let cards = "";

    materi.forEach(item => {

       cards += `
<div class="card materi-card" data-id="${item.id}" data-aos="fade-up">

    <i class="${item.icon}"></i>

    <h3>${item.judul}</h3>

    <p>${item.deskripsi}</p>

    <a href="${item.link}"
       target="_blank"
       class="btn-materi">
       Buka Materi
    </a>

    <button
        class="btn-check"
        onclick="toggleMateri(${item.id})">

        ☐ Tandai Selesai

    </button>

</div>
`;

    });

    return `

<section id="materi">

    <div class="section-title">

        <h2>📚 Materi Gratis</h2>

        <p>Kumpulan materi belajar CPNS.</p>

    </div>

    <div id="materiContainer">

        ${cards}

    </div>

</section>

`;

}

function toggleMateri(id){

    let selesai = JSON.parse(localStorage.getItem("materiSelesai")) || [];

    if(selesai.includes(id)){
        selesai = selesai.filter(item => item !== id);
    }else{
        selesai.push(id);
    }

    localStorage.setItem(
        "materiSelesai",
        JSON.stringify(selesai)
    );

    updateMateriStatus();
}

function updateMateriStatus(){

    const selesai =
        JSON.parse(localStorage.getItem("materiSelesai")) || [];

    document.querySelectorAll(".materi-card")
    .forEach(card=>{

        const id = Number(card.dataset.id);

        const btn = card.querySelector(".btn-check");

        if(selesai.includes(id)){

            btn.innerHTML="✅ Sudah Dipelajari";

            btn.classList.add("done");

        }else{

            btn.innerHTML="☐ Tandai Selesai";

            btn.classList.remove("done");

        }

    });

    updateDashboardProgress();
}

function updateDashboardProgress(){

    const selesai =
        JSON.parse(localStorage.getItem("materiSelesai")) || [];

    const total =
        document.querySelectorAll(".materi-card").length;

    const persen =
        total===0 ? 0 :
        Math.round(
            selesai.length/total*100
        );

    document.getElementById("materiCount").textContent =
        `${selesai.length}/${total}`;

    document.getElementById("progressFill").style.width=
        persen+"%";

    document.getElementById("progressText").innerHTML=
        persen+"%";

    document.getElementById("progressDetail").innerHTML=
        `${selesai.length} dari ${total} materi selesai`;

 // ==========================
    // Confetti jika 100%
    // ==========================

        if(persen===100){

    confetti({

        particleCount:250,

        spread:120,

        origin:{
            y:.6
        }

    });

}
}
