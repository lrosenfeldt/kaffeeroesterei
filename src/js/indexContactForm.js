import Dropdown from "./dropdown";
import ContactForm from "./contactForm";

window.addEventListener("load", () => {
  const dropdownButton = document.querySelector(".dropdown__button");
  const dropdownListbox = document.querySelector(".dropdown__list");
  if (dropdownButton && dropdownListbox) {
    new Dropdown(dropdownButton, dropdownListbox, "Dein Betreff:");
  } else {
    console.warn("no dropdown found");
  }

  const formNode = document.forms["contact-form"];
  if (formNode) {
    new ContactForm(formNode);
  }
});
