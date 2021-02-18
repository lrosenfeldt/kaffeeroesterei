const burgerMenu = document.querySelector(".burger-menu");
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");

const navbar = document.querySelector(".navbar");

function enableBurgerMenu() {
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

export default enableBurgerMenu;
