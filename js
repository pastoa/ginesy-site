async function fetchArticles() {
  const res = await fetch("https://pastoa.github.io/actualites/articles.json");
  const articles = await res.json();
  return articles;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

function renderArticles(articles) {
  const [une, principale, ...secondaires] = articles;

  // Bloc image à la une (sous le header)
  document.getElementById("image-a-la-une").innerHTML = `
    <div class="slide" style="background-image: url('${une.image}')">
      <div class="slider-caption">
        <h2>${une.title}</h2>
        <p>${une.excerpt}</p>
        <span class="arrow">➤</span>
      </div>
    </div>
  `;

  // Bloc actualité principale
  document.getElementById("actu-principale").innerHTML = `
    <img src="${principale.image}" alt="${principale.title}">
    <h3>${principale.title}</h3>
    <p class="date">${formatDate(principale.date)}</p>
    <p>${principale.excerpt}</p>
    <a href="actualites.html#${principale.slug}" class="read-more">Lire la suite</a>
  `;

  // Blocs empilés
  document.getElementById("actu-secondaires").innerHTML = secondaires.slice(0, 3).map(article => `
    <div class="actu">
      <h4>${article.title}</h4>
      <p class="date">${formatDate(article.date)}</p>
      <p>${article.excerpt.split(' ').slice(0, 15).join(' ')}...</p>
      <a href="actualites.html#${article.slug}" class="read-more">Lire la suite</a>
    </div>
  `).join("");
}

fetchArticles().then(renderArticles);
