// Get the root element from the DOM
let root = document.getElementById("root");

// Create and append the heading element
let heading = document.createElement("h1");
heading.textContent = "SELECT YOUR CHOICE";
root.appendChild(heading);

// Create a container for the buttons
let btnContainer = document.createElement("div");
btnContainer.classList.add("btn-container");

// Create and append the buttons for Men, Women, and Kids
let men = document.createElement("button");
men.textContent = "Men";
btnContainer.appendChild(men);

let women = document.createElement("button");
women.textContent = "Women";
btnContainer.appendChild(women);

let kids = document.createElement("button");
kids.textContent = "Kids";
btnContainer.appendChild(kids);

// Append the button container to the root element
root.appendChild(btnContainer);

// Create a container for the product cards
let tabContent = document.createElement("div");
tabContent.setAttribute("id", "tabContent");
root.appendChild(tabContent);

// Fetch data from the API
let options = {
    method: "GET"
};

let fetchedData;

fetch("https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json", options)
    .then(response => response.json())
    .then(data => {
        fetchedData = data.categories;
        renderProducts("Men"); // Render products for Men initially

        // Event handlers for the buttons
        men.style.backgroundColor = "#000";
        men.style.color = "#fff";

        men.onclick = function () {
            men.textContent = "Men \u{1F468}"; // Unicode emoji for man
            women.textContent = "Women";
            kids.textContent = "Kids";
            renderProducts("Men");
            resetButtonStyles();
            men.style.backgroundColor = "#000";
            men.style.color = "#fff";
        };
        women.onclick = function () {
            men.textContent = "Men";
            women.textContent = "Women \u{1F469}"; // Unicode emoji for woman
            kids.textContent = "Kids";
            renderProducts("Women");
            resetButtonStyles();
            women.style.backgroundColor = "#000";
            women.style.color = "#fff";
        };
        kids.onclick = function () {
            men.textContent = "Men";
            women.textContent = "Women";
            kids.textContent = "Kids \u{1F9D2}"; // Unicode emoji for child
            renderProducts("Kids");
            resetButtonStyles();
            kids.style.backgroundColor = "#000";
            kids.style.color = "#fff";
        };
    })
    .catch(error => console.error('Error:', error));

// Function to reset button styles
function resetButtonStyles() {
    men.style.backgroundColor = "#f9f9f9";
    men.style.color = "#000";
    women.style.backgroundColor = "#f9f9f9";
    women.style.color = "#000";
    kids.style.backgroundColor = "#f9f9f9";
    kids.style.color = "#000";
}

// Function to render products based on category
function renderProducts(category) {
    tabContent.innerHTML = ""; // Clear previous content

    let categoryData = fetchedData.find(item => item.category_name === category);
    if (categoryData) {
        categoryData.category_products.forEach(product => {
            let card = createProductCard(product);
            tabContent.appendChild(card);
        });
    } else {
        console.error('Error: Category not found');
    }
}

// Function to create a product card element
function createProductCard(product) {
    let card = document.createElement("div");
    card.classList.add("product-card");

    let image = document.createElement("img");
    image.setAttribute("src", product.image);
    image.setAttribute("alt", product.title);
    card.appendChild(image);

    let badge = document.createElement("div");
    badge.classList.add("badge");
    badge.textContent = product.badge_text || "N/A";
    card.appendChild(badge);

    let titleVendor = document.createElement("div");
    titleVendor.classList.add("title-vendor");

    let title = document.createElement("h3");
    title.textContent = product.title;
    title.classList.add("product-title")
    titleVendor.appendChild(title);

    let vendor = document.createElement("p");
    vendor.textContent = product.vendor;
    titleVendor.appendChild(vendor);

    card.appendChild(titleVendor);

    let priceContainer = document.createElement("div");
    priceContainer.classList.add("price-container");

    let price = document.createElement("p");
    price.textContent = "Rs " + product.price;
    price.classList.add("product-price");
    priceContainer.appendChild(price);

    let comparePrice = document.createElement("p");
    comparePrice.textContent = "Rs " + product.compare_at_price;
    comparePrice.classList.add("compare-price");
    priceContainer.appendChild(comparePrice);

    let discount = document.createElement("p");
    let percent = ((product.compare_at_price - product.price) / product.compare_at_price) * 100;
    discount.textContent = percent.toFixed(1) + "% off";
    discount.classList.add("discount");
    priceContainer.appendChild(discount);

    card.appendChild(priceContainer);

    let addToCart = document.createElement("button");
    addToCart.textContent = "Add to Cart";
    addToCart.classList.add("add-to-cart");
    card.appendChild(addToCart);

    return card;
}
