// import myFunction, { multiply } from "./myModule";

// myFunction();

// const result = multiply(2, 5);

// console.log(result);

import { doc } from "prettier";
import initDarkSectionObserver from "./darkSectionObserver";
import NavbarColorer from "./NavbarColorer";
import enableBurgerMenu from "./burgeMenu";

window.addEventListener("load", () => {
  enableBurgerMenu();
  new NavbarColorer();
});
