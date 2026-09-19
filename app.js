/*=========================================
  AI TOOLS HUB
  app.js - COMPLETE UPDATED VERSION
=========================================*/


// =============================
// ELEMENTS
// =============================

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-btn");

const browseTools = document.getElementById("browseTools");
const browseToolsBottom = document.getElementById("browseToolsBottom");
const learnMore = document.getElementById("learnMore");

const featuredTitle = document.getElementById("featuredTitle");
const featuredDescription = document.getElementById("featuredDescription");
const featuredLink = document.getElementById("featuredLink");

const latestToolsGrid = document.getElementById("latestToolsGrid");
const toolsGrid = document.getElementById("toolsGrid");

const categoryCards = document.querySelectorAll(".category-card");
const pricingButtons = document.querySelectorAll(".pricing-btn");

const cookieBanner = document.getElementById("cookieBanner");
const acceptCookies = document.getElementById("acceptCookies");
const rejectCookies = document.getElementById("rejectCookies");
const customizeCookies = document.getElementById("customizeCookies");

const cookieSettings = document.getElementById("cookieSettings");
const closeCookieSettings = document.getElementById("closeCookieSettings");
const analyticsCookies = document.getElementById("analyticsCookies");
const advertisingCookies = document.getElementById("advertisingCookies");
const saveCookiePreferences = document.getElementById("saveCookiePreferences");

const searchInput = document.getElementById("searchInput");


// =============================
// PAGE NAVIGATION
// =============================

function showPage(pageId) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageId);

    if (page) {
        page.classList.add("active");
    }

    navButtons.forEach(btn => {

        btn.classList.remove("active");
        btn.removeAttribute("aria-current");

        if (btn.dataset.page === pageId) {
            btn.classList.add("active");
            btn.setAttribute("aria-current", "page");
        }

    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// =============================
// NAV BUTTONS
// =============================

navButtons.forEach(btn => {

    btn.addEventListener("click", () => {
        showPage(btn.dataset.page);
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


// =========================================
// CREATE TOOL CARDS
// =========================================

function createToolCard(tool) {

    const pricingBadge = tool.pricing
        ? `<span class="pricing-badge ${tool.pricing}">
            ${tool.pricing.toUpperCase()}
           </span>`
        : "";

    // First letter of the tool name, used as a text fallback
    // when both the local logo and the favicon fetch fail.
    const initial = (tool.name || "?").trim().charAt(0).toUpperCase();

    return `
        <div class="tool-card">

            <div class="tool-image">

                <img
                    src="${tool.image || `https://www.google.com/s2/favicons?sz=128&domain=${new URL(tool.website).hostname}`}"
                    alt="${tool.name}"
                    loading="lazy"
                    onerror="this.onerror=null; this.replaceWith(Object.assign(document.createElement('div'), { className: 'tool-image-fallback', textContent: '${initial}' }));">

            </div>


            <div class="tool-content">

                <div class="tool-top">

                    <span class="tool-category">
                        ${tool.category}
                    </span>

                    ${pricingBadge}

                    ${
                        tool.featured
                            ? '<span class="featured-badge">🔥 Featured</span>'
                            : ""
                    }

                </div>


                <h3>
                    ${tool.name}
                </h3>


                <p>
                    ${tool.description}
                </p>


                <a
                    href="${tool.website}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="visit-btn">

                    Visit Website →

                </a>

            </div>

        </div>
    `;
}

// =========================================
// FEATURED TOOL / TOOL OF THE WEEK
// =========================================

function loadFeaturedTool() {

    if (
        !featuredTitle ||
        typeof aiToolsDatabase === "undefined" ||
        !Array.isArray(aiToolsDatabase) ||
        aiToolsDatabase.length === 0
    ) {
        return;
    }


    const featuredId = getWeeklyFeaturedId();

    const featured =
        aiToolsDatabase.find(tool => tool.id === featuredId) ||
        aiToolsDatabase[0];


    featuredTitle.textContent =
        featured.name;


    if (featuredDescription) {

        featuredDescription.textContent =
            featured.description;

    }


    if (featuredLink) {

        featuredLink.href =
            featured.website;

    }

}


// =========================================
// LATEST TOOLS
// =========================================

function loadLatestTools() {

    if (!latestToolsGrid) return;


    if (
        typeof aiToolsDatabase === "undefined" ||
        !Array.isArray(aiToolsDatabase)
    ) {
        return;
    }


    const latest =
        [...aiToolsDatabase]
            .slice(-6)
            .reverse();


    latestToolsGrid.innerHTML =
        latest
            .map(tool => createToolCard(tool))
            .join("");

}


// =========================================
// PAGINATION & FILTER STATE
// =========================================

const toolsPerPage = 20;

let currentPage = 1;

let currentFilteredTools = [];

let selectedCategory = "all";

let selectedPricing = "all";


// =========================================
// LOAD TOOLS + FILTER SYSTEM
// =========================================

function loadTools(
    category = selectedCategory,
    pricing = selectedPricing,
    page = 1
) {

    if (
        typeof aiToolsDatabase === "undefined" ||
        !Array.isArray(aiToolsDatabase)
    ) {
        return;
    }


    selectedCategory = category;

    selectedPricing = pricing;


    const filtered =
        aiToolsDatabase.filter(tool => {

            const toolCategory =
                String(
                    tool.category || ""
                ).toLowerCase();


            const toolPricing =
                String(
                    tool.pricing || ""
                ).toLowerCase();


            const matchesCategory =
                category === "all" ||
                toolCategory ===
                    category.toLowerCase();


            const matchesPricing =
                pricing === "all" ||
                toolPricing ===
                    pricing.toLowerCase();


            return (
                matchesCategory &&
                matchesPricing
            );

        });


    currentFilteredTools =
        filtered;


    currentPage =
        page;


    renderToolsPage();

}


// =========================================
// RENDER TOOLS PAGE
// =========================================

function renderToolsPage() {

    if (!toolsGrid) return;


    if (
        currentFilteredTools.length === 0
    ) {

        toolsGrid.innerHTML = `
            <div class="empty-tools">

                <h2>
                    No Tools Found
                </h2>

                <p>
                    No tools available for the selected filters.
                </p>

            </div>
        `;


        renderPagination(0);

        return;
    }


    const start =
        (currentPage - 1) *
        toolsPerPage;


    const end =
        start +
        toolsPerPage;


    const toolsToShow =
        currentFilteredTools.slice(
            start,
            end
        );


    toolsGrid.innerHTML =
        toolsToShow
            .map(tool => createToolCard(tool))
            .join("");


    renderPagination(
        Math.ceil(
            currentFilteredTools.length /
            toolsPerPage
        )
    );

}


// =========================================
// PAGINATION BUTTONS
// =========================================

function renderPagination(totalPages) {

    const pagination =
        document.getElementById(
            "pagination"
        );


    if (!pagination) return;


    if (totalPages <= 1) {

        pagination.innerHTML = "";

        return;
    }


    let html = "";


    // Previous button

    html += `
        <button
            class="pagination-btn"
            ${currentPage === 1 ? "disabled" : ""}
            onclick="changePage(${currentPage - 1})">

            ← Previous

        </button>
    `;


    // Page numbers

    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        html += `
            <button
                class="pagination-btn ${
                    i === currentPage
                        ? "active"
                        : ""
                }"
                onclick="changePage(${i})">

                ${i}

            </button>
        `;

    }


    // Next button

    html += `
        <button
            class="pagination-btn"
            ${
                currentPage === totalPages
                    ? "disabled"
                    : ""
            }
            onclick="changePage(${currentPage + 1})">

            Next →

        </button>
    `;


    pagination.innerHTML =
        html;

}


// =========================================
// CHANGE PAGE
// =========================================

function changePage(page) {

    const totalPages =
        Math.ceil(
            currentFilteredTools.length /
            toolsPerPage
        );


    if (
        page < 1 ||
        page > totalPages
    ) {
        return;
    }


    currentPage =
        page;


    renderToolsPage();


    if (toolsGrid) {

        toolsGrid.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


// =========================================
// CATEGORY FILTER (click + keyboard)
// =========================================

function activateCategoryCard(card) {

    categoryCards.forEach(c => {
        c.classList.remove("active");
        c.setAttribute("aria-pressed", "false");
    });

    card.classList.add("active");
    card.setAttribute("aria-pressed", "true");

    const category = card.dataset.category;

    loadTools(category, selectedPricing, 1);

    setTimeout(() => {

        if (toolsGrid) {

            toolsGrid.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }, 50);

}

categoryCards.forEach(card => {

    card.addEventListener("click", () => {
        activateCategoryCard(card);
    });

    // Keyboard accessibility: Enter / Space activate the card
    card.addEventListener("keydown", (event) => {

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activateCategoryCard(card);
        }

    });

});


// =========================================
// PRICING FILTER
// =========================================

pricingButtons.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            pricingButtons.forEach(b => {
                b.classList.remove("active");
            });


            btn.classList.add("active");


            const pricing =
                btn.dataset.pricing;


            loadTools(
                selectedCategory,
                pricing,
                1
            );

        }
    );

});


// =========================================
// SEARCH FILTER (debounced)
// =========================================

function debounce(fn, delay) {

    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };

}

function runSearch() {

    const keyword =
        searchInput.value
            .trim()
            .toLowerCase();


    // Empty search
    if (keyword === "") {

        loadTools(
            selectedCategory,
            selectedPricing,
            1
        );

        return;
    }


    const filtered =
        aiToolsDatabase.filter(
            tool => {

                let matchesSearch;


                /*
                 * Special pricing search
                 *
                 * free     → FREE only
                 * freemium → FREEMIUM only
                 * paid     → PAID only
                 */

                if (
                    keyword === "free" ||
                    keyword === "freemium" ||
                    keyword === "paid"
                ) {

                    matchesSearch =
                        String(
                            tool.pricing || ""
                        ).toLowerCase() ===
                        keyword;

                } else {

                    matchesSearch =
                        String(
                            tool.name || ""
                        ).toLowerCase()
                        .includes(keyword) ||

                        String(
                            tool.company || ""
                        ).toLowerCase()
                        .includes(keyword) ||

                        String(
                            tool.category || ""
                        ).toLowerCase()
                        .includes(keyword) ||

                        String(
                            tool.description || ""
                        ).toLowerCase()
                        .includes(keyword);

                }


                // Keep category filter active

                const matchesCategory =
                    selectedCategory === "all" ||
                    String(
                        tool.category || ""
                    ).toLowerCase() ===
                    selectedCategory.toLowerCase();


                // Keep pricing filter active

                const matchesPricing =
                    selectedPricing === "all" ||
                    String(
                        tool.pricing || ""
                    ).toLowerCase() ===
                    selectedPricing.toLowerCase();


                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesPricing
                );

            }
        );


    currentFilteredTools =
        filtered;


    currentPage =
        1;


    renderToolsPage();

}

if (searchInput) {

    searchInput.addEventListener(
        "input",
        debounce(runSearch, 250)
    );

}


// =========================================
// COOKIE CONSENT
// =========================================

// Single helper used by both initCookies() and openCookieSettings()
// so the parse / error-handling logic isn't duplicated.
function getSavedCookiePreferences() {

    const raw = localStorage.getItem("cookiePreferences");

    if (!raw) return null;

    try {

        return JSON.parse(raw);

    } catch (error) {

        console.warn("Invalid cookie preferences found.");

        localStorage.removeItem("cookiePreferences");

        return null;

    }

}

function initCookies() {

    if (!cookieBanner) return;


    const preferences = getSavedCookiePreferences();


    if (preferences) {

        cookieBanner.classList.add("hide");

        if (analyticsCookies && preferences.analytics) {
            analyticsCookies.checked = true;
        }

        if (advertisingCookies && preferences.advertising) {
            advertisingCookies.checked = true;
        }

        return;

    }


    cookieBanner.classList.remove("hide");

}


// =========================================
// OPEN COOKIE SETTINGS
// =========================================

function openCookieSettings() {

    if (!cookieSettings) return;


    const preferences = getSavedCookiePreferences();


    if (analyticsCookies) {
        analyticsCookies.checked = !!(preferences && preferences.analytics);
    }

    if (advertisingCookies) {
        advertisingCookies.checked = !!(preferences && preferences.advertising);
    }


    cookieSettings.classList.add("show");

}


// =========================================
// ACCEPT COOKIES
// =========================================

if (acceptCookies) {

    acceptCookies.addEventListener(
        "click",
        () => {

            const preferences = {

                necessary: true,

                analytics: true,

                advertising: true

            };


            localStorage.setItem(
                "cookiePreferences",
                JSON.stringify(
                    preferences
                )
            );


            if (window.loadGoogleAnalytics) {
                window.loadGoogleAnalytics();
            }


            if (cookieBanner) {

                cookieBanner.classList.add(
                    "hide"
                );

            }

        }
    );

}


// =========================================
// REJECT COOKIES =========================================

if (rejectCookies) {

    rejectCookies.addEventListener(
        "click",
        () => {

            const preferences = {

                necessary: true,

                analytics: false,

                advertising: false

            };


            localStorage.setItem(
                "cookiePreferences",
                JSON.stringify(
                    preferences
                )
            );


            if (cookieBanner) {

                cookieBanner.classList.add(
                    "hide"
                );

            }

        }
    );

}


// =========================================
// CUSTOMIZE COOKIES
// =========================================

if (customizeCookies) {

    customizeCookies.addEventListener(
        "click",
        () => {

            if (cookieSettings) {

                cookieSettings.classList.add(
                    "show"
                );

            }

        }
    );

}


// =========================================
// CLOSE COOKIE SETTINGS
// =========================================

if (closeCookieSettings) {

    closeCookieSettings.addEventListener(
        "click",
        () => {

            if (cookieSettings) {

                cookieSettings.classList.remove(
                    "show"
                );

            }

        }
    );

}


// =========================================
// SAVE COOKIE PREFERENCES
// =========================================

if (saveCookiePreferences) {

    saveCookiePreferences.addEventListener(
        "click",
        () => {

            const preferences = {

                necessary: true,

                analytics:
                    analyticsCookies
                        ? analyticsCookies.checked
                        : false,

                advertising:
                    advertisingCookies
                        ? advertisingCookies.checked
                        : false

            };


            localStorage.setItem(
                "cookiePreferences",
                JSON.stringify(
                    preferences
                )
            );


            if (preferences.analytics && window.loadGoogleAnalytics) {
                window.loadGoogleAnalytics();
            }


            if (cookieSettings) {

                cookieSettings.classList.remove(
                    "show"
                );

            }


            if (cookieBanner) {

                cookieBanner.classList.add(
                    "hide"
                );

            }

        }
    );

}

// =========================================
// SUGGEST A TOOL
// =========================================

const suggestToolForm = document.getElementById("suggestToolForm");

if (suggestToolForm) {

    suggestToolForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name = document.getElementById("suggestName").value.trim();
        const website = document.getElementById("suggestWebsite").value.trim();
        const category = document.getElementById("suggestCategory").value;
        const reason = document.getElementById("suggestReason").value.trim();

        const subject = `Tool Suggestion: ${name}`;

        const bodyLines = [
            `Tool Name: ${name}`,
            `Website: ${website}`,
            `Category: ${category}`,
            `Reason: ${reason || "N/A"}`
        ];

        const body = bodyLines.join("\n");

        const mailtoUrl =
            "mailto:aitoolshuboffic@gmail.com" +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent(body);

        window.location.href = mailtoUrl;
    });

}

// =========================================
// START WEBSITE
// =========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        showPage("home");

        loadFeaturedTool();

        loadLatestTools();

        loadTools(
            "all",
            "all",
            1
        );

        initCookies();

    }
);
