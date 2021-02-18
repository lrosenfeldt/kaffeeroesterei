// import myFunction, { multiply } from "./myModule";

// myFunction();

// const result = multiply(2, 5);

// console.log(result);

import { doc } from "prettier";
import Dropdown from "./dropdown";
import initDarkSectionObserver from "./darkSectionObserver";

const elementsToBeObserved = [
  document.querySelector(".header"),
  document.querySelector(".coffee-display"),
  document.querySelector(".gallery-m"),
  document.querySelector(".gallery-desktop"),
];

initDarkSectionObserver(elementsToBeObserved);

const dropdownButton = document.querySelector(".dropdown__button");
const dropdownListbox = document.querySelector(".dropdown__list");
if (dropdownButton && dropdownListbox) {
  new Dropdown(dropdownButton, dropdownListbox);
} else {
  console.warn("no dropdown found");
}
