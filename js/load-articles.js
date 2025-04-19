fetch("https://pastoa.github.io/actualites/articles.json")
  .then((response) => response.json())
  .then((articles) => {
    if (!articles || articles.length === 0) return;

    // Trier par date décroissante
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Article de UNE
    const une = articles[0];
    document.querySelector(".slider").innerHTML = `
      <div class="slide" style="background-image: url('https://pastoa.github.io/actualites/${une.image}')">
        <div class="slider-caption">
          <h2>${une.titre}</h2>
          <p>${formatExtrait(une.extrait, 3)}</p>
          <span class="arrow">➤</span>
          <a class="read-more" href="https://pastoa.github.io/actualites/article.html?id=${une.id}">LIRE LA SUITE</a>
        </div>
      </div>
    `;

    // Bloc Actualités
    const container = document.querySelector(".actus-container");
    const principal = articles[1];
    const secondaires = articles.slice(2, 5);

    container.innerHTML = `
      <div class="actu-principale">
        <img src="https://pastoa.github.io/actualites/${principal.image}" alt="${principal.titre}">
        <h3>${principal.titre}</h3>
        <p class="date">${formatDate(principal.date)}</p>
        <p>${formatExtrait(principal.extrait, 5)}</p>
        <a class="read-more" href="https://pastoa.github.io/actualites/article.html?id=${principal.id}">LIRE LA SUITE</a>
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
  .catch((error) => console.error("Erreur de chargement des articles :", error));

function formatDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function formatExtrait(extrait, maxLignes = 3) {
  if (!extrait) return "";
  const phrases = extrait.split(".");
  const clean = [];
  for (let phrase of phrases) {
    if (phrase.trim()) clean.push(phrase.trim());
    if (clean.length >= maxLignes) break;
  }
  return clean.join(". ") + ".";
}

