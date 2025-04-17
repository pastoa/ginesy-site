fetch("articles.json")
  .then((response) => response.json())
  .then((articles) => {
    if (!articles || articles.length === 0) return;

    // Fonction pour formater la date
    function formatDate(dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }

    // Fonction pour tronquer à un nombre de phrases
    function truncateBySentences(text, maxSentences) {
      const sentences = text.split(/(?<=[.!?])\s+/);
      return sentences.slice(0, maxSentences).join(" ");
    }

    // 👉 1. Actu de UNE : article[0]
    const une = articles[0];
    const uneContainer = document.getElementById("image-une-dynamique");
    if (une && uneContainer) {
      uneContainer.innerHTML = `
        <img src="${une.image}" alt="${une.title}">
        <div class="slider-caption">
          <h2>${une.title}</h2>
          <p>${truncateBySentences(une.excerpt, 3)}</p>
          <span class="arrow">➤</span>
          <a class="btn-lire-suite" href="${une.link}">Lire la suite</a>
        </div>
      `;
    }

    // 👉 2. Bloc actualités :
    const actuPrincipale = articles[1];
    const secondaires = articles.slice(2, 5);
    const actuPrincipaleContainer = document.getElementById("actu-principale-dynamique");
    const secondairesContainer = document.getElementById("bloc-actus-secondaires");

    if (actuPrincipale && actuPrincipaleContainer) {
      actuPrincipaleContainer.innerHTML = `
        <img src="${actuPrincipale.image}" alt="${actuPrincipale.title}">
        <div class="texte-actu-principale">
          <h3>${actuPrincipale.title}</h3>
          <p class="date">${formatDate(actuPrincipale.date)}</p>
          <p>${truncateBySentences(actuPrincipale.excerpt, 5)}</p>
          <a href="${actuPrincipale.link}" class="read-more">Lire la suite</a>
        </div>
      `;
    }

    if (secondaires && secondairesContainer) {
      secondaires.forEach((article) => {
        const div = document.createElement("div");
        div.className = "actu";
        div.innerHTML = `
          <h4>${article.title}</h4>
          <p class="date">${formatDate(article.date)}</p>
          <p>${truncateBySentences(article.excerpt, 2)}</p>
          <a href="${article.link}" class="read-more">Lire la suite</a>
        `;
        secondairesContainer.appendChild(div);
      });
    }
  })
  .catch((error) => console.error("Erreur de chargement des articles :", error));



