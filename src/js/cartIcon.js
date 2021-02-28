window.addEventListener("load", () => {
  const cartProducts = JSON.parse(window.localStorage.getItem("products"));
  if (!cartProducts || cartProducts.length === 0) {
    return;
  }
  const cartIcons = document.querySelectorAll(".cart-icon");
  cartIcons.forEach((icon) => icon.classList.add("cart-icon--filled"));
});
