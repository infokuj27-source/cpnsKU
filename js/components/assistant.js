let knowledge = [];

async function initAssistant() {

    // Load data knowledge
    const response = await fetch("data/knowledge.json");
    knowledge = await response.json();

    const input = document.getElementById("assistantInput");

    if (!input) return;

    // Auto suggestion
    input.addEventListener("input", function () {
        showSuggestions(this.value);
    });

    // Tekan Enter
    input.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            searchAssistant(this.value);

            document.getElementById("assistantSuggestion").innerHTML = "";

        }

    });

    // Klik di luar search
    document.addEventListener("click", function (e) {

        if (!e.target.closest(".search-box")) {

            document.getElementById("assistantSuggestion").innerHTML = "";

        }

    });

}

function searchAssistant(question) {

    question = question.toLowerCase().trim();

    const result = document.getElementById("assistantResult");

    if (question === "") {

        result.innerHTML = "";
        return;

    }

    result.innerHTML = `

    <div class="assistant-card">

        <h3>🤖 Sedang berpikir...</h3>

    </div>

    `;

    setTimeout(() => {

        let found = null;

        for (const item of knowledge) {

            // Cari di pertanyaan
            if (item.pertanyaan.toLowerCase().includes(question)) {

                found = item;
                break;

            }

            // Cari di keyword
            for (const key of item.keyword) {

                if (
                    question.includes(key.toLowerCase()) ||
                    key.toLowerCase().includes(question)
                ) {

                    found = item;
                    break;

                }

            }

            if (found) break;

        }

        if (found) {

            showAnswer(found);

        } else {

            result.innerHTML = `

            <div class="assistant-card">

                <h3>🤖 Maaf 😔</h3>

                <p>Saya belum memiliki jawaban tersebut.</p>

            </div>

            `;

        }

    }, 400);

}

function showAnswer(item) {

    const result = document.getElementById("assistantResult");

    result.innerHTML = `

    <div class="assistant-card">

        <h3>${item.pertanyaan}</h3>

        <p id="typingText"></p>

        <br>

        <a href="${item.link}" class="btn-primary">

            📚 Buka Materi

        </a>

    </div>

    `;

    typeWriter(item.jawaban);

}

function typeWriter(text) {

    const target = document.getElementById("typingText");

    target.innerHTML = "";

    let i = 0;

    const interval = setInterval(() => {

        target.innerHTML += text.charAt(i);

        i++;

        if (i >= text.length) {

            clearInterval(interval);

        }

    }, 15);

}

function showSuggestions(keyword) {

    const box = document.getElementById("assistantSuggestion");

    if (!box) return;

    keyword = keyword.toLowerCase().trim();

    if (keyword.length < 1) {

        box.innerHTML = "";
        return;

    }

    let html = "";

    knowledge.forEach(item => {

        let cocok = false;

        if (item.pertanyaan.toLowerCase().includes(keyword)) {

            cocok = true;

        }

        item.keyword.forEach(key => {

            if (key.toLowerCase().includes(keyword)) {

                cocok = true;

            }

        });

        if (cocok) {

            html += `

            <div class="suggest-item">

                🔍 ${item.pertanyaan}

            </div>

            `;

        }

    });

    box.innerHTML = html;

    document.querySelectorAll(".suggest-item").forEach(item => {

        item.onclick = () => {

            const text = item.innerText.replace("🔍 ", "");

            document.getElementById("assistantInput").value = text;

            box.innerHTML = "";

            searchAssistant(text);

        };

    });

}