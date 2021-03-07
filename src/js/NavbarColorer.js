import { loadCartFromStorage } from "./utils.js";

class NavbarColorer {
  constructor() {
    this.navbarElement = document.querySelector(".navbar");
    this.burgerMenuElement = document.querySelector(".burger-menu");
    this.logoElement = document.querySelector(".navbar > .logo");
    this.cartIconElements = document.querySelectorAll(".cart-icon");
    this.headerObserver = this.createHeaderObserver();
    this.registerIntersection();
    if (!this.isCartEmpty) {
      this.addFilledCartIcon();
    }
  }

  isCartEmpty() {
    const cartProducts = loadCartFromStorage();
    return !cartProducts || cartProducts.length === 0;
  }

  addFilledCartIcon() {
    this.cartIconElements.forEach((element) => {
      element.classList.add("cart-icon--filled");
    });
  }

  removeFilledCartIcon() {
    this.cartIconElements.forEach((element) => {
      element.classList.remove("cart-icon--filled");
    });
  }

  lightNavbar() {
    this.navbarElement.classList.add("navbar--light");
    this.burgerMenuElement.classList.add("icon-inverted");
    this.logoElement.classList.add("icon-inverted");
    this.cartIconElements.forEach((element) => {
      element.classList.add("icon-inverted");
    });
  }

  darkNavbar() {
    this.navbarElement.classList.remove("navbar--light");
    this.burgerMenuElement.classList.remove("icon-inverted");
    this.logoElement.classList.remove("icon-inverted");
    this.cartIconElements.forEach((element) => {
      element.classList.remove("icon-inverted");
    });
  }

  createHeaderObserver() {
    return new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            this.lightNavbar();
          } else {
            this.darkNavbar();
          }
        });
      },
      { threshold: 0.1 }
    );
  }

  registerIntersection() {
    const headerElement = document.querySelector(".header");
    if (headerElement) {
      this.headerObserver.observe(headerElement);
      return;
    }
    this.lightNavbar();
  }

  registerCartAction() {
    window.addEventListener("storage", () => {
      if (this.isCartEmpty) {
        this.removeFilledCartIcon();
      } else {
        this.addFilledCartIcon();
      }
    });
  }
}

export default NavbarColorer;
