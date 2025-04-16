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
            <p>${une.excerpt.split('\n').slice(0, 3).join(' ')}</p>
            <div class="arrow-wrapper">
              <span class="arrow">➤</span>
              <a href="post/${une.slug}.html" class="cta-une">Lire la suite</a>
            </div>
          </div>
        </div>
      `;
    }

    // === ACTUALITÉS (article principal + 3 actus empilées) ===
    const actuContainer = document.querySelector('.actus-container');
    if (actuContainer) {
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

      html += `<div class="actu-secondaires">`;
      for (let i = 2; i < Math.min(5, articles.length); i++) {
        const a = articles[i];
        html += `
          <div class="actu secondaire">
            <h4>${a.title}</h4>
            <p class="date date-secondaire">${a.date}</p>
            <p>${a.excerpt.split('\n').slice(0, 2).join(' ')}</p>
            <a href="post/${a.slug}.html" class="read-more">Lire la suite</a>
          </div>
        `;
      }
      html += `</div>`;

      actuContainer.innerHTML = html;
    }

    // === Mise à jour du lien "Toute l'actualité"
    const actuLink = document.querySelector('.actu-lien');
    if (actuLink) {
      actuLink.textContent = "Toute l'actualité";
      actuLink.href = "https://pastoa.github.io/actualites/";
    }

  } catch (err) {
    console.error("Erreur de chargement des articles :", err);
  }
}

document.addEventListener("DOMContentLoaded", loadArticles);

