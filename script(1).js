// ANMOL MOTOR - CATALOGUE SEARCH

const allProducts = Array.isArray(window.products) ? window.products : [];
let filteredProducts = allProducts.slice();
let visibleCount = 30;

const container = document.getElementById("products-container");
const options = document.getElementById("part-options");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchPart");
const resultCount = document.getElementById("resultCount");
const showMore = document.getElementById("showMore");

function valueOf(product, keys) {
    for (const key of keys) {
        if (product[key] !== undefined && product[key] !== null && String(product[key]).trim() !== "") {
            return String(product[key]);
        }
    }
    return "";
}

function money(value) {
    if (value === undefined || value === null || value === "" || Number.isNaN(Number(value))) {
        return "Price on enquiry";
    }
    return "₹" + Number(value).toLocaleString("en-IN");
}

function clean(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function partName(product) {
    return valueOf(product, ["name", "partName", "part_name", "application"]);
}

function partNumber(product) {
    return valueOf(product, ["partNumber", "part_number", "mvNumber", "mv_number", "mv"]);
}

function application(product) {
    return valueOf(product, ["vehicle", "application", "model"]);
}

function manufacturer(product) {
    return valueOf(product, ["manufacturer", "brand"]);
}

function listPrice(product) {
    return valueOf(product, ["listPrice", "list_price", "rate", "price"]);
}

function mrp(product) {
    return valueOf(product, ["mrp", "MRP"]);
}

// Pick an image automatically from the spare-part name.
function partImage(product) {
    const name = partName(product).toLowerCase();

    if (name.includes("tie rod end")) return "images/tie-rod-end.png";
    if (name.includes("rack end")) return "images/rack-end.png";
    if (name.includes("stabilizer link")) return "images/stabilizer-link.png";
    if (name.includes("ball joint")) return "images/ball-joint.png";
    if (name.includes("lower arm")) return "images/lower-arm.png";

    return "images/no-image.png";
}

function renderOptions() {
    const names = [...new Set(allProducts.map(partName).filter(Boolean))].sort();

    options.innerHTML = "";

    const all = document.createElement("button");
    all.className = "part-option active";
    all.textContent = `All Parts (${allProducts.length})`;
    all.onclick = () => {
        document.querySelectorAll(".part-option").forEach(b => b.classList.remove("active"));
        all.classList.add("active");
        filteredProducts = allProducts.slice();
        visibleCount = 30;
        render();
    };
    options.appendChild(all);

    names.forEach(name => {
        const button = document.createElement("button");
        button.className = "part-option";
        button.textContent = name;
        button.onclick = () => {
            document.querySelectorAll(".part-option").forEach(b => b.classList.remove("active"));
            button.classList.add("active");
            searchInput.value = name;
            filteredProducts = allProducts.filter(p => partName(p).toLowerCase() === name.toLowerCase());
            visibleCount = 30;
            render();
        };
        options.appendChild(button);
    });
}

function render() {
    const items = filteredProducts.slice(0, visibleCount);

    resultCount.textContent = `${filteredProducts.length} matching part${filteredProducts.length === 1 ? "" : "s"}`;

    if (!items.length) {
        container.innerHTML = `<div class="no-products"><h3>No spare part found</h3><p>Try a part number, part name, vehicle or manufacturer.</p></div>`;
        showMore.style.display = "none";
        return;
    }

    container.innerHTML = items.map((p, index) => `
        <article class="product">
            <img
                class="product-image"
                src="${partImage(p)}"
                alt="${clean(partName(p) || "Spare Part")}"
                loading="lazy"
            >
            <h3>${clean(partName(p) || "Spare Part")}</h3>
            <p><strong>Part No:</strong> ${clean(partNumber(p) || "Not available")}</p>
            <p><strong>Vehicle/Application:</strong> ${clean(application(p) || "Not specified")}</p>
            <p><strong>Manufacturer:</strong> ${clean(manufacturer(p) || "Not specified")}</p>
            <p class="mrp"><strong>MRP: ${money(mrp(p))}</strong></p>
            <p class="discount"><strong>40% OFF</strong></p>
            <p class="price"><strong>Rate: ${money(mrp(p) * 0.60)}</strong></p>
            <button class="enquire-button" data-index="${index}">Enquire Now</button>
        </article>
    `).join("");

    document.querySelectorAll(".enquire-button").forEach(button => {
        button.onclick = () => {
        const p = items[Number(button.dataset.index)];
        openEnquiryForm(p);
    };
});

    showMore.style.display = visibleCount < filteredProducts.length ? "block" : "none";
}

function search(text) {
    const query = text.trim().toLowerCase();

    if (!query) {
        filteredProducts = allProducts.slice();
    } else {
        filteredProducts = allProducts.filter(p => {
            const fields = [
                partNumber(p),
                partName(p),
                application(p),
                manufacturer(p)
            ];
            return fields.some(v => v.toLowerCase().includes(query));
        });
    }

    visibleCount = 30;
    render();
}

searchForm.addEventListener("submit", event => {
    event.preventDefault();
    search(searchInput.value);
});

searchInput.addEventListener("input", () => search(searchInput.value));

showMore.addEventListener("click", () => {
    visibleCount += 30;
    render();
});

renderOptions();
render();

console.log(`Anmol Motor catalogue loaded: ${allProducts.length} records`);
