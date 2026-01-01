// ORIVO — Safe Navigation Logic
// This file only handles clicks. No layout changes.

document.addEventListener("DOMContentLoaded", () => {

  // Featured product cards → product page
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      window.location.href = "product.html";
    });
  });

  // Category cards → categories page
  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      window.location.href = "categories.html";
    });
  });

  // Hero button → shop page
  const exploreBtn = document.querySelector(".btn-primary");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      window.location.href = "shop.html";
    });
  }

});