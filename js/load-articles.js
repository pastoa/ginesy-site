function getExtraitComplet(texte, nbPhrases = 3) {
  if (!texte || typeof texte !== "string") return "";
  const phrases = texte.split(/[.!?。]/).filter(p => p.trim().length > 0);
  return phrases.slice(0, nbPhrases).join('. ') + '.';
}

fetch("https://pastoa.github.io/actualites/articles.json")
  .then((response) => response.json())
  .then((articles) => {
    if (!Array.isArray(articles)) {
      console.error("Le fichier articles.json ne contient pas un tableau.");
      return;
    }

    // Trier les articles du plus récent au plus ancien
    articles.sort((a, b) => new Date(b.Date) - new Date(a.Date));

    // IMAGE DE UNE
    const imageUne = document.querySelector(".slider");
    const articleUne = articles[0];
    if (imageUne && articleUne) {
      imageUne.innerHTML = `
        <div class="slide" style="background-image: url('https://pastoa.github.io/actualites/${articleUne.Image || "images/default.jpg"}')">
          <div class="slider-caption">
            <h2>${articleUne.Title}</h2>
            <p>${getExtraitComplet(articleUne.Excerpt, 3)}</p>
            <a href="https://pastoa.github.io/actualites/article.html?id=${articleUne.Slug}" class="lire-suite-une">Lire la suite ➤</a>
          </div>
        </div>
      `;
    }

    // BLOC ACTUALITÉS
    const container = document.querySelector(".actus-container");
    if (container && articles.length >= 5) {
      const principale = articles[1];
      const secondaires = articles.slice(2, 5);

      const blocPrincipale = `
        <div class="actu-principale">
          <img src="https://pastoa.github.io/actualites/${principale.Image || "images/default.jpg"}" alt="${principale.Title}">
          <div class="overlay">
            <h3>${principale.Title}</h3>
            <p class="date">${formatDateFr(principale.Date)}</p>
            <p>${getExtraitComplet(principale.Excerpt, 5)}</p>
            <a href="https://pastoa.github.io/actualites/article.html?id=${principale.Slug}" class="read-more">Lire la suite</a>
          </div>
        </div>
      `;

      const blocSecondaires = secondaires
        .map(
          (article) => `
        <div class="actu">
          <div class="overlay">
            <h4>${article.Title}</h4>
            <p class="date">${formatDateFr(article.Date)}</p>
            <p>${getExtraitComplet(article.Excerpt, 3)}</p>
            <a href="https://pastoa.github.io/actualites/article.html?id=${article.Slug}" class="read-more">Lire la suite</a>
          </div>
        </div>
      `
        )
        .join("");

      container.innerHTML = `
        ${blocPrincipale}
        <div class="actu-secondaires">${blocSecondaires}</div>
      `;
    }
  })
  .catch((error) => console.error("Erreur de chargement des articles :", error));

// Format de la date en FR (ex. "05.05.2025")
function formatDateFr(dateStr) {
  const date = new Date(dateStr);
  const jour = String(date.getDate()).padStart(2, '0');
  const mois = String(date.getMonth() + 1).padStart(2, '0');
  const annee = date.getFullYear();
  return `${jour}.${mois}.${annee}`;
}


