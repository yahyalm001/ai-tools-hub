/*=========================================
 AI TOOLS HUB
 app.js
 FINAL VERSION
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

const cookieBanner = document.getElementById("cookieBanner");
const acceptCookies = document.getElementById("acceptCookies");
const rejectCookies = document.getElementById("rejectCookies");

// =============================
// PAGE NAVIGATION
// =============================

function showPage(pageId){

pages.forEach(page=>{

page.classList.remove("active");

}); 

const page=document.getElementById(pageId);

if(page){

page.classList.add("active");

}

navButtons.forEach(btn=>{

btn.classList.remove("active");

if(btn.dataset.page===pageId){

btn.classList.add("active");

}

});

window.scrollTo({

top:0,

behavior:"smooth"

});

}

// =============================
// NAV BUTTONS
// =============================

navButtons.forEach(btn=>{

btn.addEventListener("click",()=>{

showPage(btn.dataset.page);

});

});

browseTools.addEventListener("click",()=>{

showPage("categoriesSection");

});

browseToolsBottom.addEventListener("click",()=>{

showPage("categoriesSection");

});

learnMore.addEventListener("click",()=>{

showPage("about");

});
/*=========================================
 PART 2
 CREATE TOOL CARDS
=========================================*/

function createToolCard(tool){
    console.log(tool);

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

${tool.featured ? '<span class="featured-badge">🔥 Featured</span>' : ''}

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

/*=========================================
 FEATURED TOOL
=========================================*/

function loadFeaturedTool(){

if(!featuredTitle) return;

const featured=

aiToolsDatabase.find(tool=>tool.featured)

||

aiToolsDatabase[0];

featuredTitle.textContent=

featured.name;

featuredDescription.textContent=

featured.description;

featuredLink.href=

featured.website;

}

/*=========================================
 LATEST TOOLS
=========================================*/

function loadLatestTools(){

if(!latestToolsGrid) return;

const latest=

[...aiToolsDatabase]

.slice(-6)

.reverse();

latestToolsGrid.innerHTML=

latest.map(tool=>createToolCard(tool)).join("");

}
// =============================
// PAGINATION
// =============================

const toolsPerPage = 20;
let currentPage = 1;
let currentFilteredTools = [];

// =============================
// LOAD TOOLS + CATEGORY FILTER
// =============================

function loadTools(category = "all", page = 1) {

    let filtered;

    if (category === "all") {

        filtered = aiToolsDatabase;

    } else {

        filtered = aiToolsDatabase.filter(tool =>
            tool.category.toLowerCase() === category.toLowerCase()
        );

    }

    currentFilteredTools = filtered;
    currentPage = page;

    renderToolsPage();

}

// =============================
// RENDER TOOLS PAGE
// =============================

function renderToolsPage() {

    if (!toolsGrid) return;

    if (currentFilteredTools.length === 0) {

        toolsGrid.innerHTML = `
            <div class="empty-tools">
                <h2>No Tools Found</h2>
                <p>New tools will be added soon.</p>
            </div>
        `;

        renderPagination(0);
        return;
    }

    const start = (currentPage - 1) * toolsPerPage;
    const end = start + toolsPerPage;

    const toolsToShow =
        currentFilteredTools.slice(start, end);

    toolsGrid.innerHTML =
        toolsToShow.map(tool => createToolCard(tool)).join("");

    renderPagination(
        Math.ceil(currentFilteredTools.length / toolsPerPage)
    );
}

// =============================
// PAGINATION BUTTONS
// =============================

function renderPagination(totalPages) {

    const pagination = document.getElementById("pagination");

    if (!pagination) return;

    if (totalPages <= 1) {

        pagination.innerHTML = "";
        return;

    }

    let html = "";

    html += `
        <button
            class="pagination-btn"
            ${currentPage === 1 ? "disabled" : ""}
            onclick="changePage(${currentPage - 1})">
            ← Previous
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {

        html += `
            <button
                class="pagination-btn ${i === currentPage ? "active" : ""}"
                onclick="changePage(${i})">
                ${i}
            </button>
        `;

    }

    html += `
        <button
            class="pagination-btn"
            ${currentPage === totalPages ? "disabled" : ""}
            onclick="changePage(${currentPage + 1})">
            Next →
        </button>
    `;

    pagination.innerHTML = html;

}
// =============================
// CHANGE PAGE
// =============================

function changePage(page) {

    const totalPages =
        Math.ceil(currentFilteredTools.length / toolsPerPage);

    if (page < 1 || page > totalPages) return;

    currentPage = page;

    renderToolsPage();

    toolsGrid.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

/*=========================================
 CATEGORY FILTER
=========================================*/

categoryCards.forEach(card=>{

card.addEventListener("click",()=>{

categoryCards.forEach(c=>{

c.classList.remove("active");

});

card.classList.add("active");

const category=

card.dataset.category;

loadTools(category);

});

});
/*=========================================
 PART 4
 COOKIE BANNER
=========================================*/

function initCookies(){

const choice=

localStorage.getItem("cookieChoice");

if(choice){

cookieBanner.style.display="none";

return;

}

cookieBanner.style.display="flex";

}

acceptCookies.addEventListener("click",()=>{

localStorage.setItem(

"cookieChoice",

"accepted"

);

cookieBanner.style.display="none";

});

rejectCookies.addEventListener("click",()=>{

localStorage.setItem(

"cookieChoice",

"rejected"

);

cookieBanner.style.display="none";

});

/*=========================================
 START WEBSITE
=========================================*/

document.addEventListener(

"DOMContentLoaded",

()=>{

showPage("home");

loadFeaturedTool();

loadLatestTools();

loadTools("all");

initCookies();

}

);
/*=========================================
 PART 5
 SEARCH
=========================================*/


const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", () => {

        const keyword =
            searchInput.value.trim().toLowerCase();

        if (keyword === "") {

            currentFilteredTools = aiToolsDatabase;
            currentPage = 1;

            renderToolsPage();

            return;
        }

        const filtered =
            aiToolsDatabase.filter(tool =>
                tool.name.toLowerCase().includes(keyword) ||
                tool.company.toLowerCase().includes(keyword) ||
                tool.category.toLowerCase().includes(keyword) ||
                tool.description.toLowerCase().includes(keyword)
            );

        currentFilteredTools = filtered;
        currentPage = 1;

        renderToolsPage();

    });

}