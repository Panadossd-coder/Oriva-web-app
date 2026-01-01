// ================================
// ORIVO ADMIN PANEL — admin.js
// FULL STABLE VERSION
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const productList = document.getElementById("productList");

  if (!form || !productList) {
    console.error("Admin panel elements missing");
    return;
  }

  // expose render globally (needed by delete)
  window.renderProducts = renderProducts;

  // initial load
  renderProducts();

  // ======================
  // SAVE PRODUCT
  // ======================
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("productName").value.trim();
    const category = document.getElementById("productCategory").value;
    const price = document.getElementById("productPrice").value.trim();
    const description = document.getElementById("productDescription").value.trim();

    if (!name || !price || !description) {
      alert("Please fill all fields");
      return;
    }

    const products = getProducts();

    products.push({
      id: Date.now(), // unique ID
      name,
      category,
      price,
      description
    });

    localStorage.setItem("orivoProducts", JSON.stringify(products));

    form.reset();
    renderProducts();
  });

  // ======================
  // RENDER PRODUCTS
  // ======================
  function renderProducts() {
    const products = getProducts();
    productList.innerHTML = "";

    if (products.length === 0) {
      productList.innerHTML = "<p>No products added yet.</p>";
      return;
    }

    products.forEach(product => {
      const item = document.createElement("div");
      item.className = "admin-product";

      item.innerHTML = `
        <div>
          <strong>${escapeHtml(product.name)}</strong>
          <p>${escapeHtml(product.category)} — UGX ${escapeHtml(product.price)}</p>
          <small>${escapeHtml(product.description)}</small>
        </div>

        <button
          type="button"
          class="remove-btn"
          onclick="removeProduct(${product.id})">
          Remove
        </button>
      `;

      productList.appendChild(item);
    });
  }

  // ======================
  // STORAGE HELPERS
  // ======================
  function getProducts() {
    try {
      return JSON.parse(localStorage.getItem("orivoProducts")) || [];
    } catch {
      return [];
    }
  }

  function escapeHtml(text = "") {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
});

// ==============================
// REMOVE PRODUCT (GLOBAL — SAFE)
// ==============================
window.removeProduct = function (id) {
  let products = JSON.parse(localStorage.getItem("orivoProducts")) || [];

  products = products.filter(product => product.id !== id);

  localStorage.setItem("orivoProducts", JSON.stringify(products));

  if (window.renderProducts) {
    window.renderProducts();
  }
};