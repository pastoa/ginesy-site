function formatDateFR(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function truncateExcerpt(text, maxSentences) {
  const sentences = text.split('.').map(s => s.trim()).filter(Boolean);
  return sentences.slice(0, maxSentences).join('. ') + (sentences.length > maxSentences ? '.' : '');
}

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
            <p>${truncateExcerpt(une.excerpt, 3)}</p>
            <div class="arrow-wrapper">
              <span class="arrow">➤</span>
              <a href="post/${une.slug}.html" class="cta-une">Lire la suite</a>
            </div>
          </div>
        </div>
      `;
    }

    // === ACTUALITÉS (bloc de la page d'accueil)
    const actuContainer = document.querySelector('.actus-container');
    if (actuContainer && articles.length >= 5) {
      const principal = articles[1];
      let html = `
        <div class="actu-principale">
          <img src="${principal.image}" alt="${principal.title}">
          <h3>${principal.title}</h3>
          <p class="date">${formatDateFR(principal.date)}</p>
          <p>${truncateExcerpt(principal.excerpt, 5)}</p>
          <a href="post/${principal.slug}.html" class="read-more">Lire la suite</a>
        </div>
        <div class="actu-secondaires">
      `;

      for (let i = 2; i < Math.min(5, articles.length); i++) {
        const a = articles[i];
        html += `
          <div class="actu secondaire">
            <h4>${a.title}</h4>
            <p class="date date-secondaire">${formatDateFR(a.date)}</p>
            <p>${truncateExcerpt(a.excerpt, 3)}</p>
            <a href="post/${a.slug}.html" class="read-more">Lire la suite</a>
          </div>
        `;
      }

      html += `</div>`;
      actuContainer.innerHTML = html;
    }

    // === Lien "Toute l’actualité" en haut à droite
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


