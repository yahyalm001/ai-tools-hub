document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  const $ = id => document.getElementById(id);
  const pages = [...document.querySelectorAll(".page")];
  const navButtons = [...document.querySelectorAll(".nav-btn")];
  const catalog = typeof tools !== "undefined" && Array.isArray(tools) ? tools : [];
  const grid = $("toolsGrid");
  const search = $("searchInput");
  const category = $("categoryFilter");
  const price = $("priceFilter");
  const sort = $("sortFilter");
  const categories = { etudes: "Études et recherche", redaction: "Rédaction", presentation: "Présentation", traduction: "Traduction", maths: "Maths", organisation: "Organisation" };
  const prices = { free: "Gratuit", freemium: "Gratuit + options payantes", paid: "Payant" };
  const normalize = value => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let currentPage = 1;
  let activeNeed = "";
  const perPage = 9;
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function safeUrl(value) {
    try { const u = new URL(value); return u.protocol === "https:" ? u.href : null; } catch { return null; }
  }
  function showPage(id, updateHash = true, scroll = true) {
    const target = pages.find(page => page.id === id);
    if (!target) return false;
    pages.forEach(page => {
      const active = page === target;
      page.classList.toggle("active", active);
      page.hidden = !active;
    });
    const parent = id.startsWith("guide") ? "guides" : id;
    navButtons.forEach(button => {
      const active = button.dataset.page === parent;
      button.classList.toggle("active", active);
      if (active) button.setAttribute("aria-current", "page"); else button.removeAttribute("aria-current");
    });
    if (updateHash && location.hash !== `#${id}`) history.pushState(null, "", `#${id}`);
    if (scroll) {
      window.scrollTo({top: 0, behavior: reducedMotion ? "auto" : "smooth"});
      const heading = target.querySelector("h1, h2");
      if (heading) { heading.setAttribute("tabindex", "-1"); heading.focus({preventScroll: true}); }
    }
    return true;
  }
  function filteredTools() {
    const query = normalize(search?.value);
    let result = catalog.filter(tool => {
      const needs = Array.isArray(tool.needs) ? tool.needs : [];
      const text = normalize([tool.name, tool.description, categories[tool.category], ...needs].join(" "));
      return (!query || query.split(/\s+/).every(word => text.includes(word))) &&
        (!category || category.value === "all" || tool.category === category.value) &&
        (!price || price.value === "all" || tool.price === price.value) &&
        (!activeNeed || needs.some(need => normalize(need) === normalize(activeNeed)));
    });
    if (sort?.value === "az") result.sort((a,b) => a.name.localeCompare(b.name, "fr"));
    if (sort?.value === "free") {
      const ranks = {free: 0, freemium: 1, paid: 2};
      result.sort((a,b) => (ranks[a.price] ?? 3) - (ranks[b.price] ?? 3) || a.name.localeCompare(b.name, "fr"));
    }
    return result;
  }
  function createCard(tool) {
    const card = element("article", "tool-card");
    const top = element("div", "tool-top");
    const brand = element("div", "tool-brand");
    const logo = element("div", "tool-logo");
    const fallback = element("span", "tool-logo-fallback", tool.name.slice(0,2).toUpperCase());
    fallback.setAttribute("aria-hidden", "true");
    logo.append(fallback);
    const imageUrl = safeUrl(tool.image);
    if (imageUrl) {
      const image = element("img", "tool-image");
      image.alt = "";
      image.width = 48; image.height = 48;
      image.loading = "lazy"; image.decoding = "async"; image.referrerPolicy = "no-referrer";
      image.hidden = true;
      image.addEventListener("load", () => { if (image.naturalWidth) { image.hidden = false; fallback.hidden = true; } });
      image.addEventListener("error", () => { image.remove(); fallback.hidden = false; }, {once:true});
      image.src = imageUrl;
      logo.append(image);
    }
    const title = element("div", "tool-heading");
    title.append(element("h3", "", tool.name), element("span", "tool-category", categories[tool.category] || "Outil"));
    brand.append(logo, title); top.append(brand);
    const badge = element("span", `price-badge ${["free","freemium","paid"].includes(tool.price) ? tool.price : "paid"}`, prices[tool.price] || "Voir les tarifs");
    const tags = element("div", "tool-tags");
    (Array.isArray(tool.needs) ? tool.needs : []).forEach(need => tags.append(element("span", "", need)));
    card.append(top, badge, element("p", "tool-description", tool.description), tags);
    if (tool.note) card.append(element("p", "tool-note", tool.note));
    const url = safeUrl(tool.url);
    if (url) {
      const link = element("a", "btn primary tool-link", "Visiter le site officiel ↗");
      link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `Ouvrir ${tool.name} — nouvel onglet`);
      card.append(link);
    }
    return card;
  }
  function resetFilters() {
    if (search) search.value = "";
    if (category) category.value = "all";
    if (price) price.value = "all";
    if (sort) sort.value = "default";
    activeNeed = ""; currentPage = 1; renderTools();
  }
  function renderTools() {
    if (!grid) return;
    const filtered = filteredTools();
    const total = Math.max(1, Math.ceil(filtered.length / perPage));
    currentPage = Math.min(Math.max(currentPage, 1), total);
    grid.replaceChildren();
    if (!filtered.length) {
      const empty = element("div", "empty-state");
      empty.append(element("h3", "", "Aucun outil trouvé"), element("p", "", "Essaie un mot plus simple ou réinitialise les filtres."));
      const button = element("button", "btn ghost", "Réinitialiser"); button.type = "button";
      button.addEventListener("click", resetFilters); empty.append(button); grid.append(empty);
    } else filtered.slice((currentPage-1)*perPage,currentPage*perPage).forEach(tool => grid.append(createCard(tool)));
    if ($("resultsCount")) $("resultsCount").textContent = `${filtered.length} outil${filtered.length === 1 ? "" : "s"} trouvé${filtered.length === 1 ? "" : "s"} sur ${catalog.length}`;
    if ($("activeNeedLabel")) {
      $("activeNeedLabel").textContent = activeNeed ? `Besoin sélectionné : ${activeNeed}` : "";
      $("activeNeedLabel").hidden = !activeNeed;
    }
    const pagination = $("pagination");
    if (!pagination) return;
    pagination.replaceChildren();
    if (total <= 1) return;
    function pageButton(label, number, disabled = false) {
      const button = element("button", "page-btn", label); button.type = "button"; button.disabled = disabled;
      if (number === currentPage && /^\d+$/.test(label)) { button.classList.add("active"); button.setAttribute("aria-current","page"); }
      button.setAttribute("aria-label", /^\d+$/.test(label) ? `Page ${number}` : label);
      button.addEventListener("click", () => {
        currentPage = number; renderTools();
        const heading = $("toolsTitle");
        if (heading) { heading.focus({preventScroll:true}); heading.scrollIntoView({behavior: reducedMotion ? "auto" : "smooth", block:"start"}); }
      });
      pagination.append(button);
    }
    pageButton("Précédent", currentPage-1, currentPage === 1);
    for (let i=1;i<=total;i++) pageButton(String(i),i);
    pageButton("Suivant",currentPage+1,currentPage===total);
  }
  document.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest("[data-page]");
    if (!button) return;
    if (button.tagName === "A" && (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)) return;
    const id = button.dataset.page;
    if (!pages.some(page => page.id === id)) return;
    event.preventDefault();
    if (button.dataset.need) {
      activeNeed = button.dataset.need; currentPage = 1;
      if (search) search.value = "";
      if (category) category.value = "all";
      if (price) price.value = "all";
      renderTools();
    } else if (id === "tools") resetFilters();
    showPage(id);
  });
  window.addEventListener("hashchange", () => showPage(location.hash.slice(1) || "home", false));
  search?.addEventListener("input", () => { activeNeed="";currentPage=1;renderTools(); });
  category?.addEventListener("change", () => { activeNeed="";currentPage=1;renderTools(); });
  price?.addEventListener("change", () => { currentPage=1;renderTools(); });
  sort?.addEventListener("change", () => { currentPage=1;renderTools(); });
  $("clearFilters")?.addEventListener("click", resetFilters);
  function handleFormSubmission(formId, statusId, successMessage) {
    const form = $(formId), status = $(statusId);
    if (!form || !status) return;
    let sending = false;
    form.addEventListener("submit", async event => {
      event.preventDefault();
      if (sending || !form.reportValidity()) return;
      sending = true;
      const submitButton = form.querySelector("button[type='submit']");
      const oldText = submitButton?.textContent;
      status.textContent = "Envoi en cours…"; status.classList.remove("success","error");
      status.setAttribute("aria-busy","true"); form.setAttribute("aria-busy","true");
      if (submitButton) {submitButton.disabled=true;submitButton.textContent="Envoi…";}
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 20000);
      try {
        const response = await fetch(form.action, {method:"POST",body:new FormData(form),headers:{Accept:"application/json"},signal:controller.signal});
        if (!response.ok) throw new Error("Envoi refusé");
        status.textContent=successMessage;status.classList.add("success");form.reset();
      } catch (error) {
        status.textContent=error.name === "AbortError" ? "Délai dépassé. Vérifie ta connexion et réessaie plus t
