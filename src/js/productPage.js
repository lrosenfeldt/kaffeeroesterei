/* eslint-disable no-useless-return */
import products from "./products.json";
import productImages from "../images/products/*.png";
import tagImages from "../images/products/tags/*.png";

function pullProduct() {
  const pageURL = new URL(window.location.href);
  const productId = pageURL.searchParams.get("id");
  // add if-case for product not found
  return products[productId];
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

function fillVariantTemplateGrinded(variant) {
  return `
    <li class="dropdown__list-item" id="option-shipping" role="option">
      ${variantWeightToText(variant.weight)} gemahlen – ${formattedPrice(
    variant.price
  )}
    </li>
  `;
}

function fillVariantTemplateBeans(variant) {
  return `
    <li class="dropdown__list-item" id="option-shipping" role="option">
      ${variantWeightToText(variant.weight)} Bohnen – ${formattedPrice(
    variant.price
  )}

    </li>
  `;
}

function addHTMLProductVariants(product) {
  return [
    ...product.variants.map(fillVariantTemplateGrinded),
    ...product.variants.map(fillVariantTemplateBeans),
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
        class="image"
        src="${productImages[product.image]}"
      />
    </div>
    <h2 class="text h2 product-showcase__heading">${product.productName}</h2>
    <p class="text product-showcase__price">${formattedPriceRange(product)}</p>
    <p class="text product-showcase__text">${product.description}</p>
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
        ${addHTMLProductVariants(product)} 
      </ul>
    </div>
    <button class="button product-showcase__button">
      <span class="text button__text">Warenkorb</span>
    </button>
    <div class="product-showcase__tag-grid">
      ${addHTMLTagIcons(product.tags)}
    </div>
      `;
}

function processProductRequest() {
  const product = pullProduct();
  const showcase = document.querySelector(".product-showcase");
  const productHTML = fillTemplate(product);
  showcase.classList.add("product-showcase--filled");
  showcase.innerHTML = productHTML;
}

function retrieveVariant() {
  console.log("foo");
}

function addToBasket() {
  console.log("happy");
}

function registerEvents() {
  const button = document.querySelector(".product-showcase__button");
  button.addEventListener("click", addToBasket);
}

function initProductPage() {
  processProductRequest();
  registerEvents();
}

export default initProductPage;
