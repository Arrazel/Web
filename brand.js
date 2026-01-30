document.addEventListener("DOMContentLoaded", () => {
    const words = ["Idea", "Solution", "Thought", "Mind", "Problem", "Feature", "Motivation", "Space"];
    const brand = document.querySelector(".brand");
    brand.textContent = "";

    words.forEach(word => {
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = word;
        brand.appendChild(span);
    });

    const spans = document.querySelectorAll(".word");
    let index = 0;

    function showNextWord() {
        spans.forEach(s => s.classList.remove("active"));
        spans[index].classList.add("active");
        index = (index + 1) % spans.length;
    }

    showNextWord();
    setInterval(showNextWord, 2000);
});
