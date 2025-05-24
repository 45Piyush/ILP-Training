// DOM Elements
const homeScreen = document.getElementById("home-screen");
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const successMessage = document.getElementById("success-message");
const registerBtn = document.getElementById("register-btn");
const loginBtn = document.getElementById("login-btn");
const switchToLogin = document.getElementById("switch-to-login");
const switchToRegister = document.getElementById("switch-to-register");
const goToLogin = document.getElementById("go-to-login");
const registrationForm = document.getElementById("registration-form");
const loginFormData = document.getElementById("login-form-data");

// Switch between forms
registerBtn.addEventListener("click", () => {
  homeScreen.classList.remove("active-form");
  loginForm.classList.remove("active-form");
  registerForm.classList.add("active-form");
});

loginBtn.addEventListener("click", () => {
  homeScreen.classList.remove("active-form");
  registerForm.classList.remove("active-form");
  loginForm.classList.add("active-form");
});

switchToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerForm.classList.remove("active-form");
  loginForm.classList.add("active-form");
});

switchToRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.remove("active-form");
  registerForm.classList.add("active-form");
});

goToLogin.addEventListener("click", () => {
  successMessage.style.display = "none";
  loginForm.classList.add("active-form");
});

// Handle registration form submission
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  // Generate random user ID (6 digits)
  const userId = "USER" + Math.floor(100000 + Math.random() * 900000);

  // Display success message with user details
  document.getElementById("user-id").textContent = userId;
  document.getElementById("display-username").textContent = username;
  document.getElementById("display-email").textContent = email;

  // Show success message
  registerForm.classList.remove("active-form");
  successMessage.style.display = "block";

  // Reset form
  registrationForm.reset();
});

// Handle login form submission
loginFormData.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Login functionality would connect to backend in a real application");
  // In a real app, you would validate credentials and redirect
  // window.location.href = 'home.html';
});
