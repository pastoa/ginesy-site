// ✅ Script entièrement fonctionnel pour afficher les articles sur la page d'accueil

fetch("https://pastoa.github.io/actualites/articles.json")
  .then((res) => res.json())
  .then((articles) => {
    if (articles.length > 0) {
      afficherArticleUne(articles[0]); // article le plus récent
    }
  });


    // Trier les articles par date décroissante
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

function afficherArticleUne(article) {
  const slide = document.querySelector(".slider .slide");
  const caption = document.querySelector(".slider-caption");

  if (!slide || !caption || !article) return;

  // Appliquer l'image de fond
  slide.style.backgroundImage = `url('${article.image}')`;
  slide.style.backgroundSize = "cover";
  slide.style.backgroundPosition = "center";

  // Ajouter le contenu texte
  caption.innerHTML = `
    <h2>${article.title}</h2>
    <p>${article.extraitComplet || article.excerpt}</p>
    <a href="https://pastoa.github.io/actualites/article.html?id=${article.slug}" class="btn-une">➤ Lire la suite</a>
  `;
}


    const actusContainer = document.querySelector(".actus-container");
    if (!actusContainer) return;

    const articlePrincipal = articles[1];
    const articlesSecondaires = articles.slice(2, 5);

    actusContainer.innerHTML = `
      <div class="actu-principale">
        <img src="${articlePrincipal.image}" alt="${articlePrincipal.title}">
        <h3>${articlePrincipal.title}</h3>
        <p class="date">${formatDate(articlePrincipal.date)}</p>
        <p>${getExtraitComplet(articlePrincipal.excerpt, 5)}</p>
        <a href="https://pastoa.github.io/actualites/article.html?id=${articlePrincipal.slug}" class="read-more">LIRE LA SUITE</a>
      </div>
      <div class="actu-secondaires">
        ${articlesSecondaires.map((article) => `
          <div class="actu">
            <h4>${article.title}</h4>
            <p class="date">${formatDate(article.date)}</p>
            <p>${getExtraitComplet(article.excerpt, 3)}</p>
            <a href="https://pastoa.github.io/actualites/article.html?id=${article.slug}" class="read-more">LIRE LA SUITE</a>
          </div>
        `).join("")}
      </div>
    `;
  })
  .catch((error) => console.error("Erreur de chargement des articles :", error));

function getExtraitComplet(texte, nbLignes) {
  const phrases = texte.split(".");
  const extraits = phrases.slice(0, nbLignes).map(p => p.trim()).filter(Boolean);
  return extraits.join(". ") + (extraits.length ? "." : "");
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}.${mm}.${yyyy}`;
}





