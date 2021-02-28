/* eslint-disable no-useless-return */
import products from "./products.json";
import productImages from "../images/products/*.png";
import productTags from "../images/products/tags/*.png";

function addShopGrid(shop) {
  shop.classList.add("coffee-display__grouping");
}

function formattedPrice(product) {
  const minPrice = product.variants[0].price / 100;
  const maxPrice = product.variants[product.variants.length - 1].price / 100;
  return `${minPrice.toFixed(2)}€ – ${maxPrice.toFixed(2)}€`.replaceAll(
    ".",
    ","
  );
}

function fillTagTemplate(tag) {
  return `
    <div class="coffee-tag-row__container">
      <img
        class="image"
        src="${productTags[tag.image]}"
        alt="${tag.name}"
      />
    </div>
  `;
}

function addHTMLTagIcon(product) {
  return product.tags.map(fillTagTemplate).join("");
}

function fillTemplate(product) {
  return `
    <div class="coffee-item">
      <a class="coffee-item__image-box" href="/produkt/index.html?id=${
        product.id
      }">
        <img
          class="image coffee-item__image"
          src="${productImages[product.image]}"
          alt="Eine Packung unserers Kaffess ${product.productName}"
        />
      </a>
      <p class="subhead-m coffee-item__name--light">${product.productName}</p>
      <p class="text coffee-item__pricetag">${formattedPrice(product)}</p>
      <div class="coffee-tag-row">
        ${addHTMLTagIcon(product)}
      </div>
    </div>
  `;
}

function populateShop() {
  const productTemplates = products.map(fillTemplate).join("");
  const shop = document.querySelector(".shop");
  addShopGrid(shop);
  shop.innerHTML = productTemplates;
}

function initShop() {
  populateShop();
}

export default initShop;
