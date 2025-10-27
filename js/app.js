document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");
  const main = document.querySelector("main");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.getAttribute("href").replace(".html", "");
      loadPage(page);
    });
  });

  async function loadPage(page) {
    try {
      const response = await fetch(`${page}.html`);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      const section = doc.querySelector("main").innerHTML;
      main.innerHTML = section;
      window.history.pushState({}, "", `${page}.html`);
    } catch (err) {
      main.innerHTML = `<p>Erro ao carregar a página.</p>`;
    }
  }
});
