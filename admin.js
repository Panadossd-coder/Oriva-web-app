First examin and see what am missing 

// ================================
// ORIVO ADMIN PANEL — admin.js
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
    const image = document.getElementById("productImage").value.trim();
    const category = document.getElementById("productCategory").value;
    const price = document.getElementById("productPrice").value.trim();
    const description = document.getElementById("productDescription").value.trim();

    if (!name || !image || !price || !description) {
      alert("Please fill all fields");
      return;
    }

    const products = getProducts();
const existingId = document.getElementById("productId").value;

if (existingId) {
  // UPDATE EXISTING
  const index = products.findIndex(p => p.id === Number(existingId));
  products[index] = {
  id: Number(existingId),
  name,
  image,
  category,
  price,
  description
};
} else {
  // ADD NEW
  products.push({
    id: Date.now(),
    name,
    category,
    price,
    description
  });
}

    localStorage.setItem("orivoProducts", JSON.stringify(products));

    form.reset();
    document.getElementById("productId").value = "";
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

      item.innerHTML = 
  <div>
    <strong>${product.name}</strong>
    <p>${product.category} — UGX ${product.price}</p>
    <small>${product.description}</small>
  </div>
  <div>
    <button class="edit-btn" data-id="${product.id}">Edit</button>
    <button class="delete-btn" data-id="${product.id}">Delete</button>
  </div>
;

      productList.appendChild(item);
    });

    attachActionHandlers();
  }
function attachActionHandlers() {
  // EDIT
  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const product = getProducts().find(p => p.id === id);

      document.getElementById("productId").value = product.id;
      document.getElementById("productName").value = product.name;
      document.getElementById("productCategory").value = product.category;
      document.getElementById("productPrice").value = product.price;
      document.getElementById("productDescription").value = product.description;
    });
  });

  // DELETE
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      const products = getProducts().filter(p => p.id !== id);
      localStorage.setItem("orivoProducts", JSON.stringify(products));
      renderProducts();
    });
  });
}
  // DELETE PRODUCT
  function attachDeleteHandlers() {
    document.querySelectorAll(".admin-product button").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.id);
        const products = getProducts().filter(p => p.id !== id);
        localStorage.setItem("orivoProducts", JSON.stringify(products));
        renderProducts();
      });
    });
  }

  // GET PRODUCTS
  function getProducts() {
    return JSON.parse(localStorage.getItem("orivoProducts")) || [];
  }
});