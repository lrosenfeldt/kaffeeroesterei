const burgerMenu = document.querySelector(".burger-menu");
const navbar = document.querySelector(".navbar");
const navbarLogo = document.querySelector(".navbar > .logo");

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
