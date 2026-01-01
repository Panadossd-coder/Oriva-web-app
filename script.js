// ORIVO — Product Navigation Logic
// Safe data transfer using localStorage

document.addEventListener("DOMContentLoaded", () => {

  // Product cards → product page with data
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {

      const productData = {
        name: card.dataset.name || "",
        category: card.dataset.category || "",
        price: card.dataset.price || "",
        description: card.dataset.description || ""
      };

      localStorage.setItem("orivoProduct", JSON.stringify(productData));

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
// ORIVO — Product Page Data Injection
if (window.location.pathname.includes("product.html")) {
  const product = JSON.parse(localStorage.getItem("orivoProduct"));

  if (product) {
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-category").textContent = product.category;
    document.getElementById("product-price").textContent = product.price;
    document.getElementById("product-description").textContent = product.description;
  }
}