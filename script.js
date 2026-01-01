// ORIVO — Safe Navigation + Category Filtering
// No layout changes. No DOM creation. Safe logic only.

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     NAVIGATION
     ========================= */

  // Featured & shop product cards → product page
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      window.location.href = "product.html";
    });
  });

  // Category cards → categories.html with filter
  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      const category = card.dataset.category;
      window.location.href = `shop.html?category=${category}`;
    });
  });

  // Hero button → shop page
  const exploreBtn = document.querySelector(".btn-primary");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      window.location.href = "shop.html";
    });
  }

  /* =========================
     CATEGORY FILTERING (SHOP)
     ========================= */

  const params = new URLSearchParams(window.location.search);
  const activeCategory = params.get("category");

  if (activeCategory) {
    document.querySelectorAll(".card").forEach(card => {
      const cardCategory = card.dataset.category;

      if (cardCategory !== activeCategory) {
        card.style.display = "none";
      }
    });
  }

});