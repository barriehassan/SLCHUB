// Global storage for demo purposes
let registeredCreators = [];

// Mobile menu toggle
const mobileMenuButton = document.querySelector(".mobile-menu-button");
const mobileMenu = document.querySelector("#mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Page routing/nav
const navLinks = document.querySelectorAll("a.nav-link");
const pageSections = document.querySelectorAll(".page-section");

// Show homepage by default
document.querySelector("#homepage").classList.remove("hidden");

function showSection(sectionId) {
  pageSections.forEach((section) => {
    section.classList.add("hidden");
    if (section.id === sectionId) {
      section.classList.remove("hidden");
    }
  });
}

// Handle all navigation links
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");
    if (href.startsWith("#")) {
      const sectionId = href.substring(1);
      showSection(sectionId);
      window.scrollTo(0, 0);
    }
  });
});

// Active nav link styling
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((navLink) => {
      navLink.classList.remove("border-blue-500", "text-gray-900");
      navLink.classList.add("border-transparent", "text-gray-500");
    });

    this.classList.remove("border-transparent", "text-gray-500");
    this.classList.add("border-blue-500", "text-gray-900");
  });
});

// Admin login handler
// Render registered creators in admin dashboard
function renderCreators() {
  const tbody = document.querySelector("#admin-dashboard table tbody");
  tbody.innerHTML = "";

  registeredCreators.forEach((creator) => {
    const date = new Date(creator.id).toLocaleDateString();
    const statusClass = creator.status.includes("Pending")
      ? "bg-yellow-100 text-yellow-800"
      : "bg-green-100 text-green-800";

    const row = document.createElement("tr");
    row.className = "hover:bg-gray-50";
    row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">
                        <input type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                                <i class="fas fa-user text-gray-500"></i>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${creator.name}</div>
                                <div class="text-sm text-gray-500">@${creator.username}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">${creator.platform}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">${creator.followers}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">${date}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
                            ${creator.status}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                        <a href="#" class="text-green-600 hover:text-green-900">Verify</a>
                        <a href="#" class="text-blue-600 hover:text-blue-900">View</a>
                        <a href="#" class="text-red-600 hover:text-red-900">Reject</a>
                    </td>
                `;
    tbody.appendChild(row);
  });
}

// Add click handlers for admin actions
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("text-green-600")) {
    // Verify
    const username = e.target
      .closest("tr")
      .querySelector(".text-gray-500")
      .textContent.substring(1);
    const creator = registeredCreators.find((c) => c.username === username);
    if (creator) creator.status = "Verified";
    renderCreators();
    e.preventDefault();
  } else if (e.target.classList.contains("text-red-600")) {
    // Reject
    const username = e.target
      .closest("tr")
      .querySelector(".text-gray-500")
      .textContent.substring(1);
    const creator = registeredCreators.find((c) => c.username === username);
    if (creator) creator.status = "Rejected";
    renderCreators();
    e.preventDefault();
  }
});

const adminLoginForm = document.querySelector("#admin-login-form");
if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.querySelector("#admin-username").value;
    const password = document.querySelector("#admin-password").value;

    // Simple validation for demo
    if (username === "admin" && password === "admin123") {
      showSection("admin-dashboard");
      renderCreators();
    } else {
      alert("Invalid credentials. For demo purposes, use: admin / admin123");
    }
  });
}

// Mock login - for demo purposes only
const loginForm = document.querySelector("#login form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.querySelector("#login-username").value;
    const password = document.querySelector("#login-password").value;

    if (username.includes("admin")) {
      showSection("admin-dashboard");
    } else {
      document.querySelector(
        "#welcome-message"
      ).textContent = `Welcome, ${username}!`;
      showSection("creator-dashboard");
    }
  });
}

// Mock registration - for demo purposes only
const registerForm = document.querySelector("#register form");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Registration submitted! For this demo, you can now login.");
    showSection("login");
  });
}
