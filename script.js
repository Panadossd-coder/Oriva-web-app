// ORIVO — Navigation & Product Logic
// Safe data transfer using localStorage

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- PRODUCT CARD CLICK ---------- */
  document.addEventListener("DOMContentLoaded", () => {

  /* ---------- PRODUCT CARDS ONLY ---------- */
  document.querySelectorAll('.card[data-name]').forEach(card => {
    card.addEventListener("click", () => {

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

  /* ---------- CATEGORY CARDS ---------- */
  document.querySelectorAll(".category-card").forEach(card => {
    card.addEventListener("click", () => {
      const category = card.dataset.category;
      if (!category) return;

      localStorage.setItem("orivoCategory", category);
      window.location.href = "shop.html";
    });
  });

  /* ---------- HERO BUTTON ---------- */
  const exploreBtn = document.querySelector(".btn-primary");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      window.location.href = "shop.html";
    });
  }

  /* ---------- PRODUCT PAGE ---------- */
  if (window.location.pathname.includes("product.html")) {
    const product = JSON.parse(localStorage.getItem("orivoProduct"));

    if (!product) return;

    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-category").textContent = product.category;
    document.getElementById("product-price").textContent = product.price;
    document.getElementById("product-description").textContent = product.description;
  }

});