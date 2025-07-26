// Auth JS with Firebase
const auth = firebase.auth();

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const role = document.getElementById("role").value;

      try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Save role in localStorage (or Firestore for production)
        localStorage.setItem("userRole", role);

        alert("Registration successful!");
        window.location.href = "login.html";
      } catch (error) {
        alert("Error: " + error.message);
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        const role = localStorage.getItem("userRole") || "user"; // replace with Firestore logic if needed

        if (role === "admin") {
          window.location.href = "dashboard.html";
        } else {
          window.location.href = "user-dashboard.html";
        }
      } catch (error) {
        alert("Login failed: " + error.message);
      }
    });
  }
});
