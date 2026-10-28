/* =========================================
   STUDYNOVA — app.js
========================================= */

const SITE_NAME = "StudyNova";
const TOOLS_PER_PAGE = 9;

let currentPage = 1;
let currentSearch = "";
let currentCategory = "all";
let currentPrice = "all";

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-btn");
const toolsGrid = document.getElementById("toolsGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const clearFilters = document.getElementById("clearFilters");
const resultsCount = document.getElementById("resultsCount");
const pagination = document.getElementById("pagination");
const toolsCount = document.getElementById("toolsCount");

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showPage(pageId) {
  const target = document.getElementById(pageId);

  if (!target) return;

  pages.forEach(page => page.classList.remove("active"));
  target.classList.add("active");

  navButtons.forEach(button => {
    const isActive = button.dataset.page === pageId;
    button.classList.toggle("active", isActive);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getFilteredTools() {
  const search = currentSearch.toLowerCase().trim();

  return aiTools.filter(tool => {
    const matchSearch =
      !search ||
      tool.name.toLowerCase().includes(search) ||
      tool.description.toLowerCase().includes(search) ||
      tool.category.toLowerCase().includes(search);

    const matchCategory =
      currentCategory === "all" ||
      tool.category === currentCategory;

    const matchPrice =
      currentPrice === "all" ||
      tool.pricing === currentPrice;

    return matchSearch && matchCategory && matchPrice;
  });
}

function createToolCard(tool) {
  const link = tool.affiliateUrl || tool.website;
  const isAffiliate = Boolean(tool.affiliateUrl);

  const card = document.createElement("article");
  card.className = "tool-card";

  card.innerHTML = `
    <div class="tool-head">
      <div class="tool-logo">
        <img src="${escapeHTML(tool.image)}" alt="${escapeHTML(tool.name)} logo" loading="lazy">
      </div>
      <div>
        <div class="tool-name">${escapeHTML(tool.name)}</div>
        <div class="tool-company">${escapeHTML(tool.company)}</div>
      </div>
    </div>

    <p class="tool-desc">${escapeHTML(tool.description)}</p>

    <div class="tool-meta">
      <span class="chip">${escapeHTML(getCategoryLabel(tool.category))}</span>
      <span class="chip">${escapeHTML(tool.pricing)}</span>
    </div>

    <div class="tool-actions">
      <a
        class="tool-link"
        href="${escapeHTML(link)}"
        target="_blank"
        rel="${isAffiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}"
      >
        Visiter le site
      </a>
    </div>
  `;

  return card;
}

function getCategoryLabel(category) {
  const labels = {
    etudes: "Études",
    redaction: "Rédaction",
    presentation: "Présentation",
    traduction: "Traduction",
    maths: "Maths",
    organisation: "Organisation"
  };

  return labels[category] || category;
}

function renderTools() {
  const filtered = getFilteredTools();
  const totalPages = Math.max(1, Math.ceil(filtered.length / TOOLS_PER_PAGE));

  if (currentPage > totalPages) currentPage = 1;

  const start = (currentPage - 1) * TOOLS_PER_PAGE;
  const visibleTools = filtered.slice(start, start + TOOLS_PER_PAGE);

  toolsGrid.innerHTML = "";

  if (!visibleTools.length) {
    toolsGrid.innerHTML = `
      <p class="results-count">
        Aucun outil trouvé. Essaie un autre mot-clé ou réinitialise les filtres.
      </p>
    `;
  } else {
    visibleTools.forEach(tool => toolsGrid.appendChild(createToolCard(tool)));
  }

  resultsCount.textContent = `${filtered.length} outil(s) trouvé(s)`;
  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  pagination.innerHTML = "";

  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.className = `page-btn ${i === currentPage ? "active" : ""}`;
    button.textContent = i;

    button.addEventListener("click", () => {
      currentPage = i;
      renderTools();
      document.getElementById("tools").scrollIntoView({ behavior: "smooth" });
    });

    pagination.appendChild(button);
  }
}

function initNavigation() {
  document.querySelectorAll("[data-page]").forEach(element => {
    element.addEventListener("click", event => {
      event.preventDefault();

      const pageId = element.dataset.page;
      showPage(pageId);

      const need = element.dataset.need;

      if (need) {
        currentSearch = need;
        currentCategory = "all";
        currentPrice = "all";
        currentPage = 1;

        searchInput.value = need;
        categoryFilter.value = "all";
        priceFilter.value = "all";

        renderTools();
      }
    });
  });
}

function initFilters() {
  if (!searchInput) return;

  searchInput.addEventListener("input", () => {
    currentSearch = searchInput.value;
    currentPage = 1;
    renderTools();
  });

  categoryFilter.addEventListener("change", () => {
    currentCategory = categoryFilter.value;
    currentPage = 1;
    renderTools();
  });

  priceFilter.addEventListener("change", () => {
    currentPrice = priceFilter.value;
    currentPage = 1;
    renderTools();
  });

  clearFilters.addEventListener("click", () => {
    currentSearch = "";
    currentCategory = "all";
    currentPrice = "all";
    currentPage = 1;

    searchInput.value = "";
    categoryFilter.value = "all";
    priceFilter.value = "all";

    renderTools();
  });
}

function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  const email = document.getElementById("newsletterEmail");
  const message = document.getElementById("newsletterMessage");

  form.addEventListener("submit", event => {
    event.preventDefault();

    const subscribers = JSON.parse(localStorage.getItem("studynova_subscribers") || "[]");
    subscribers.push({
      email: email.value,
      date: new Date().toISOString()
    });

    localStorage.setItem("studynova_subscribers", JSON.stringify(subscribers));

    message.textContent = "Merci ! Ton inscription a été enregistrée.";
    form.reset();
  });
}

function initContact() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactMessageStatus");

  form.addEventListener("submit", event => {
    event.preventDefault();

    const messages = JSON.parse(localStorage.getItem("studynova_messages") || "[]");

    messages.push({
      name: document.getElementById("contactName").value,
      email: document.getElementById("contactEmail").value,
      message: document.getElementById("contactMessage").value,
      date: new Date().toISOString()
    });

    localStorage.setItem("studynova_messages", JSON.stringify(messages));

    status.textContent = "Message envoyé. Merci pour ton retour !";
    form.reset();
  });
}

function initWebsite() {
  document.getElementById("year").textContent = new Date().getFullYear();

  if (toolsCount) {
    toolsCount.textContent = aiTools.length;
  }

  initNavigation();
  initFilters();
  initNewsletter();
  initContact();
  renderTools();
  showPage("home");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initWebsite, { once: true });
} else {
  initWebsite();
}