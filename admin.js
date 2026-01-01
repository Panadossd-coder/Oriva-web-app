// ================================
// ORIVO ADMIN PANEL — admin.js
// LocalStorage Product Control (v2)
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const productList = document.getElementById("productList");

  if (!form || !productList) {
    console.error("Admin panel elements missing");
    return;
  }

  renderProducts();

  // =========================
  // SAVE / UPDATE PRODUCT
  // =========================
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const idField = document.getElementById("productId");
    const name = document.getElementById("productName").value.trim();
    const image = document.getElementById("productImage").value.trim();
    const category = document.getElementById("productCategory").value;
    const price = document.getElementById("productPrice").value.trim();
    const description = document.getElementById("productDescription").value.trim();

    if (!name || !image || !price || !description) {
      alert("Please fill all fields");
      return;
    }

    const products = getProducts();
    const existingId = idField.value;

    if (existingId) {
      // 🔁 UPDATE EXISTING PRODUCT
      const index = products.findIndex(p => p.id === Number(existingId));

      if (index === -1) {
        alert("Product not found");
        return;
      }

      products[index] = {
        id: Number(existingId),
        name,
        image,
        category,
        price,
        description
      };
    } else {
      // ➕ ADD NEW PRODUCT
      products.push({
        id: Date.now(),
        name,
        image,
        category,
        price,
        description
      });
    }

    localStorage.setItem("orivoProducts", JSON.stringify(products));

    form.reset();
    idField.value = "";
    renderProducts();
  });

  // =========================
  // RENDER PRODUCTS LIST
  // =========================
  function renderProducts() {
    const products = getProducts();
    productList.innerHTML = "";

    if (products.length === 0) {
      productList.innerHTML = "<p>No products added yet.</p>";
      return;
    }

    products.forEach(product => {
      const row = document.createElement("div");
      row.className = "product-row";

      row.innerHTML = `
        <div>
          <strong>${product.name}</strong><br />
          <span>${product.category} — UGX ${product.price}</span>
        </div>
        <div>
          <button class="edit" data-id="${product.id}">Edit</button>
          <button class="delete" data-id="${product.id}">Delete</button>
        </div>
      `;

      productList.appendChild(row);
    });

    attachActionHandlers();
  }

  // =========================
  // EDIT & DELETE HANDLERS
  // =========================
  function attachActionHandlers() {

    // ✏️ EDIT
    document.querySelectorAll(".edit").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        const product = getProducts().find(p => p.id === id);

        if (!product) return;

        document.getElementById("productId").value = product.id;
        document.getElementById("productName").value = product.name;
        document.getElementById("productImage").value = product.image;
        document.getElementById("productCategory").value = product.category;
        document.getElementById("productPrice").value = product.price;
        document.getElementById("productDescription").value = product.description;

        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    // 🗑 DELETE
    document.querySelectorAll(".delete").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);

        const confirmed = confirm("Delete this product?");
        if (!confirmed) return;

        const products = getProducts().filter(p => p.id !== id);
        localStorage.setItem("orivoProducts", JSON.stringify(products));
        renderProducts();
      });
    });
  }

  // =========================
  // GET PRODUCTS
  // =========================
  function getProducts() {
    return JSON.parse(localStorage.getItem("orivoProducts")) || [];
  }
});