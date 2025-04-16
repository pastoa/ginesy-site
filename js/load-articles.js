// Fonction pour charger les articles
async function loadArticles() {
  try {
    const response = await fetch('articles.json');
    const articles = await response.json();

    if (!articles.length) return;

    // === IMAGE DE UNE sous le header ===
    const une = articles[0];
    const uneContainer = document.querySelector('.slider');
    if (uneContainer) {
      uneContainer.innerHTML = `
        <div class="slide" style="background-image: url('${une.image}')">
          <div class="slider-caption">
            <h2>${une.title}</h2>
            <p>${une.excerpt.split('\n').slice(0, 5).join(' ')}</p>
            <span class="arrow">➤</span>
          </div>
        </div>
      `;
    }

    // === ACTUALITÉS (article principal + 3 actus empilées) ===
    const actuContainer = document.querySelector('.actus-container');
    if (actuContainer) {
      // Article principal (2e article)
      const principal = articles[1];
      let html = `
        <div class="actu-principale">
          <img src="${principal.image}" alt="${principal.title}">
          <h3>${principal.title}</h3>
          <p class="date">${principal.date}</p>
          <p>${principal.excerpt.split('\n').slice(0, 5).join(' ')}</p>
          <a href="post/${principal.slug}.html" class="read-more">Lire la suite</a>
        </div>
      `;

      // 3 articles secondaires (articles 3 à 5)
      html += `<div class="actu-secondaires">`;
      for (let i = 2; i < Math.min(5, articles.length); i++) {
        const a = articles[i];
        html += `
          <div class="actu">
            <h4>${a.title}</h4>
            <p class="date">${a.date}</p>
            <p>${a.excerpt.split('\n').slice(0, 2).join(' ')}</p>
            <a href="post/${a.slug}.html" class="read-more">Lire la suite</a>
          </div>
        `;
      }
      html += `</div>`;

      actuContainer.innerHTML = html;
    }
  } catch (err) {
    console.error("Erreur de chargement des articles :", err);
  }
}

// Appel de la fonction au chargement
document.addEventListener("DOMContentLoaded", loadArticles);
