async function createQuote() {

    const response = await fetch("data/quote.json");
    const quotes = await response.json();

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return `

<section id="quote">

    <div class="quote-box" data-aos="zoom-in">

        <i class="fa-solid fa-quote-left"></i>

        <p>"${randomQuote.quote}"</p>

        <h4>${randomQuote.author}</h4>

    </div>

</section>

`;

}