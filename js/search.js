/**
 * ==========================================================
 * File      : search.js
 * Module    : Smart Search
 * Project   : CPNS Learning Center
 * Version   : 1.0.0
 * ==========================================================
 */

export function initSearch() {

    // =====================================================
    // Ambil Elemen
    // =====================================================

    const input = document.getElementById("searchInput");
    const result = document.getElementById("searchResult");
    const clearBtn = document.getElementById("clearSearch");

    if (!input || !result || !clearBtn) return;

    // =====================================================
    // Database Pencarian
    // =====================================================

    const searchData = [

        {
            title: "Google Drive 1",
            category: "📚 Materi Gratis",
            description: "Materi lengkap CPNS",
            keywords: ["drive", "materi", "google", "gratis"],
            target: "#materi"
        },

        {
            title: "Google Drive 2",
            category: "📚 Materi Gratis",
            description: "Materi tambahan CPNS",
            keywords: ["drive", "materi", "google", "folder"],
            target: "#materi"
        },

        {
            title: "TONAS SKD",
            category: "📝 Tryout",
            description: "Latihan soal CAT gratis",
            keywords: ["tonas", "tryout", "skd", "cat"],
            target: "#soal"
        },

        {
            title: "Teman CPNS",
            category: "📝 Tryout",
            description: "Latihan soal gratis",
            keywords: ["teman", "cpns", "tryout"],
            target: "#soal"
        },

        {
            title: "IDCPNS",
            category: "📝 Tryout",
            description: "Bank soal CPNS",
            keywords: ["idcpns", "soal"],
            target: "#soal"
        },

        {
            title: "Tryout CASN",
            category: "📝 Tryout",
            description: "Simulasi ujian CAT",
            keywords: ["tryout", "casn"],
            target: "#soal"
        },

        {
            title: "Nilai Ambang Batas",
            category: "ℹ️ Informasi",
            description: "Passing Grade SKD",
            keywords: ["nilai", "ambang", "passing", "skd"],
            target: "#informasi"
        },

        {
            title: "3 Hal Penting",
            category: "ℹ️ Informasi",
            description: "Informasi penting CPNS",
            keywords: ["informasi", "tips"],
            target: "#informasi"
        }

    ];

    // =====================================================
    // Render Hasil
    // =====================================================

    function render(data) {

        result.innerHTML = "";

        if (!data.length) {

            result.innerHTML = `
                <div class="search-item">
                    <h4>Tidak ada hasil ditemukan 😢</h4>
                    <span>Coba kata kunci lain.</span>
                </div>
            `;

            return;

        }

        data.forEach(item => {

            result.innerHTML += `
                <div class="search-item"
                     data-target="${item.target}">

                    <h4>${item.title}</h4>

                    <span>${item.category}</span>

                    <p>${item.description}</p>

                </div>
            `;

        });

    }

    // =====================================================
    // Input Search
    // =====================================================

    input.addEventListener("input", () => {

        const keyword = input.value.trim().toLowerCase();

        clearBtn.style.display =
            keyword ? "flex" : "none";

        if (!keyword) {

            result.innerHTML = "";

            return;

        }

        const filtered = searchData.filter(item => {

            return (

                item.title.toLowerCase().includes(keyword)

                ||

                item.category.toLowerCase().includes(keyword)

                ||

                item.description.toLowerCase().includes(keyword)

                ||

                item.keywords.some(k =>
                    k.includes(keyword)
                )

            );

        });

        render(filtered);

    });

    // =====================================================
    // Tombol Clear
    // =====================================================

    clearBtn.addEventListener("click", () => {

        input.value = "";

        result.innerHTML = "";

        clearBtn.style.display = "none";

        input.focus();

    });

    // =====================================================
    // Klik Result
    // =====================================================

    result.addEventListener("click", (event) => {

        const card = event.target.closest(".search-item");

        if (!card) return;

        const target = document.querySelector(
            card.dataset.target
        );

        if (!target) return;

        target.scrollIntoView({

            behavior: "smooth"

        });

        target.classList.add("search-highlight");

        setTimeout(() => {

            target.classList.remove("search-highlight");

        }, 2000);

    });

}
