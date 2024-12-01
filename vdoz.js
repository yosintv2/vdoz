const container = document.getElementById("highlightsContainer");

const createCategorySection = (categoryName, data) => {
    // Create a category header
    const categoryHeader = document.createElement("h2");
    categoryHeader.textContent = categoryName;
    categoryHeader.style.textAlign = "center";
    categoryHeader.style.margin = "20px 0";
    container.appendChild(categoryHeader);

    // Create a row for this category
    const row = document.createElement("div");
    row.className = "row";

    data.forEach(item => {
        const col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
            <div class="highlight">
                <a href="${item.url}" target="_blank">
                    <img src="${item.image}" alt="${item.title}">
                </a>
                <a href="${item.url}" target="_blank">
                    <h2>${item.title}</h2>
                </a>
            </div>
        `;

        row.appendChild(col);
    });

    container.appendChild(row);
};

// Fetch data from JSON files and render them
const fetchData = async (fileName, categoryName) => {
    try {
        const response = await fetch(fileName);
        const data = await response.json();
        createCategorySection(categoryName, data);
    } catch (error) {
        console.error(`Error fetching data from ${fileName}:`, error);
    }
};

// Fetch Cricket and Football data
fetchData("cricket.json", "Cricket");
fetchData("football.json", "Football");
