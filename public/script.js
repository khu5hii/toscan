const analyzeBtn = document.getElementById("button");
const tryAnotherBtn = document.getElementById("button2");
const popup = document.getElementsByClassName("popup")[0];
const popupBtn = document.getElementById("pop");

analyzeBtn.addEventListener("click", async () => {
  const text = document.getElementById("text").value.trim();

  if (!text) {
    popup.style.display = "flex";
    return;
  }

  try {
    const response = await fetch("/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    const keywordsHTML = data.keywords?.length
      ? `<div class="keywords-grid">${data.keywords
          .map(k => `<div class="keyword">${k}</div>`)
          .join("")}</div>`
      : "<div class='keywords-grid'><div class='keyword'>None</div></div>";

    document.getElementById("output").innerHTML =
      `<p>${data.explanation}</p>` +
      keywordsHTML +
      `<h2>Vibe Score: ${data.score} (${data.vibe})</h2>`;

    document.querySelector(".score").style.display = "block";
    document.getElementById("scorecard").innerText = data.score;
    document.getElementById("explain").style.display = "block";
    document.getElementById("h4").style.display = "block";
    tryAnotherBtn.style.display = "inline";
  } catch (err) {
    document.getElementById("output").innerHTML =
      "<p style='color:red;'>AI error. Please try again.</p>";
  }
});

tryAnotherBtn.addEventListener("click", () => {
  document.getElementById("text").value = "";
  document.getElementById("explain").style.display = "none";
  tryAnotherBtn.style.display = "none";
});

popupBtn.addEventListener("click", () => {
  popup.style.display = "none";
});
