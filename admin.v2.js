// ================================
// ORIVO ADMIN PANEL — admin.v2.js
// LocalStorage Product Control
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const productList = document.getElementById("productList");

  if (!form || !productList) {
    console.error("Admin panel IDs missing");
    return;
  }

  renderProducts();

  // SAVE PRODUCT
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
      id: String(Date.now()),
      name,
      category,
      price,
      description
    });

    localStorage.setItem("orivoProducts", JSON.stringify(products));

    form.reset();
    renderProducts();
  });

  // RENDER PRODUCTS
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
          <strong>${product.name}</strong>
          <p>${product.category} — UGX ${product.price}</p>
          <small>${product.description}</small>
        </div>
        <button type="button" data-id="${product.id}">Delete</button>
      `;

      productList.appendChild(item);
    });
  }

  // DELETE (EVENT DELEGATION — iOS SAFE)
  productList.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const id = Number(e.target.dataset.id);

    const products = getProducts().filter(p => p.id !== id);
    localStorage.setItem("orivoProducts", JSON.stringify(products));

    renderProducts();
  });

  // GET PRODUCTS
  function getProducts() {
    return JSON.parse(localStorage.getItem("orivoProducts")) || [];
  }
});
