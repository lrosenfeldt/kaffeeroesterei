import Dropdown from "./dropdown";
import initProductPage from "./productPage";

function initDropdown() {
  const dropdownButton = document.querySelector(".dropdown__button");
  const dropdownListbox = document.querySelector(".dropdown__list");
  if (dropdownButton && dropdownListbox) {
    new Dropdown(dropdownButton, dropdownListbox, "");
  } else {
    console.warn("no dropdown found");
  }
}

window.addEventListener("load", () => {
  initProductPage();
  initDropdown();
});
