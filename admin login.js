// ORIVO — Admin Login

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const PIN = "1234"; // 🔐 CHANGE THIS

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const enteredPin = document.getElementById("adminPin").value;

    if (enteredPin === PIN) {
      localStorage.setItem("orivoAdminAuth", "true");
      window.location.href = "admin.html";
    } else {
      alert("Wrong PIN");
    }
  });
});