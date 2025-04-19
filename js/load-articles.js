fetch("https://pastoa.github.io/actualites/articles.json")
  .then((response) => response.json())
  .then((articles) => {
    if (!articles || articles.length === 0) return;

    // Trier les articles par date décroissante
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // === ARTICLE DE UNE ===
    const une = articles[0];
    const slider = document.querySelector(".slider");
    slider.innerHTML = `
      <div class="slide" style="background-image: url('https://pastoa.github.io/actualites/${une.image}')">
        <div class="slider-caption">
          <h2>${une.titre}</h2>
          <p>${formatExtrait(une.extrait, 3)}</p>
          <span class="arrow">➤</span>
          <a class="read-more" href="https://pastoa.github.io/actualites/article.html?id=${une.id}">LIRE LA SUITE</a>
        </div>
      </div>
    `;

    // === ACTUALITÉ PRINCIPALE ===
    const principale = articles[1];
    const secondaires = articles.slice(2, 5); // 3 actus suivantes

    const actusContainer = document.querySelector(".actus-container");
    actusContainer.innerHTML = `
      <div class="actu-principale">
        <img src="https://pastoa.github.io/actualites/${principale.image}" alt="${principale.titre}">
        <h3>${principale.titre}</h3>
        <p class="date">${formatDate(principale.date)}</p>
        <p>${formatExtrait(principale.extrait, 5)}</p>
        <a class="read-more" href="https://pastoa.github.io/actualites/article.html?id=${principale.id}">LIRE LA SUITE</a>
      </div>
      <div class="actu-secondaires">
        ${secondaires.map(article => `
          <div class="actu">
            <h4>${article.titre}</h4>
            <p class="date">${formatDate(article.date)}</p>
            <p>${formatExtrait(article.extrait, 3)}</p>
            <a class="read-more" href="https://pastoa.github.io/actualites/article.html?id=${article.id}">LIRE LA SUITE</a>
          </div>
        `).join('')}
      </div>
    `;
  })
  .catch((error) => {
    console.error("Erreur de chargement des articles :", error);
  });

function formatDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

function formatExtrait(texte, nbPhrases) {
  if (!texte) return "";
  const phrases = texte.split(".").filter(Boolean);
  const extraits = phrases.slice(0, nbPhrases).map(p => p.trim());
  return extraits.join(". ") + (extraits.length ? "." : "");
}

