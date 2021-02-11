// import myFunction, { multiply } from "./myModule";

// myFunction();

// const result = multiply(2, 5);

// console.log(result);

console.log("it works!");

const burger_menu = document.querySelector(".burger-menu");
const overlay = document.querySelector(".overlay");

burger_menu.addEventListener("click", function () {
  burger_menu.classList.toggle("burger-menu--clicked");
  overlay.classList.toggle("overlay--visible");
});
