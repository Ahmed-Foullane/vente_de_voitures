let humbergerBar = document.querySelector(".humberger");

let navMenu = document.querySelector("nav");

let navItems = document.querySelectorAll(".navItem");

let logInBtn = document.getElementById("loginUser");
let signUpBtn = document.getElementById("signUpBtn");
let openEye = document.querySelectorAll(".open");
let closeEye = document.querySelectorAll(".close");

let loginInEmail = document.getElementById("email");
let logInPassword = document.getElementById("password");

let sginUpEamil = document.getElementById("sginUpEamil");
let signUpPassword = document.getElementById("signUpPassword");

let navLogOutBtn = document.querySelector(".navLogOut");
let navLogInBtn = document.querySelector(".navLoginBtn");
let navSignUp = document.querySelector(".navSignUp");

let confirmPassword = document.querySelector(".confirmPassword");

let user = {
  isUserExist: false,
};

let userJson = JSON?.parse(localStorage.getItem("userInfo"));

function sendUserDataToStorage(exist) {
  userJson = JSON.parse(localStorage.getItem("userInfo"));
  userJson.isUserExist = exist;
  localStorage.setItem("userInfo", JSON.stringify(userJson));
  userJson = JSON.parse(localStorage.getItem("userInfo"));
}
humbergerBar.addEventListener("click", () => {
  humbergerBar.classList.toggle("active");
  navMenu.classList.toggle("active");
});

navItems.forEach((e) => {
  e.addEventListener("click", () => {
    navItems.forEach((i) => {
      i.classList.remove("activeColor");
    });
    e.classList.add("activeColor");
  });
});

navItems.forEach((e) => {
  e.addEventListener("click", () => {
    humbergerBar.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

user.email = "ahmed";
user.password = "hello";
openEye.forEach((e) => {
  e.addEventListener("click", () => {
    e.style.display = "none";
    e.nextElementSibling.style.display = "block";
    e.previousElementSibling.type = "password";
  });
});

closeEye.forEach((e) => {
  e.addEventListener("click", () => {
    e.style.display = "none";
    e.previousElementSibling.style.display = "block";
    e.previousElementSibling.previousElementSibling.type = "text";
  });
});

function registerUserAndChangeUrl() {
  user.email = sginUpEamil.value;
  user.password = signUpPassword.value;
  user.isUserExist = true;
  localStorage.setItem("userInfo", JSON.stringify(user));
  userJson = JSON.parse(localStorage.getItem("userInfo"));
  changeStyleIfUserLoginOrExist();
  location.href = "http://127.0.0.1:5500/pages/index.html";
}

function changeStyleIfUserLoginOrExist() {
  // now that you now taht you nowh o to

  if (userJson.isUserExist) {
    if (navLogInBtn) navLogInBtn.style.display = "none";
    if (navSignUp) navSignUp.style.display = "none";
    if (navLogOutBtn) navLogOutBtn.style.display = "flex";
  } else {
    if (navLogInBtn) navLogInBtn.style.display = "flex";
    if (navSignUp) navSignUp.style.display = "flex";
    if (navLogOutBtn) navLogOutBtn.style.display = "none";
  }
}

logInBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  user.email = loginInEmail.value;
  user.password = logInPassword.value;
  if (
    userJson.email == loginInEmail.value &&
    userJson.password == logInPassword.value
  ) {
    sendUserDataToStorage(true);
    changeStyleIfUserLoginOrExist();
    location.href = "http://127.0.0.1:5500/pages/index.html";
  } else {
    Swal.fire({
      icon: "error",
      title: "incorect email or password!",
    });
  }
});

signUpBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  let strongPassword = false;
  let validEmail = false;
  let comparePassword = false;

  if (signUpPassword.value.length > 5) {
    strongPassword = true;
  } else {
    Swal.fire({
      icon: "error",
      title: "enter a password has more then 5 characters!",
    });
  }

  if (sginUpEamil.value.includes("@") && sginUpEamil.value.includes(".com")) {
    validEmail = true;
  } else {
    Swal.fire({
      icon: "error",
      title: "please provide an email!",
    });
  }

  if (signUpPassword.value == confirmPassword.value) {
    comparePassword = true;
  } else {
    Swal.fire({
      icon: "error",
      title: "your password are not the same!",
    });
  }

  if (strongPassword && validEmail && comparePassword) {
    registerUserAndChangeUrl();
  }
});

navLogOutBtn.addEventListener("click", () => {
  sendUserDataToStorage(false);
  changeStyleIfUserLoginOrExist();
});

changeStyleIfUserLoginOrExist();
