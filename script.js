// ORIVO — Navigation & Product Logic
// Safe data transfer using localStorage

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- PRODUCT CARD CLICK ---------- */
  document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {

    // ⛔ STOP if this is not a product card
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

  /* ---------- HERO BUTTON ---------- */
  const exploreBtn = document.querySelector(".btn-primary");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
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