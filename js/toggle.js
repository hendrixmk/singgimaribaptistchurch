document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.getElementById("navLinks");
  document.querySelector(".fa-bars").addEventListener("click", () => {
    navLinks.style.right = "0";
  });
  document.querySelector(".fa-times").addEventListener("click", () => {
    navLinks.style.right = "-200px";
  });
});