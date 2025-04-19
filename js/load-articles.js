function formatDateFR(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
}

function extractSentences(content, maxSentences = 3) {
  const sentences = content.split('.').filter(s => s.trim() !== '');
  const trimmed = sentences.slice(0, maxSentences).join('. ') + '.';
  return trimmed;
}

const lireSuite = document.createElement("a");
lireSuite.className = "read-more";
lireSuite.textContent = "LIRE LA SUITE";
lireSuite.href = `article.html?id=${article.id}`;
texte.appendChild(lireSuite);


fetch("https://pastoa.github.io/actualites/articles.json")
  .then(response => response.json())
  .then(articles => {
    articles.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 🎯 Image de UNE (article 0)
const une = articles[0];

// Bloc texte de l’image de une
const slider = document.querySelector(".slider");
if (slider) {
  slider.style.backgroundImage = `url(${une.image})`;

  }

  caption.innerHTML = `
    <h2>${une.title}</h2>
    <p>${extractSentences(une.excerpt || une.content, 3)}</p>
    <span class="arrow">➤</span>
    <a href="https://pastoa.github.io/actualites/article.html?id=${une.id}" class="read-more">Lire la suite</a>
  `;



    // 🎯 Bloc actualité principale (article 1)
    const principale = articles[1];
    const principaleBloc = document.querySelector(".actu-principale");
    if (principaleBloc) {
      principaleBloc.innerHTML = `
        <img src="${principale.image}" alt="${principale.title}">
        <h3>${principale.title}</h3>
        <p class="date">${formatDateFR(principale.date)}</p>
        <p class="excerpt">${extractSentences(principale.excerpt || principale.content, 5)}</p>
        <a href="https://pastoa.github.io/actualites/article.html?id=${principale.id}" class="read-more">LIRE LA SUITE</a>
      `;
    }

    // 🎯 Actus secondaires (articles 2, 3, 4)
    const secondaires = articles.slice(2, 5);
    const secondairesContainer = document.querySelector(".actu-secondaires");
    if (secondairesContainer) {
      secondairesContainer.innerHTML = "";
      secondaires.forEach(article => {
        const bloc = document.createElement("div");
        bloc.className = "actu";
        bloc.innerHTML = `
          <h4>${article.title}</h4>
          <p class="date">${formatDateFR(article.date)}</p>
          <p class="excerpt">${extractSentences(article.excerpt || article.content, 3)}</p>
          <a href="https://pastoa.github.io/actualites/article.html?id=${article.id}" class="read-more">Lire la suite</a>
        `;
        secondairesContainer.appendChild(bloc);
      });
    }
  })
  .catch(error => {
    console.error("Erreur de chargement des articles :", error);
  });


