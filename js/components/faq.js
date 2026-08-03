async function createFAQ() {

    const response = await fetch("data/faq.json");
    const faqs = await response.json();

    let html = "";

    faqs.forEach(faq => {

        html += `

<div class="faq-item">

    <button class="faq-question">

        ${faq.pertanyaan}

        <i class="fa-solid fa-chevron-down"></i>

    </button>

    <div class="faq-answer">

        <p>${faq.jawaban}</p>

    </div>

</div>

`;

    });

    return `

<section id="faq">

    <div class="section-title">

        <h2>❓ Pertanyaan yang Sering Ditanyakan</h2>

        <p>FAQ seputar persiapan CPNS.</p>

    </div>

    <div class="faq-container">

        ${html}

    </div>

</section>

`;

}

function initFAQ() {

    const questions = document.querySelectorAll(".faq-question");

    questions.forEach(question => {

        question.addEventListener("click", () => {

            const item = question.parentElement;

            item.classList.toggle("active");

        });

    });

}