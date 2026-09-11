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

        if (btn.dataset.page === pageId) {
            btn.classList.add("active");
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

    return `
        <div class="tool-card">

            <div class="tool-image">

                <img
                    src="${tool.image || `https://www.google.com/s2/favicons?sz=128&domain=${new URL(tool.website).hostname}`}"
                    alt="${tool.name}"
                    loading="lazy">

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
// FEATURED TOOL
// =========================================

function loadFeaturedTool() {

    if (!featuredTitle) return;

    if (
        typeof aiToolsDatabase === "undefined" ||
        !Array.isArray(aiToolsDatabase) ||
        aiToolsDatabase.length === 0
    ) {
        return;
    }

    const featured =
        aiToolsDatabase.find(tool => tool.featured) ||
        aiToolsDatabase[0];


    featuredTitle.textContent = featured.name;

    if (featuredDescription) {
        featuredDescription.textContent = featured.description;
    }

    if (featuredLink) {
        featuredLink.href = featured.website;
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


    const filtered = aiToolsDatabase.filter(tool => {

        const toolCategory =
            String(tool.category || "").toLowerCase();

        const toolPricing =
            String(tool.pricing || "").toLowerCase();


        const matchesCategory =
            category === "all" ||
            toolCategory === category.toLowerCase();


        const matchesPricing =
            pricing === "all" ||
            toolPricing === pricing.toLowerCase();


        return matchesCategory && matchesPricing;

    });


    currentFilteredTools = filtered;

    currentPage = page;


    renderToolsPage();

}


// =========================================
// RENDER TOOLS PAGE
// =========================================

function renderToolsPage() {

    if (!toolsGrid) return;


    if (currentFilteredTools.length === 0) {

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
        (currentPage - 1) * toolsPerPage;


    const end =
        start + toolsPerPage;


    const toolsToShow =
        currentFilteredTools.slice(start, end);


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
        document.getElementById("pagination");


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


    pagination.innerHTML = html;

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


    currentPage = page;


    renderToolsPage();


    if (toolsGrid) {

        toolsGrid.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


// =========================================
// CATEGORY FILTER
// =========================================

categoryCards.forEach(card => {

    card.addEventListener("click", () => {

        categoryCards.forEach(c => {
            c.classList.remove("active");
        });


        card.classList.add("active");


        const category =
            card.dataset.category;


        loadTools(
            category,
            selectedPricing,
            1
        );


        setTimeout(() => {

            if (toolsGrid) {

                toolsGrid.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }, 50);

    });

});


// =========================================
// PRICING FILTER
// =========================================

pricingButtons.forEach(btn => {

    btn.addEventListener("click", () => {

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

    });

});


// =========================================
// SEARCH FILTER
// =========================================

if (searchInput) {

    searchInput.addEventListener("input", () => {

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


        // Search tools

        const filtered =
            aiToolsDatabase.filter(tool => {

                const name =
                    String(tool.name || "")
                        .toLowerCase();

                const company =
                    String(tool.company || "")
                        .toLowerCase();

                const category =
                    String(tool.category || "")
                        .toLowerCase();

                const description =
                    String(tool.description || "")
                        .toLowerCase();

                const pricing =
                    String(tool.pricing || "")
                        .toLowerCase();


                const matchesSearch =
                    name.includes(keyword) ||
                    company.includes(keyword) ||
                    category.includes(keyword) ||
                    description.includes(keyword) ||
                    pricing.includes(keyword);


                const matchesCategory =
                    selectedCategory === "all" ||
                    category ===
                    selectedCategory.toLowerCase();


                const matchesPricing =
                    selectedPricing === "all" ||
                    pricing ===
                    selectedPricing.toLowerCase();


                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesPricing
                );

            });


        currentFilteredTools =
            filtered;


        currentPage = 1;


        renderToolsPage();

    });

}


// =========================================
// COOKIE CONSENT
// =========================================

function initCookies() {

    if (!cookieBanner) return;


    const savedPreferences =
        localStorage.getItem(
            "cookiePreferences"
        );


    if (savedPreferences) {

        try {

            const preferences =
                JSON.parse(
                    savedPreferences
                );


            cookieBanner.classList.add(
                "hide"
            );


            if (
                analyticsCookies &&
                preferences.analytics
            ) {

                analyticsCookies.checked = true;

            }


            if (
                advertisingCookies &&
                preferences.advertising
            ) {

                advertisingCookies.checked = true;

            }


            return;

        } catch (error) {

            console.warn(
                "Invalid cookie preferences found."
            );


            localStorage.removeItem(
                "cookiePreferences"
            );

        }

    }


    cookieBanner.classList.remove(
        "hide"
    );

}


// =========================================
// OPEN COOKIE SETTINGS
// =========================================

function openCookieSettings() {

    if (!cookieSettings) return;


    const savedPreferences =
        localStorage.getItem(
            "cookiePreferences"
        );


    if (savedPreferences) {

        try {

            const preferences =
                JSON.parse(
                    savedPreferences
                );


            if (analyticsCookies) {

                analyticsCookies.checked =
                    preferences.analytics === true;

            }


            if (advertisingCookies) {

                advertisingCookies.checked =
                    preferences.advertising === true;

            }

        } catch (error) {

            if (analyticsCookies) {
                analyticsCookies.checked = false;
            }

            if (advertisingCookies) {
                advertisingCookies.checked = false;
            }

        }

    }


    cookieSettings.classList.add(
        "show"
    );

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
                JSON.stringify(preferences)
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
// REJECT COOKIES
// =========================================

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
                JSON.stringify(preferences)
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
                JSON.stringify(preferences)
            );


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
