function getExtraitComplet(contenu, maxPhrases) {
  if (!contenu || typeof contenu !== "string") return "";
  const phrases = contenu.split(/[.!?]\s/);
  return phrases.slice(0, maxPhrases).join(".") + ".";
}

fetch("https://pastoa.github.io/actualites/articles.json")
  .then((res) => res.json())
  .then((articles) => {
    if (!articles || !articles.length) return;

    const articleUne = articles[0]; // Le plus récent
    const actus = articles.slice(1, 5); // 4 actus suivantes

    afficherArticleUne(articleUne);
    afficherActusSecondaires(actus);
  })
  .catch((error) => console.error("Erreur de chargement des articles :", error));

// Article de une
function afficherArticleUne(article) {
  const slide = document.querySelector(".slide");
  if (slide && article.image) {
    slide.style.backgroundImage = `url('${article.image}')`;
    const imgMobile = document.getElementById('slider-mobile-img');
    if (imgMobile) {
  imgMobile.src = article.image;
}

  }

  const titreUne = document.getElementById("titre-une");
  const extraitUne = document.getElementById("extrait-une");
  const boutonUne = document.getElementById("btn-une");

  if (titreUne) titreUne.textContent = article.title || "";
  if (extraitUne) extraitUne.textContent = getExtraitComplet(article.excerpt, 3);
  if (boutonUne) boutonUne.href = `https://pastoa.github.io/actualites/article.html?id=${article.id}`;
}

// Articles secondaires
function afficherActusSecondaires(articles) {
  const actuPrincipale = document.querySelector(".actu-principale");
  const actuSecondaires = document.querySelector(".actu-secondaires");

  if (!actuPrincipale || !actuSecondaires) return;

  const article1 = articles[0];
  actuPrincipale.innerHTML = `
    <img src="${article1.image}" alt="${article1.title}">
    <h3>${article1.title}</h3>
    <p class="date">${formatDateFr(article1.date)}</p>
    <p>${getExtraitComplet(article1.excerpt, 5)}</p>
    <a href="https://pastoa.github.io/actualites/article.html?id=${article1.id}" class="read-more">LIRE LA SUITE</a>
  `;

  actuSecondaires.innerHTML = "";

  for (let i = 1; i < articles.length; i++) {
    const article = articles[i];
    const div = document.createElement("div");
    div.classList.add("actu");
    div.innerHTML = `
      <h4>${article.title}</h4>
      <p class="date">${formatDateFr(article.date)}</p>
      <p>${getExtraitComplet(article.excerpt, 5)}</p>
      <a href="https://pastoa.github.io/actualites/article.html?id=${article.id}" class="read-more">LIRE LA SUITE</a>
    `;
    actuSecondaires.appendChild(div);
  }
}

// Format de date FR type 05.05.2025
function formatDateFr(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}


