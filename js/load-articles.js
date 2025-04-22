function getExtraitComplet(texte, nbPhrases = 3) {
  if (!texte || typeof texte !== "string") return "";
  const phrases = texte.split(/[.!?。]/).filter(p => p.trim().length > 0);
  return phrases.slice(0, nbPhrases).join('. ') + '.';
}


fetch("https://pastoa.github.io/actualites/articles.json")
  .then((res) => res.json())
  .then((articles) => {
    if (!articles.length) return;

    const slider = document.querySelector(".slider");
    const actuUne = articles[0];

    slider.innerHTML = `
      <div class="slide" style="background-image: url('https://pastoa.github.io/actualites/${actuUne.Image}')">
        <div class="slider-caption">
          <h2>${actuUne.Title}</h2>
          <p>${getExtraitComplet(actuUne.Excerpt, 3)}</p>
          <a href="https://pastoa.github.io/actualites/article.html?id=${actuUne.Slug}" class="btn-une">Lire la suite</a>
        </div>
      </div>
    `;

    const container = document.querySelector(".actus-container");
    const actuPrincipale = articles[1];
    const secondaires = articles.slice(2, 5);

    container.innerHTML = `
      <div class="actu-principale">
        <img src="https://pastoa.github.io/actualites/${actuPrincipale.Image}" alt="${actuPrincipale.Title}">
        <h3>${actuPrincipale.Title}</h3>
        <p class="date">${actuPrincipale.Date}</p>
        <p>${getExtraitComplet(actuPrincipale.Excerpt, 5)}</p>
        <a href="https://pastoa.github.io/actualites/article.html?id=${actuPrincipale.Slug}" class="read-more">Lire la suite</a>
      </div>
      <div class="actu-secondaires">
        ${secondaires.map(article => `
          <div class="actu">
            <h4>${article.Title}</h4>
            <p class="date">${article.Date}</p>
            <p>${getExtraitComplet(article.Excerpt, 3)}</p>
            <a href="https://pastoa.github.io/actualites/article.html?id=${article.Slug}" class="read-more">Lire la suite</a>
          </div>
        `).join("")}
      </div>
    `;
  })
  .catch((error) => console.error("Erreur de chargement des articles :", error));

