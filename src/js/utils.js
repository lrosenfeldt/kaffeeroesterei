export function formattedPrice(price) {
  return `${(price / 100).toFixed(2)}€`.replace(".", ",");
}

export function formattedPriceRange(product) {
  const minPrice = product.variants[0].price / 100;
  const maxPrice = product.variants[product.variants.length - 1].price / 100;
  return `${minPrice.toFixed(2)}€ – ${maxPrice.toFixed(2)}€`.replaceAll(
    ".",
    ","
  );
}

export function loadCartFromStorage() {
  return JSON.parse(window.localStorage.getItem("products"));
}

export function weightToText(weight) {
  if (weight >= 1000) {
    return `${weight / 1000} kg`.replaceAll(".", ",");
  }
  return `${weight} g`;
}
