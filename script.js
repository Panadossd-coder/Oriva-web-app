/* =========================
   ORIVO — Minimal UI Logic
   Safe / No Layout Touching
   ========================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SIZE SELECTION
     ========================= */
  const sizeButtons = document.querySelectorAll(".options button");
  let selectedSize = null;

  sizeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Clear active state
      sizeButtons.forEach(b => b.classList.remove("active"));

      // Set active
      btn.classList.add("active");
      selectedSize = btn.textContent.trim();
    });
  });

  /* =========================
     PRIMARY ACTION SAFETY
     ========================= */
  const primaryBtn = document.querySelector(".btn-primary");

  if (primaryBtn) {
    primaryBtn.addEventListener("click", (e) => {
      if (!selectedSize) {
        e.preventDefault();
        alert("Please select a size first.");
      } else {
        console.log("Selected size:", selectedSize);
      }
    });
  }

});
