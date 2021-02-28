// import myFunction, { multiply } from "./myModule";

// myFunction();

// const result = multiply(2, 5);

// console.log(result);

import { doc } from "prettier";
import initDarkSectionObserver from "./darkSectionObserver";
import enableBurgerMenu from "./burgeMenu";

console.log("hello world");

window.addEventListener("load", () => {
  enableBurgerMenu();

  const elementsToBeObserved = [
    document.querySelector(".header"),
    document.querySelector(".coffee-display"),
    document.querySelector(".gallery-m"),
    document.querySelector(".gallery-desktop"),
  ];

  initDarkSectionObserver(elementsToBeObserved);
});
