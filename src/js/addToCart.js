function addToCart(selectedProduct) {
  const cartProducts = JSON.parse(window.localStorage.getItem("products"));
  const cartIcon = document.getElementById("cartIcon");
  if (!cartIcon.classList.contains("cart-icon--filled")) {
    cartIcon.classList.add("cart-icon--filled");
  }

  if (!cartProducts) {
    const newCart = [selectedProduct];
    window.localStorage.setItem("products", JSON.stringify(newCart));
    return;
  }

  const index = cartProducts.findIndex(
    (product) =>
      product.id === selectedProduct.id &&
      product.weight === selectedProduct.weight &&
      product.type === selectedProduct.type
  );

  if (index === -1) {
    const newCart = [...cartProducts, selectedProduct];
    window.localStorage.setItem("products", JSON.stringify(newCart));
    return;
  }

  const newCart = [...cartProducts];
  newCart[index].quantity += 1;
  window.localStorage.setItem("products", JSON.stringify(newCart));
}

export default addToCart;
