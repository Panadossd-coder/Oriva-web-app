// ORIVO — Navigation & Product Logic
// Safe data transfer using localStorage

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- PRODUCT CARD CLICK ---------- */
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {

    // 🚫 Ignore cards without product data
    if (!card.dataset.name) return;

    const productData = {
      name: card.dataset.name,
      category: card.dataset.category,
      price: card.dataset.price,
      description: card.dataset.description
    };

    localStorage.setItem("orivoProduct", JSON.stringify(productData));
    window.location.href = "product.html";
  });
});

  /* ---------- CATEGORY CLICK ---------- */
  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      const category = card.dataset.category;
      if (category) {
        localStorage.setItem("orivoCategory", category.toLowerCase());
        window.location.href = "shop.html";
      }
    });
  });
    /* ---------- SHOP CATEGORY FILTER ---------- */
  if (window.location.pathname.includes("shop.html")) {
    const selectedCategory = localStorage.getItem("orivoCategory");

    if (selectedCategory) {
      document.querySelectorAll(".card").forEach(card => {
        const cardCategory = card.dataset.category;

        if (!cardCategory || cardCategory.toLowerCase() !== selectedCategory) {
          card.style.display = "none";
        }
      });
    }
  }

  /* ---------- HERO BUTTON (ALL PRODUCTS) ---------- */
const exploreBtn = document.querySelector(".btn-primary");

if (exploreBtn) {
  exploreBtn.addEventListener("click", () => {
    // 🔥 CLEAR CATEGORY FILTER
    localStorage.removeItem("orivoCategory");

    // GO TO SHOP
    window.location.href = "shop.html";
  });
}

  /* ---------- PRODUCT PAGE INJECTION ---------- */
  if (window.location.pathname.includes("product.html")) {
    const product = JSON.parse(localStorage.getItem("orivoProduct"));

    if (product) {
      document.getElementById("product-name").textContent = product.name;
      document.getElementById("product-category").textContent = product.category;
      document.getElementById("product-price").textContent = product.price;
      document.getElementById("product-description").textContent = product.description;
    }
  }

});