// ================================
// ORIVO — Render Products to Shop
// Reads from Admin localStorage
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");

  if (!grid) return;

  const products = JSON.parse(localStorage.getItem("orivoProducts")) || [];
  const selectedCategory = localStorage.getItem("orivoCategory");

  grid.innerHTML = "";

  if (products.length === 0) {
    grid.innerHTML = "<p>No products available.</p>";
    return;
  }

  products.forEach(product => {
    // CATEGORY FILTER
    if (
      selectedCategory &&
      product.category.toLowerCase() !== selectedCategory.toLowerCase()
    ) {
      return;
    }

    const card = document.createElement("div");
    card.className = "card";

    card.dataset.name = product.name;
    card.dataset.category = product.category;
    card.dataset.price = product.price;
    card.dataset.description = product.description;

    card.innerHTML = 
      <div class="image"></div>
      <p class="item-name">${product.name}</p>
      <span class="item-type">${product.category}</span>
    ;

    card.addEventListener("click", () => {
      localStorage.setItem("orivoProduct", JSON.stringify(product));
      window.location.href = "product.html";
    });

    grid.appendChild(card);
  });
});