// ================================
// ORIVO ADMIN PANEL — admin.js
// LocalStorage Product Control (add / edit / delete)
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const productList = document.getElementById("productList");

  if (!form || !productList) {
    console.error("Admin panel IDs missing");
    return;
  }

  // initial render
  renderProducts();

  // SAVE PRODUCT (add or update)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const idField = document.getElementById("productId");
    const existingId = idField.value;
    const name = document.getElementById("productName").value.trim();
    const category = document.getElementById("productCategory").value;
    const price = document.getElementById("productPrice").value.trim();
    const description = document.getElementById("productDescription").value.trim();

    if (!name || !price || !description) {
      alert("Please fill all fields");
      return;
    }

    const products = getProducts();

    if (existingId) {
      // UPDATE existing product
      const index = products.findIndex(p => p.id === Number(existingId));
      if (index === -1) {
        alert("Product not found for update");
        return;
      }

      products[index] = {
        id: Number(existingId),
        name,
        category,
        price,
        description
      };
    } else {
      // ADD new product
      products.push({
        id: Date.now(),
        name,
        category,
        price,
        description
      });
    }

    localStorage.setItem("orivoProducts", JSON.stringify(products));

    // reset form and state
    form.reset();
    idField.value = "";
    renderProducts();
  });

  // RENDER PRODUCTS
  function renderProducts() {
    const products = getProducts();
    productList.innerHTML = "";

    if (!products || products.length === 0) {
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
        <div>
          <button class="edit-btn" data-id="${product.id}">Edit</button>
          <button class="delete-btn" data-id="${product.id}">Delete</button>
        </div>
      `;

      productList.appendChild(item);
    });

    attachActionHandlers();
  }

  // attach Edit + Delete handlers
  function attachActionHandlers() {
    // EDIT
    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        const product = getProducts().find(p => p.id === id);
        if (!product) return;

        // populate form for editing
        document.getElementById("productId").value = product.id;
        document.getElementById("productName").value = product.name;
        document.getElementById("productCategory").value = product.category;
        document.getElementById("productPrice").value = product.price;
        document.getElementById("productDescription").value = product.description;

        // scroll to form (optional)
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    // DELETE
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        if (!confirm("Delete this product?")) return;

        const products = getProducts().filter(p => p.id !== id);
        localStorage.setItem("orivoProducts", JSON.stringify(products));
        renderProducts();
      });
    });
  }

  // GET PRODUCTS (from localStorage)
  function getProducts() {
    try {
      return JSON.parse(localStorage.getItem("orivoProducts")) || [];
    } catch (e) {
      console.error("Failed to parse products from localStorage", e);
      return [];
    }
  }

  // small helper to avoid inserting raw HTML (basic)
  function escapeHtml(str = "") {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
});