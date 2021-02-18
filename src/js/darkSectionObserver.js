const burgerMenu = document.querySelector(".burger-menu");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");

const navbar = document.querySelector(".navbar");
const navbarLogo = document.querySelector(".navbar > .logo");

function registerEvents() {
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
}

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

function notAnyIntersection(entries) {
  return entries.reduce((accumulator, currentValue) => {
    return !currentValue.isIntersecting === accumulator;
  }, true);
}

function createDarkSectionObserver() {
  return new IntersectionObserver((entries, observer) => {
    if (notAnyIntersection(entries)) {
      darkNavbar();
    } else {
      lightNavbar();
    }
  }, options);
}

function initDarkSectionObserver(elementsToBeObserved) {
  const observer = createDarkSectionObserver();
  elementsToBeObserved.forEach((element) => {
    if (element) {
      observer.observe(element);
    }
  });
}

export default initDarkSectionObserver;
