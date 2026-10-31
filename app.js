document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const navButtons = document.querySelectorAll(".nav-btn");
  const toolsGrid = document.getElementById("toolsGrid");
  const resultsCount = document.getElementById("resultsCount");
  const pagination = document.getElementById("pagination");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const priceFilter = document.getElementById("priceFilter");
  const clearFilters = document.getElementById("clearFilters");

  let currentPage = 1;
  const toolsPerPage = 6;
  let activeNeed = "";

  function showPage(pageId) {
    pages.forEach(page => page.classList.remove("active"));

    const target = document.getElementById(pageId);
    if (!target) return;

    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });

    navButtons.forEach(button => {
      const isActive = button.dataset.page === pageId;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-current", isActive ? "page" : "false");
    });
  }

  document.addEventListener("click", event => {
    const pageButton = event.target.closest("[data-page]");
    if (!pageButton) return;

    const pageId = pageButton.dataset.page;
    const need = pageButton.dataset.need;

    if (need) {
      activeNeed = need;
      currentPage = 1;

      if (searchInput) searchInput.value = "";
      if (categoryFilter) categoryFilter.value = "all";
      if (priceFilter) priceFilter.value = "all";

      renderTools();
    }

    showPage(pageId);
  });

  function getFilteredTools() {
    const search = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const category = categoryFilter ? categoryFilter.value : "all";
    const price = priceFilter ? priceFilter.value : "all";

    return tools.filter(tool => {
      const matchSearch =
        !search ||
        tool.name.toLowerCase().includes(search) ||
        tool.description.toLowerCase().includes(search);

      const matchCategory = category === "all" || tool.category === category;
      const matchPrice = price === "all" || tool.price === price;

      const matchNeed =
        !activeNeed ||
        (tool.needs && tool.needs.some(need =>
          need.toLowerCase().includes(activeNeed.toLowerCase())
        ));

      return matchSearch && matchCategory && matchPrice && matchNeed;
    });
  }

  function renderTools() {
    if (!toolsGrid) return;

    const filtered = getFilteredTools();
    const totalPages = Math.max(1, Math.ceil(filtered.length / toolsPerPage));

    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * toolsPerPage;
    const visibleTools = filtered.slice(start, start + toolsPerPage);

    toolsGrid.innerHTML = "";

    if (visibleTools.length === 0) {
      toolsGrid.innerHTML = `
        <div class="empty-state">
          <h3>Aucun outil trouvé</h3>
          <p>Essaie une autre recherche ou réinitialise les filtres.</p>
        </div>
      `;
    } else {
      visibleTools.forEach(tool => {
        const card = document.createElement("article");
        card.className = "tool-card";

        card.innerHTML = `
          <div class="tool-top">
            <h3>${tool.name}</h3>
            <span class="price-badge ${tool.price}">${getPriceLabel(tool.price)}</span>
          </div>

          <p>${tool.description}</p>

          <div class="tool-tags">
            ${tool.needs.map(need => `<span>${need}</span>`).join("")}
          </div>

          <a
            class="btn primary tool-link"
            href="${tool.url}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visiter le site officiel
          </a>
        `;

        toolsGrid.appendChild(card);
      });
    }

    if (resultsCount) {
      resultsCount.textContent = `${filtered.length} outil(s) trouvé(s)`;
    }

    renderPagination(totalPages);
  }

  function getPriceLabel(price) {
    if (price === "free") return "Gratuit";
    if (price === "freemium") return "Freemium";
    return "Payant";
  }

  function renderPagination(totalPages) {
    if (!pagination) return;

    pagination.innerHTML = "";

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.className = `page-btn ${i === currentPage ? "active" : ""}`;
      button.textContent = i;

      button.addEventListener("click", () => {
        currentPage = i;
        renderTools();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      pagination.appendChild(button);
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      activeNeed = "";
      currentPage = 1;
      renderTools();
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener("change", () => {
      activeNeed = "";
      currentPage = 1;
      renderTools();
    });
  }

  if (priceFilter) {
    priceFilter.addEventListener("change", () => {
      activeNeed = "";
      currentPage = 1;
      renderTools();
    });
  }

  if (clearFilters) {
    clearFilters.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (categoryFilter) categoryFilter.value = "all";
      if (priceFilter) priceFilter.value = "all";

      activeNeed = "";
      currentPage = 1;
      renderTools();
    });
  }

  const toolsCount = document.getElementById("toolsCount");
  if (toolsCount) {
    toolsCount.textContent = tools.length + "+";
  }

const newsletterForm = document.getElementById("newsletterForm");
const newsletterMessage = document.getElementById("newsletterMessage");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", async event => {
    event.preventDefault();

    newsletterMessage.textContent = "Envoi en cours…";
    newsletterMessage.classList.remove("success");

    try {
      const response = await fetch(newsletterForm.action, {
        method: "POST",
        body: new FormData(newsletterForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        newsletterMessage.textContent = "Merci ! Ton inscription a bien été enregistrée.";
        newsletterMessage.classList.add("success");
        newsletterForm.reset();
      } else {
        newsletterMessage.textContent = "Une erreur est survenue. Réessaie plus tard.";
      }
    } catch (error) {
      newsletterMessage.textContent = "Une erreur est survenue. Réessaie plus tard.";
    }
  });
}

  const contactForm = document.getElementById("contactForm");
  const contactMessageStatus = document.getElementById("contactMessageStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();

      contactMessageStatus.textContent = "Merci ! Ton message a bien été envoyé.";
      contactMessageStatus.classList.add("success");
      contactForm.reset();
    });
  }

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  renderTools();
  showPage("home");
});
