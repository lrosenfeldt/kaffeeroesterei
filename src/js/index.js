// import myFunction, { multiply } from "./myModule";

// myFunction();

// const result = multiply(2, 5);

// console.log(result);

console.log("it works!");

const burgerMenu = document.querySelector(".burger-menu");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");

const navbar = document.querySelector(".navbar");
const navbarLogo = document.querySelector(".navbar > .logo");

const header = document.querySelector(".header");
const coffeeDisplay = document.querySelector(".coffee-display");

burgerMenu.addEventListener("click", function () {
  overlay.classList.toggle("overlay--visible");
  body.classList.toggle("body--noscroll");
  if (
    !burgerMenu.classList.contains("burger-menu--light") &&
    !burgerMenu.classList.contains("burger-menu--clicked")
  ) {
    burgerMenu.classList.add("burger-menu--light");
  } else if (
    burgerMenu.classList.contains("burger-menu--clicked") &&
    !navbar.classList.contains("navbar--light")
  ) {
    burgerMenu.classList.remove("burger-menu--light");
  }
  burgerMenu.classList.toggle("burger-menu--clicked");
});

const options = {
  root: null,
  rootMargin: "0px 0px -95% 0px",
};

function darkNavbar() {
  navbar.classList.remove("navbar--light");
  navbarLogo.classList.remove("logo--light");
  burgerMenu.classList.remove("burger-menu--light");
}

function lightNavbar() {
  navbar.classList.add("navbar--light");
  navbarLogo.classList.add("logo--light");
  burgerMenu.classList.add("burger-menu--light");
}

const notAnyIntersection = (entries) => {
  return entries.reduce((accumulator, currentValue) => {
    return !currentValue.isIntersecting === accumulator;
  }, true);
};

const observer = new IntersectionObserver(function (entries, observer) {
  if (notAnyIntersection(entries)) {
    darkNavbar();
  } else {
    lightNavbar();
  }
}, options);

observer.observe(header);
observer.observe(coffeeDisplay);
