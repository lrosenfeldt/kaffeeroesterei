import products from "./products.json";
import productImages from "../images/products/*.png";
import productTags from "../images/products/tags/*.png";

function addShopGrid() {
  const shop = document.querySelector(".shop");
  shop.classList.add("shop--filled");
}

function formattedPrice(product) {
  const minPrice = product.variants[0].price / 100;
  const maxPrice = product.variants[product.variants.length - 1].price / 100;
  return `${minPrice.toFixed(2)}€ – ${maxPrice.toFixed(2)}€`.replaceAll(
    ".",
    ","
  );
}

function fillTemplate(product) {
  return `
    <div class="product">
    <img
      class="image product__image-box"
      src="${productImages[product.image]}"
      alt="Eine Packung unserers Kaffess ${product.productName}"
    />
    <p class="subhead-m product__name">${product.productName}</p>
    <p class="text product__price">${formattedPrice(product)}</p>
    <div class="product__tag-row">
      <img
        class="image product__tag"
        src="/images/icons/icon_coffee_beans.png"
      />
      <img
        class="image product__tag"
        src="/images/icons/icon_coffee_shovel.png"
      />
      <img
        class="image product__tag"
        src="/images/icons/icon_coffee_french-press.png"
      />
    </div>
  </div>
  `;
}

function populateShop() {
  const productTemplates = products.map(fillTemplate).join("");
  const shop = document.querySelector(".shop");
  addShopGrid();
  shop.innerHTML = productTemplates;
}

function initShop() {
  // simulate loading
  console.log("test");
  console.log(productImages);
  setTimeout(populateShop, 1000);
}

export default initShop;
