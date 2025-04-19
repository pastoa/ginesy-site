fetch("https://pastoa.github.io/actualites/articles.json")
  .then((response) => response.json())
  .then((articles) => {
    if (!articles || articles.length === 0) return;

    // Tri décroissant
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Article de une
    const articleUne = articles[0];
    const uneSection = document.querySelector(".slider");

    uneSection.innerHTML = `
      <div class="slide" style="background-image: url('https://pastoa.github.io/actualites/${articleUne.image}')">
        <div class="slider-caption">
          <h2>${articleUne.titre}</h2>
          <p>${getExtraitComplet(articleUne.extrait || "", 3)}</p>
          <span class="arrow">➤</span>
          <a class="read-more" href="https://pastoa.github.io/actualites/article.html?id=${articleUne.id}">LIRE LA SUITE</a>
        </div>
      </div>
    `;

    // Bloc actualités
    const container = document.querySelector(".actus-container");
    const articlePrincipal = articles[1];
    const secondaires = articles.slice(2, 5);

    container.innerHTML = `
      <div class="actu-principale">
        <img src="https://pastoa.github.io/actualites/${articlePrincipal.image}" alt="${articlePrincipal.titre}">
        <h3>${articlePrincipal.titre}</h3>
        <p class="date">${formatDateFR(articlePrincipal.date)}</p>
        <p>${getExtraitComplet(articlePrincipal.extrait || "", 5)}</p>
        <a class="read-more" href="https://pastoa.github.io/actualites/article.html?id=${articlePrincipal.id}">LIRE LA SUITE</a>
      </div>
      <div class="actu-secondaires">
        ${secondaires.map((article) => `
          <div class="actu">
            <h4>${article.titre}</h4>
            <p class="date">${formatDateFR(article.date)}</p>
            <p>${getExtraitComplet(article.extrait || "", 3)}</p>
            <a class="read-more" href="https://pastoa.github.io/actualites/article.html?id=${article.id}">LIRE LA SUITE</a>
          </div>
        `).join("")}
      </div>
    `;
  })
  .catch((error) => console.error("Erreur de chargement des articles :", error));

// Fonctions
function getExtraitComplet(contenu, maxLignes = 3) {
  if (!contenu) return "";
  const phrases = contenu.split(".");
  const extraits = [];
  let lignes = 0;

  for (let phrase of phrases) {
    const clean = phrase.trim();
    if (clean.length > 0) {
      extraits.push(clean);
      lignes++;
      if (lignes >= maxLignes) break;
    }
  }

  return extraits.join(". ") + (extraits.length > 0 ? "." : "");
}

function formatDateFR(dateString) {
  const d = new Date(dateString);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

