
function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const navActions = document.querySelector(".nav-actions");

  const signupBtn = document.getElementById("signupBtn");
  const loginBtn = document.getElementById("loginBtn");
  const applyPassBtn = document.getElementById("applyPassBtn");
  const createAccountBtn = document.getElementById("createAccountBtn");

  if (isLoggedIn()) {
    const userName = localStorage.getItem("userName") || "User";

    if (navActions) {
      navActions.innerHTML = `
        <span style="color:#fff; margin-right:1rem;">
          Hi, <strong>${userName}</strong>
        </span>
        <button id="logoutBtn" class="btn-login">Logout</button>
      `;

      document
        .getElementById("logoutBtn")
        .addEventListener("click", logout);
    }
  } else {
    if (signupBtn) {
      signupBtn.addEventListener("click", () => {
        window.location.href = "pages/signup.html";
      });
    }

    if (loginBtn) {
      loginBtn.addEventListener("click", () => {
        window.location.href = "pages/login.html";
      });
    }
  }


  if (applyPassBtn) {
    applyPassBtn.addEventListener("click", () => {
      if (isLoggedIn()) {
        window.location.href = "pages/apply-pass.html";
      } else {
        window.location.href = "pages/login.html";
      }
    });
  }


  if (createAccountBtn) {
    createAccountBtn.addEventListener("click", () => {
      if (isLoggedIn()) {
        window.location.href = "pages/apply-pass.html";
      } else {
        window.location.href = "pages/signup.html";
      }
    });
  }
});
