import products from "./products.json";
import productImages from "../images/products/*.png";
import productTags from "../images/products/tags/*.png";

function loadCartFromStorage() {
  return JSON.parse(window.localStorage.getItem("products"));
}

function retrieveImageSource(selectedProduct) {
  const fullProduct = products.find(
    (product) => product.id === selectedProduct.id
  );
  return productImages[fullProduct.image];
}

function weightToText(weight) {
  if (weight >= 1000) {
    return `${weight / 1000} kg`.replaceAll(".", ",");
  }
  return `${weight} g`;
}

function formattedPrice(price) {
  return `${(price / 100).toFixed(2)}€`.replace(".", ",");
}

function formattedType(type) {
  if (type === "ground") {
    return "gemahlen";
  }
  return "Bohnen";
}

function productNameById(id) {
  return products.find((product) => product.id === id).productName;
}

function fillCartItemTemplate(product, index) {
  return `
    <div class="cart-item" id="${index}">
      <div class="cart-item__image-box">
        <img
          class="image cart-item__image"
          src="${retrieveImageSource(product)}"
          alt="Eine Packung unseres Kaffees ${productNameById(product.id)}"
        />
      </div>
      <div class="cart-item__info-grid">
        <h3 class="h3">${productNameById(product.id)}</h3>
        <div>
          <p class="text">${formattedType(product.type)}</p>
          <p class="text">${weightToText(product.weight)}</p>
          <p class="text cart-item__quantity">${product.quantity}</p>
        </div>
        <p class="text bold">sofort versandbereit</p>
        <p class="subhead-m cart-item__price">${formattedPrice(
          product.quantity * product.price
        )}</p>
        <button class="cart-item__remove-button" data-index="${index}"></button>
      </div>
    </div>
  `;
}

function removeItemFromDOM(index) {
  const itemElement = document.getElementById(index);
  itemElement.classList.add("cart-item--greyed");
  setTimeout(() => {
    itemElement.remove();
  }, 500);
}

function removeItemFromCart(cartProducts, index) {
  const newCart = cartProducts.filter(
    (product, productIndex) => index !== productIndex
  );
  window.localStorage.setItem("products", JSON.stringify(newCart));
}

function decrementQuantity(cartProducts, index) {
  const newCart = [...cartProducts];
  newCart[index].quantity -= 1;
  window.localStorage.setItem("products", JSON.stringify(newCart));
}

function updateHeadingElement(length) {
  const quantityElement = document.querySelector(".cart-heading-box > .text");
  if (length === 1) {
    quantityElement.textContent = `${length} Produkt`;
    return;
  }
  quantityElement.textContent = `${length} Produkte`;
}

function updateItemElement(price, quantity, index) {
  const itemElement = document.getElementById(index);
  const quantityElement = itemElement.querySelector(".cart-item__quantity");
  quantityElement.textContent = `${quantity - 1}`;
  const priceElement = itemElement.querySelector(".cart-item__price");
  priceElement.textContent = `${formattedPrice((quantity - 1) * price)}`;
}

function removeItemByIndex(index) {
  const cartProducts = loadCartFromStorage();
  const { quantity } = cartProducts[index];
  if (quantity === 1) {
    removeItemFromDOM(index);
    removeItemFromCart(cartProducts, index);
    updateHeadingElement(cartProducts.length - 1);
  } else {
    const singleItemPrice = cartProducts[index].price;
    decrementQuantity(cartProducts, index);
    updateItemElement(singleItemPrice, quantity, index);
  }
}

function sumPrices(cartProducts) {
  return cartProducts.reduce(
    (accumulator, currentProduct) =>
      accumulator +
      parseInt(currentProduct.quantity, 10) *
        parseInt(currentProduct.price, 10),
    0
  );
}

function updateBalance(cartProducts) {
  const productPrices = sumPrices(cartProducts);
  let shipping = 390;
  if (productPrices >= 2000) {
    shipping = 0;
  }
  const productElement = document.getElementById("balance-products");
  productElement.textContent = `${formattedPrice(productPrices)}`;
  const shippingElement = document.getElementById("balance-shipping");
  shippingElement.textContent = `${formattedPrice(shipping)}`;
  const totalElement = document.getElementById("balance-total");
  totalElement.textContent = `${formattedPrice(productPrices + shipping)}`;
}

function handleRemoveButton() {
  const itemIndex = parseInt(this.dataset.index, 10);
  removeItemByIndex(itemIndex);
  updateBalance(loadCartFromStorage());
}

function initCart() {
  const cartProducts = loadCartFromStorage();
  const cartElement = document.querySelector(".cart");
  if (!cartProducts || cartProducts.length === 0) {
    console.log("test");
    cartElement.innerHTML = `<a class="subhead-m cart__link" href="/shop/index.html">...Zum Shop</a>`;
    return;
  }
  cartElement.innerHTML = cartProducts.map(fillCartItemTemplate).join("");
  updateHeadingElement(cartProducts.length);
  updateBalance(cartProducts);
  const buttons = document.querySelectorAll(".cart-item__remove-button");
  buttons.forEach((button) => {
    button.addEventListener("click", handleRemoveButton);
  });
}

export default initCart;
