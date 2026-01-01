document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("productForm");
  const productList = document.getElementById("productList");

  if (!form || !productList) return;

  renderProducts();

  // ADD / UPDATE
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.getElementById("productId").value;
    const name = document.getElementById("productName").value.trim();
    const category = document.getElementById("productCategory").value;
    const price = document.getElementById("productPrice").value.trim();
    const description = document.getElementById("productDescription").value.trim();

    if (!name || !price || !description) {
      alert("Fill all fields");
      return;
    }

    const products = getProducts();

    if (id) {
      const index = products.findIndex(p => p.id === Number(id));
      if (index !== -1) {
        products[index] = {
          id: Number(id),
          name,
          category,
          price,
          description
        };
      }
    } else {
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

  // RENDER
  function renderProducts() {
    const products = getProducts();
    productList.innerHTML = "";

    if (products.length === 0) {
      productList.innerHTML = "<p>No products yet.</p>";
      return;
    }

    products.forEach(p => {
      const row = document.createElement("div");
      row.className = "admin-product";

      row.innerHTML = `
        <div>
          <strong>${p.name}</strong>
          <p>${p.category} — UGX ${p.price}</p>
          <small>${p.description}</small>
        </div>
        <div>
          <button class="edit" data-id="${p.id}">Edit</button>
          <button class="delete" data-id="${p.id}">Delete</button>
        </div>
      `;

      productList.appendChild(row);
    });

    attachActions();
  }

  function attachActions() {
    document.querySelectorAll(".edit").forEach(btn => {
      btn.onclick = () => {
        const product = getProducts().find(p => p.id === Number(btn.dataset.id));
        if (!product) return;

        document.getElementById("productId").value = product.id;
        document.getElementById("productName").value = product.name;
        document.getElementById("productCategory").value = product.category;
        document.getElementById("productPrice").value = product.price;
        document.getElementById("productDescription").value = product.description;

        window.scrollTo({ top: 0, behavior: "smooth" });
      };
    });

    document.querySelectorAll(".delete").forEach(btn => {
      btn.onclick = () => {
        if (!confirm("Delete product?")) return;
        const id = Number(btn.dataset.id);
        const products = getProducts().filter(p => p.id !== id);
        localStorage.setItem("orivoProducts", JSON.stringify(products));
        renderProducts();
      };
    });
  }

  function getProducts() {
    return JSON.parse(localStorage.getItem("orivoProducts")) || [];
  }
});