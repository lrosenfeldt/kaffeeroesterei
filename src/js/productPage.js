/* eslint-disable no-useless-return */
import { doc } from "prettier";
import products from "./products.json";
import productImages from "../images/products/*.png";
import tagImages from "../images/products/tags/*.png";
import addToCart from "./addToCart";

function pullProduct() {
  const pageURL = new URL(window.location.href);
  const productId = parseInt(pageURL.searchParams.get("id"), 10);
  // add if-case for product not found
  return products.find((product) => product.id === productId);
}

function formattedPrice(price) {
  return `${(price / 100).toFixed(2)}€`.replace(".", ",");
}

function variantWeightToText(weight) {
  if (weight >= 1000) {
    return `${weight / 1000} kg`.replaceAll(".", ",");
  }
  return `${weight} g`;
}

function fillVariantTemplateGrinded(variant, index) {
  return `
    <li class="dropdown__list-item" id="${index}-ground" role="option" data-price="${
    variant.price
  }" data-weight="${variant.weight}" data-type="ground">
      ${variantWeightToText(variant.weight)} gemahlen – ${formattedPrice(
    variant.price
  )}
    </li>
  `;
}

function fillVariantTemplateBeans(variant, index) {
  return `
    <li class="dropdown__list-item" id="${index}-beans" role="option" data-price="${
    variant.price
  }" data-weight="${variant.weight}" data-type="beans">
      ${variantWeightToText(variant.weight)} Bohnen – ${formattedPrice(
    variant.price
  )}

    </li>
  `;
}

function sortVariantsByWeight(product) {
  return product.variants.sort((variant1, variant2) => {
    return variant1.weight - variant2.weight;
  });
}

function addHTMLProductVariants(variants) {
  return [
    ...variants.map(fillVariantTemplateGrinded),
    ...variants.map(fillVariantTemplateBeans),
  ].join("");
}

function formattedPriceRange(product) {
  const minPrice = product.variants[0].price / 100;
  const maxPrice = product.variants[product.variants.length - 1].price / 100;
  return `${minPrice.toFixed(2)}€ – ${maxPrice.toFixed(2)}€`.replaceAll(
    ".",
    ","
  );
}

function fillTagTemplate(tag) {
  return `
    <figure>
      <img
        class="image product-showcase__tag"
        src="${tagImages[tag.image]}";
        alt="${tag.name}"
      />
      <figcaption class="product-showcase__tag-caption">
        ${tag.name}
      </figcaption>
    </figure>
  `;
}

function addHTMLTagIcons(tags) {
  return tags.map(fillTagTemplate).join("");
}

function fillTemplate(product) {
  return `
    <div class="product-showcase__image-container">
      <img
        class="image";
        src="${productImages[product.image]}"
        alt="Eine Packung unserers Kaffees ${product.productName}"
      />
    </div>
    <h2 class="text h2 product-showcase__heading">${product.productName}</h2>
    <p class="text product-showcase__price">${formattedPriceRange(product)}</p>
    <p class="text product-showcase__text">${product.abstract}</p>
    <div class="dropdown product-showcase__dropdown">
      <button
        aria-haspopup="listbox"
        aria-labelledby="dropdown__button"
        class="text dropdown__button"
        id="subject-dropdown"
        type="button"
        aria-required="true"
        aria-invalid="false"
        tabindex="6"
      >
        Wie viel Kaffee brauchst du?
      </button>
      <ul
        class="text dropdown__list dropdown__list--hidden"
        id="subject-listbox"
        tabindex="-1"
        role="listbox"
        aria-labelledby="dropdown__button"
        aria-expanded="false"
      >
        ${addHTMLProductVariants(sortVariantsByWeight(product))}
      </ul>
    </div>
    <button class="button product-showcase__button">
      <span class="text button__text">Warenkorb</span>
    </button>
    <div class="product-showcase__message" id="messageBox">
      <p class="text"></p>
    </div> 
    <div class="product-showcase__tag-grid">
      ${addHTMLTagIcons(product.tags)}
    </div>
      `;
}

function addHTMLDescription(product) {
  const descriptionElement = document.querySelector(".product-description");
  descriptionElement.innerHTML = `
    <h3 class="h3">Beschreibung</h3>
    <p class="text product-description__text">${product.description}</p>
  `;
}

function processProductRequest() {
  const product = pullProduct();
  const showcase = document.querySelector(".product-showcase");
  const productHTML = fillTemplate(product);
  showcase.classList.add("product-showcase--filled");
  showcase.innerHTML = productHTML;
  addHTMLDescription(product);
}

function removeDropdownMessage() {
  const messageBoxElement = document.getElementById("messageBox");
  const messageText = messageBoxElement.firstElementChild;
  messageBoxElement.classList.remove("product-showcase__remove--active");
  messageText.removeAttribute("role");
  messageText.textContent = "";
}

function showDropdownMessage(msg, isAlert) {
  const messageBoxElement = document.getElementById("messageBox");
  const messageText = messageBoxElement.firstElementChild;
  messageText.textContent = `${msg}`;
  if (isAlert) {
    messageText.setAttribute("role", "alert");
  }
  messageBoxElement.classList.add("product-showcase__message--active");
}

function retrieveSelectedProduct() {
  const dropdown = document.querySelector(".dropdown");
  const selectedVariantElement = dropdown.querySelector(
    '[aria-selected="true"]'
  );
  if (!selectedVariantElement) {
    showDropdownMessage("Gute Wahl! Wie viel Kaffee möchtest du?", true);
    return null;
  }
  removeDropdownMessage();
  const product = pullProduct();
  // eslint-disable-next-line consistent-return
  return {
    id: product.id,
    name: product.name,
    price: selectedVariantElement.dataset.price,
    weight: selectedVariantElement.dataset.weight,
    type: selectedVariantElement.dataset.type,
    quantity: 1,
  };
}

function handleCartButton() {
  const selectedProduct = retrieveSelectedProduct();
  if (!selectedProduct) {
    return;
  }
  addToCart(selectedProduct);
  showDropdownMessage("Hinzugefügt!", false);
}

function registerEvents() {
  const button = document.querySelector(".product-showcase__button");
  button.addEventListener("click", handleCartButton);
}

function initProductPage() {
  processProductRequest();
  registerEvents();
}

export default initProductPage;
