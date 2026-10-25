/*=========================================
  DiscoveryTools
  app.js — Complete Updated Version
=========================================*/


// =============================
// GLOBAL STATE
// =============================

let pages = [];
let navButtons = [];
let categoryCards = [];
let pricingButtons = [];

let currentPage = 1;
let currentFilteredTools = [];

let selectedCategory = "all";
let selectedPricing = "all";
let selectedSort = "default";

const toolsPerPage = 20;


// =============================
// ELEMENTS
// =============================

let browseTools;
let browseToolsBottom;
let learnMore;

let featuredTitle;
let featuredDescription;
let featuredLink;
let featuredImage;
let featuredImageFallback;
let featuredCategory;
let featuredPricing;

let latestToolsGrid;
let toolsGrid;
let pagination;

let searchInput;
let sortSelect;
let clearFilters;
let resultsCount;

let cookieBanner;
let acceptCookies;
let rejectCookies;
let customizeCookies;

let cookieSettings;
let closeCookieSettings;
let analyticsCookies;
let advertisingCookies;
let saveCookiePreferences;

let suggestToolForm;


// =============================
// INITIALIZE ELEMENTS
// =============================

function cacheElements() {

    pages = document.querySelectorAll(".page");
    navButtons = document.querySelectorAll(".nav-btn");
    categoryCards = document.querySelectorAll(".category-card");
    pricingButtons = document.querySelectorAll(".pricing-btn");

    browseTools = document.getElementById("browseTools");
    browseToolsBottom = document.getElementById("browseToolsBottom");
    learnMore = document.getElementById("learnMore");

    featuredTitle = document.getElementById("featuredTitle");
    featuredDescription = document.getElementById("featuredDescription");
    featuredLink = document.getElementById("featuredLink");
    featuredImage = document.getElementById("featuredImage");
    featuredImageFallback = document.getElementById("featuredImageFallback");
    featuredCategory = document.getElementById("featuredCategory");
    featuredPricing = document.getElementById("featuredPricing");

    latestToolsGrid = document.getElementById("latestToolsGrid");
    toolsGrid = document.getElementById("toolsGrid");
    pagination = document.getElementById("pagination");

    searchInput = document.getElementById("searchInput");
    sortSelect = document.getElementById("sortSelect");
    clearFilters = document.getElementById("clearFilters");
    resultsCount = document.getElementById("resultsCount");

    cookieBanner = document.getElementById("cookieBanner");
    acceptCookies = document.getElementById("acceptCookies");
    rejectCookies = document.getElementById("rejectCookies");
    customizeCookies = document.getElementById("customizeCookies");

    cookieSettings = document.getElementById("cookieSettings");
    closeCookieSettings = document.getElementById("closeCookieSettings");
    analyticsCookies = document.getElementById("analyticsCookies");
    advertisingCookies = document.getElementById("advertisingCookies");
    saveCookiePreferences = document.getElementById("saveCookiePreferences");

    suggestToolForm = document.getElementById("suggestToolForm");
}


// =============================
// SAFE DATABASE CHECK
// =============================

function hasToolsDatabase() {
    return (
        typeof aiToolsDatabase !== "undefined" &&
        Array.isArray(aiToolsDatabase)
    );
}


// =============================
// PAGE NAVIGATION
// =============================

function showPage(pageId) {

    const requestedPage = document.getElementById(pageId);

    if (!requestedPage) {
        console.warn(`Page not found: ${pageId}`);
        return;
    }

    pages.forEach(page => {
        page.classList.remove("active");
    });

    requestedPage.classList.add("active");

    navButtons.forEach(button => {

        const isActive =
            button.dataset.page === pageId ||
            (
                pageId !== "home" &&
                pageId !== "homeSection" &&
                button.dataset.page === "home" &&
                (pageId === "home" || pageId === "homeSection")
            );

        button.classList.toggle("active", isActive);

        if (isActive) {
            button.setAttribute("aria-current", "page");
        } else {
            button.removeAttribute("aria-current");
        }

    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =============================
// GET HOME PAGE ID
// =============================

function getHomePageId() {

    if (document.getElementById("home")) {
        return "home";
    }

    if (document.getElementById("homeSection")) {
        return "homeSection";
    }

    return null;
}


// =============================
// NAVIGATION EVENTS
// =============================

function initNavigation() {

    navButtons.forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const pageId = button.dataset.page;

            if (pageId) {
                showPage(pageId);
            }

        });

    });

    if (browseTools) {
        browseTools.addEventListener("click", () => {
            showPage("categoriesSection");
        });
    }

    if (browseToolsBottom) {
        browseToolsBottom.addEventListener("click", () => {
            showPage("categoriesSection");
        });
    }

    if (learnMore) {
        learnMore.addEventListener("click", () => {
            showPage("about");
        });
    }

}


// =============================
// WEEKLY FEATURED TOOL
// =============================

function getWeeklyFeaturedId() {

    if (!hasToolsDatabase() || aiToolsDatabase.length === 0) {
        return null;
    }

    const startDate = new Date("2026-01-05T00:00:00");
    const today = new Date();

    const differenceInTime =
        today.getTime() - startDate.getTime();

    const daysPassed =
        Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

    const currentWeek =
        Math.floor(daysPassed / 7);

    const featuredIndex =
        (
            currentWeek % aiToolsDatabase.length +
            aiToolsDatabase.length
        ) % aiToolsDatabase.length;

    return aiToolsDatabase[featuredIndex].id;
}


// =============================
// SAFE WEBSITE FAVICON
// =============================

function getFaviconUrl(website) {

    try {
        const url = new URL(website);
        return `https://www.google.com/s2/favicons?sz=128&domain=${url.hostname}`;
    } catch (error) {
        return "";
    }

}


// =============================
// GET TOOL LINK
// =============================

function getToolLink(tool) {
    return tool.affiliateUrl || tool.website || "#";
}


function isAffiliateTool(tool) {
    return Boolean(tool.affiliateUrl);
}


// =============================
// ESCAPE HTML
// =============================

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// =============================
// CREATE TOOL CARD
// =============================

function createToolCard(tool) {

    const name =
        escapeHTML(tool.name || "AI Tool");

    const category =
        escapeHTML(tool.category || "AI");

    const company =
        escapeHTML(tool.company || "");

    const description =
        escapeHTML(tool.description || "AI tool");

    const visitLink =
        escapeHTML(getToolLink(tool));

    const linkRel =
        isAffiliateTool(tool)
            ? "sponsored noopener noreferrer"
            : "noopener noreferrer";

    const image =
        escapeHTML(
            tool.image ||
            getFaviconUrl(tool.website)
        );

    const pricing =
        String(tool.pricing || "").toLowerCase();

    const initial =
        name.trim().charAt(0).toUpperCase() || "?";

    const isFeatured =
        tool.id === getWeeklyFeaturedId();

    const pricingBadge =
        pricing
            ? `<span class="pricing-badge ${pricing}">${pricing.toUpperCase()}</span>`
            : "";

    const featuredBadge =
        isFeatured
            ? `<span class="featured-badge">🔥 Featured</span>`
            : "";

    const imageHTML =
        image
            ? `
                <img
                    src="${image}"
                    alt="${name} logo"
                    width="64"
                    height="64"
                    loading="lazy"
                    decoding="async"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                >

                <div
                    class="tool-image-fallback"
                    style="display:none;"
                    aria-hidden="true">
                    ${initial}
                </div>
              `
            : `
                <div
                    class="tool-image-fallback"
                    aria-hidden="true">
                    ${initial}
                </div>
              `;

    return `
        <article class="tool-card">

            <div class="tool-image">
                ${imageHTML}
            </div>

            <div class="tool-content">

                <div class="tool-top">
                    <span class="tool-category">${category}</span>
                    ${pricingBadge}
                    ${featuredBadge}
                </div>

                <h3>${name}</h3>

                <p>${description}</p>

                <div class="tool-card-footer">

                    <div class="tool-company">
                        <span class="company-icon" aria-hidden="true">✦</span>
                        <span class="company-label">By</span>
                        <strong>${company || "Independent Developer"}</strong>
                    </div>

                    <a
                        href="${visitLink}"
                        target="_blank"
                        rel="${linkRel}"
                        class="visit-btn">
                        Visit Website <span aria-hidden="true">→</span>
                    </a>

                </div>

            </div>

        </article>
    `;
}


// =============================
// FEATURED TOOL
// =============================

function loadFeaturedTool() {

    if (
        !featuredTitle ||
        !hasToolsDatabase() ||
        aiToolsDatabase.length === 0
    ) {
        return;
    }

    const featuredId = getWeeklyFeaturedId();

    const featured =
        aiToolsDatabase.find(
            tool => tool.id === featuredId
        ) || aiToolsDatabase[0];

    featuredTitle.textContent =
        featured.name || "AI Tool";

    if (featuredDescription) {
        featuredDescription.textContent =
            featured.description || "";
    }

    if (featuredLink) {
        featuredLink.href = getToolLink(featured);

        featuredLink.rel =
            isAffiliateTool(featured)
                ? "sponsored noopener noreferrer"
                : "noopener noreferrer";
    }

    if (featuredImage) {

        const toolName =
            featured.name || "AI Tool";

        const initial =
            toolName.trim().charAt(0).toUpperCase();

        const showImage = () => {
            featuredImage.style.display = "block";

            if (featuredImageFallback) {
                featuredImageFallback.hidden = true;
            }
        };

        const showFallback = () => {
            featuredImage.style.display = "none";

            if (featuredImageFallback) {
                featuredImageFallback.textContent = initial;
                featuredImageFallback.hidden = false;
            }
        };

        // Reset before loading a new image
        featuredImage.onload = null;
        featuredImage.onerror = null;

        featuredImage.onload = showImage;
        featuredImage.onerror = showFallback;

        featuredImage.src =
            featured.image ||
            getFaviconUrl(featured.website);

        featuredImage.alt =
            `${toolName} logo`;

        // If image is already cached/loaded
        if (featuredImage.complete && featuredImage.naturalWidth > 0) {
            showImage();
        }
    }

    if (featuredCategory) {
        featuredCategory.textContent =
            featured.category || "";
    }

    if (featuredPricing) {

        const pricing =
            String(featured.pricing || "").toLowerCase();

        featuredPricing.textContent =
            pricing.toUpperCase();

        featuredPricing.className =
            `pricing-badge ${pricing}`;
    }

}

// =============================
// LATEST TOOLS
// =============================

function loadLatestTools() {

    if (!latestToolsGrid || !hasToolsDatabase()) {
        return;
    }

    const latest =
        [...aiToolsDatabase]
            .slice(-6)
            .reverse();

    latestToolsGrid.innerHTML =
        latest.map(createToolCard).join("");

}


// =============================
// SORT TOOLS
// =============================

function sortTools(tools) {

    const sorted = [...tools];

    if (selectedSort === "az") {
        sorted.sort((a, b) =>
            String(a.name || "").localeCompare(String(b.name || ""))
        );
    }

    if (selectedSort === "za") {
        sorted.sort((a, b) =>
            String(b.name || "").localeCompare(String(a.name || ""))
        );
    }

    if (selectedSort === "free") {

        const order = {
            free: 0,
            freemium: 1,
            paid: 2
        };

        sorted.sort((a, b) => {
            const aValue = order[String(a.pricing || "").toLowerCase()] ?? 3;
            const bValue = order[String(b.pricing || "").toLowerCase()] ?? 3;
            return aValue - bValue;
        });
    }

    if (selectedSort === "featured") {

        const featuredId = getWeeklyFeaturedId();

        sorted.sort((a, b) =>
            Number(b.id === featuredId) - Number(a.id === featuredId)
        );
    }

    return sorted;
}


// =============================
// LOAD TOOLS
// =============================

function loadTools(
    category = selectedCategory,
    pricing = selectedPricing,
    page = 1
) {

    if (!hasToolsDatabase()) {
        return;
    }

    selectedCategory =
        String(category || "all").toLowerCase();

    selectedPricing =
        String(pricing || "all").toLowerCase();

    const keyword =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

    currentFilteredTools =
        aiToolsDatabase.filter(tool => {

            const toolCategory =
                String(tool.category || "").toLowerCase();

            const toolPricing =
                String(tool.pricing || "").toLowerCase();

            const searchableText = [
                tool.name,
                tool.company,
                tool.category,
                tool.description,
                tool.pricing
            ]
                .join(" ")
                .toLowerCase();

            const matchesCategory =
                selectedCategory === "all" ||
                toolCategory === selectedCategory;

            const matchesPricing =
                selectedPricing === "all" ||
                toolPricing === selectedPricing;

            const matchesSearch =
                keyword === "" ||
                searchableText.includes(keyword);

            return (
                matchesCategory &&
                matchesPricing &&
                matchesSearch
            );

        });

    currentFilteredTools =
        sortTools(currentFilteredTools);

    currentPage =
        Math.max(1, Number(page) || 1);

    renderToolsPage();
}


// =============================
// RENDER TOOLS
// =============================

function renderToolsPage() {

    if (!toolsGrid) {
        return;
    }

    if (currentFilteredTools.length === 0) {

        toolsGrid.innerHTML = `
            <div class="empty-tools">
                <h2>No Tools Found</h2>
                <p>No tools available for the selected filters.</p>
            </div>
        `;

        renderPagination(0);

        if (resultsCount) {
            resultsCount.textContent = "Showing 0 AI tools";
        }

        return;
    }

    const totalPages =
        Math.ceil(
            currentFilteredTools.length / toolsPerPage
        );

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const start =
        (currentPage - 1) * toolsPerPage;

    const end =
        start + toolsPerPage;

    const toolsToShow =
        currentFilteredTools.slice(start, end);

    toolsGrid.innerHTML =
        toolsToShow.map(createToolCard).join("");

    renderPagination(totalPages);

    if (resultsCount) {
        resultsCount.textContent =
            `Showing ${toolsToShow.length} of ${currentFilteredTools.length} AI tools`;
    }

}


// =============================
// PAGINATION
// =============================

function renderPagination(totalPages) {

    if (!pagination) {
        return;
    }

    if (totalPages <= 1) {
        pagination.innerHTML = "";
        return;
    }

    let html = "";

    html += `
        <button
            type="button"
            class="pagination-btn"
            ${currentPage === 1 ? "disabled" : ""}
            onclick="changePage(${currentPage - 1})">
            ← Previous
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {

        html += `
            <button
                type="button"
                class="pagination-btn ${i === currentPage ? "active" : ""}"
                onclick="changePage(${i})">
                ${i}
            </button>
        `;

    }

    html += `
        <button
            type="button"
            class="pagination-btn"
            ${currentPage === totalPages ? "disabled" : ""}
            onclick="changePage(${currentPage + 1})">
            Next →
        </button>
    `;

    pagination.innerHTML = html;
}


function changePage(page) {

    const totalPages =
        Math.ceil(
            currentFilteredTools.length / toolsPerPage
        );

    const requestedPage = Number(page);

    if (
        !Number.isInteger(requestedPage) ||
        requestedPage < 1 ||
        requestedPage > totalPages
    ) {
        return;
    }

    currentPage = requestedPage;

    renderToolsPage();

    if (toolsGrid) {
        toolsGrid.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

}


// =============================
// CATEGORY FILTER
// =============================

function activateCategoryCard(card) {

    if (!card) {
        return;
    }

    categoryCards.forEach(item => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
    });

    card.classList.add("active");
    card.setAttribute("aria-pressed", "true");

    const category =
        card.dataset.category || "all";

    loadTools(
        category,
        selectedPricing,
        1
    );

    if (toolsGrid) {
        setTimeout(() => {
            toolsGrid.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 50);
    }

}


function initCategoryFilters() {

    categoryCards.forEach(card => {

        card.addEventListener("click", () => {
            activateCategoryCard(card);
        });

        card.addEventListener("keydown", event => {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();
                activateCategoryCard(card);
            }

        });

    });

}


// =============================
// PRICING FILTER
// =============================

function initPricingFilters() {

    pricingButtons.forEach(button => {

        button.addEventListener("click", () => {

            pricingButtons.forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const pricing =
                button.dataset.pricing || "all";

            loadTools(
                selectedCategory,
                pricing,
                1
            );

        });

    });

}


// =============================
// SORT FILTER
// =============================

function initSortFilter() {

    if (!sortSelect) {
        return;
    }

    sortSelect.addEventListener("change", () => {

        selectedSort =
            sortSelect.value || "default";

        loadTools(
            selectedCategory,
            selectedPricing,
            1
        );

    });

}


// =============================
// CLEAR FILTERS
// =============================

function initClearFilters() {

    if (!clearFilters) {
        return;
    }

    clearFilters.addEventListener("click", () => {

        selectedCategory = "all";
        selectedPricing = "all";
        selectedSort = "default";

        if (searchInput) {
            searchInput.value = "";
        }

        if (sortSelect) {
            sortSelect.value = "default";
        }

        categoryCards.forEach(card => {
            card.classList.toggle(
                "active",
                card.dataset.category === "all"
            );

            card.setAttribute(
                "aria-pressed",
                card.dataset.category === "all"
                    ? "true"
                    : "false"
            );
        });

        pricingButtons.forEach(button => {
            button.classList.toggle(
                "active",
                button.dataset.pricing === "all"
            );
        });

        loadTools("all", "all", 1);

    });

}


// =============================
// SEARCH
// =============================

function debounce(functionToRun, delay) {

    let timeoutId;

    return (...args) => {

        clearTimeout(timeoutId);

        timeoutId =
            setTimeout(
                () => functionToRun(...args),
                delay
            );

    };

}


function runSearch() {

    if (!searchInput || !hasToolsDatabase()) {
        return;
    }

    loadTools(
        selectedCategory,
        selectedPricing,
        1
    );

}


function initSearch() {

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener(
        "input",
        debounce(runSearch, 250)
    );

}


// =============================
// COOKIE CONSENT
// =============================

function getSavedCookiePreferences() {

    try {

        const raw =
            localStorage.getItem("cookiePreferences");

        return raw ? JSON.parse(raw) : null;

    } catch (error) {

        localStorage.removeItem("cookiePreferences");
        return null;
    }

}


function initCookies() {

    if (!cookieBanner) {
        return;
    }

    const preferences =
        getSavedCookiePreferences();

    if (preferences) {

        cookieBanner.classList.add("hide");

        if (analyticsCookies) {
            analyticsCookies.checked =
                Boolean(preferences.analytics);
        }

        if (advertisingCookies) {
            advertisingCookies.checked =
                Boolean(preferences.advertising);
        }

        return;
    }

    cookieBanner.classList.remove("hide");

}


function openCookieSettings() {

    if (!cookieSettings) {
        return;
    }

    const preferences =
        getSavedCookiePreferences();

    if (analyticsCookies) {
        analyticsCookies.checked =
            Boolean(preferences?.analytics);
    }

    if (advertisingCookies) {
        advertisingCookies.checked =
            Boolean(preferences?.advertising);
    }

    cookieSettings.classList.add("show");

}


function savePreferences(preferences) {

    localStorage.setItem(
        "cookiePreferences",
        JSON.stringify(preferences)
    );

    if (
        preferences.analytics &&
        typeof window.loadGoogleAnalytics === "function"
    ) {
        window.loadGoogleAnalytics();
    }

    if (cookieBanner) {
        cookieBanner.classList.add("hide");
    }

    if (cookieSettings) {
        cookieSettings.classList.remove("show");
    }

}


function initCookieEvents() {

    if (acceptCookies) {

        acceptCookies.addEventListener("click", () => {

            savePreferences({
                necessary: true,
                analytics: true,
                advertising: true
            });

        });

    }

    if (rejectCookies) {

        rejectCookies.addEventListener("click", () => {

            savePreferences({
                necessary: true,
                analytics: false,
                advertising: false
            });

        });

    }

    if (customizeCookies) {

        customizeCookies.addEventListener("click", () => {
            openCookieSettings();
        });

    }

    if (closeCookieSettings) {

        closeCookieSettings.addEventListener("click", () => {

            if (cookieSettings) {
                cookieSettings.classList.remove("show");
            }

        });

    }

    if (saveCookiePreferences) {

        saveCookiePreferences.addEventListener("click", () => {

            savePreferences({
                necessary: true,

                analytics:
                    analyticsCookies
                        ? analyticsCookies.checked
                        : false,

                advertising:
                    advertisingCookies
                        ? advertisingCookies.checked
                        : false
            });

        });

    }

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            cookieSettings
        ) {
            cookieSettings.classList.remove("show");
        }

    });

}


// =============================
// SUGGEST A TOOL
// =============================

function initSuggestTool() {

    if (!suggestToolForm) {
        return;
    }

    suggestToolForm.addEventListener("submit", event => {

        event.preventDefault();

        const name =
            document.getElementById("suggestName")?.value.trim() || "";

        const website =
            document.getElementById("suggestWebsite")?.value.trim() || "";

        const category =
            document.getElementById("suggestCategory")?.value || "";

        const reason =
            document.getElementById("suggestReason")?.value.trim() || "";

        if (!name || !website || !category) {
            alert("Please complete the required fields.");
            return;
        }

        const subject =
            `Tool Suggestion: ${name}`;

        const body =
            [
                `Tool Name: ${name}`,
                `Website: ${website}`,
                `Category: ${category}`,
                `Reason: ${reason || "N/A"}`
            ].join("\n");

        const mailtoUrl =
            "mailto:aitoolshuboffic@gmail.com" +
            "?subject=" +
            encodeURIComponent(subject) +
            "&body=" +
            encodeURIComponent(body);

        window.location.href = mailtoUrl;

    });

}


// =============================
// START WEBSITE
// =============================

function initWebsite() {

    cacheElements();

    initNavigation();
    initCategoryFilters();
    initPricingFilters();
    initSortFilter();
    initClearFilters();
    initSearch();
    initCookieEvents();
    initSuggestTool();

    const homePageId = getHomePageId();

    if (homePageId) {
        showPage(homePageId);
    }

    loadFeaturedTool();
    loadLatestTools();

    loadTools("all", "all", 1);

    initCookies();

}


// =============================
// START AFTER HTML LOAD
// =============================

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initWebsite,
        { once: true }
    );

} else {

    initWebsite();

}


// Expose functions used by inline HTML onclick attributes
window.showPage = showPage;
window.changePage = changePage;
window.openCookieSettings = openCookieSettings;
window.activateCategoryCard = activateCategoryCard;
