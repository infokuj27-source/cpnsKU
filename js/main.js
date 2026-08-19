async function initWebsite() {

    const app = document.getElementById("app");

    app.innerHTML = `

        ${createNavbar()}

        ${createHero()}
        ${createAnnouncement()}

        ${createDashboard()}

        ${await createMateri()}

        ${createExamMenu()}

        ${await createSoal()}

        ${await createInformasi()}

        ${await createQuote()}
        

        ${await createFAQ()}
        ${createFooter()}

    `;
    AOS.init({
        duration: 800,
        once: true
    });

    initFAQ();

    initSearch();

     initAssistant();

    updateMateriStatus();

    initCountdown();

    initDarkMode();
    initMobileMenu();

    initBackToTop();

}

initWebsite();
