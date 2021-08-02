// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/dropdown.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-useless-return */
var Dropdown = /*#__PURE__*/function () {
  function Dropdown(button, listboxNode, buttonText) {
    _classCallCheck(this, Dropdown);

    this.button = button;
    this.listboxNode = listboxNode;
    this.activeDescendant = this.listboxNode.getAttribute("aria-activedescendant");
    this.keysSoFar = "";
    this.buttonText = buttonText;
    this.registerEvents();
  } // methods
  // eslint-disable-next-line class-methods-use-this


  _createClass(Dropdown, [{
    key: "defocusItem",
    value: function defocusItem(element) {
      if (element) {
        element.removeAttribute("aria-selected");
        element.classList.remove("dropdown__list-item--focused");
      }
    }
  }, {
    key: "onFocusChange",
    value: function onFocusChange(focusedItem) {
      this.button.innerText = "".concat(this.buttonText, " ").concat(focusedItem.innerText);
    }
  }, {
    key: "focusItem",
    value: function focusItem(element) {
      this.defocusItem(document.getElementById(this.activeDescendant));
      element.setAttribute("aria-selected", "true");
      element.classList.add("dropdown__list-item--focused");
      this.listboxNode.setAttribute("aria-activedescendant", element.id);
      this.activeDescendant = element.id;
      this.onFocusChange(element);
    }
  }, {
    key: "focusFirstItem",
    value: function focusFirstItem() {
      var firstItem = this.listboxNode.querySelector('[role="option"]');

      if (firstItem) {
        this.focusItem(firstItem);
      }
    }
  }, {
    key: "focusLastItem",
    value: function focusLastItem() {
      var itemList = this.listboxNode.querySelectorAll('[role="option"]');

      if (itemList) {
        this.focusItem(itemList[itemList.length - 1]);
      }
    }
  }, {
    key: "setupFocus",
    value: function setupFocus() {
      if (!this.activeDescendant) {
        this.focusFirstItem();
      }
    }
  }, {
    key: "findPreviousOption",
    value: function findPreviousOption(currentOption) {
      var allOptions = _toConsumableArray(this.listboxNode.querySelectorAll('[role="option"]'));

      var currentOptionIndex = allOptions.indexOf(currentOption);
      var nextOption = null;

      if (currentOptionIndex > 0) {
        nextOption = allOptions[currentOptionIndex - 1];
      }

      return nextOption;
    }
  }, {
    key: "findNextOption",
    value: function findNextOption(currentOption) {
      var allOptions = _toConsumableArray(this.listboxNode.querySelectorAll('[role="option"]'));

      var currentOptionIndex = allOptions.indexOf(currentOption);
      var nextOption = null;

      if (currentOptionIndex > -1 && currentOptionIndex < allOptions.length - 1) {
        nextOption = allOptions[currentOptionIndex + 1];
      }

      return nextOption;
    }
  }, {
    key: "clearKeysSoFarAfterDelay",
    value: function clearKeysSoFarAfterDelay() {
      if (this.keyClear) {
        clearTimeout(this.keyClear);
        this.keyClear = null;
      }

      this.keyClear = setTimeout(function () {
        this.keysSoFar = "";
        this.keyClear = null;
      }.bind(this), 500);
    }
  }, {
    key: "findMatchInRange",
    value: function findMatchInRange(list, startIndex, endIndex) {
      var label = "";

      for (var n = startIndex; n < endIndex; n++) {
        label = list[n].innerText;

        if (label && label.toUpperCase().indexOf(this.keysSoFar.toUpperCase()) === 0) {
          return list[n];
        }
      }

      return null;
    }
  }, {
    key: "findItemToFocus",
    value: function findItemToFocus(key) {
      var itemList = this.listboxNode.querySelectorAll('[role="option"]');

      if (key.length !== 1) {
        return;
      }

      var searchIndex = 0;

      if (!this.keysSoFar) {
        for (var i = 0; i < itemList.length; i++) {
          if (itemList[i].getAttribute("id") === this.activeDescendant) {
            searchIndex = i;
          }
        }
      }

      this.keysSoFar += key;
      this.clearKeysSoFarAfterDelay();
      var nextMatch = this.findMatchInRange(itemList, searchIndex + 1, itemList.length);

      if (!nextMatch) {
        nextMatch = this.findMatchInRange(itemList, 0, searchIndex);
      }

      return nextMatch;
    }
  }, {
    key: "checkKeyPress",
    value: function checkKeyPress(event) {
      var key = event.key;
      var allOptions = this.listboxNode.querySelectorAll('[role="option"]');
      var currentItem = document.getElementById(this.activeDescendant) || allOptions[0];
      var nextItem = currentItem;

      if (!currentItem) {
        return;
      }

      switch (key) {
        case "ArrowUp":
          if (!this.activeDescendant) {
            this.focusItem(currentItem);
            break;
          }

          nextItem = this.findPreviousOption(currentItem);

          if (nextItem) {
            this.focusItem(nextItem);
            event.preventDefault();
          }

          break;

        case "ArrowDown":
          if (!this.activeDescendant) {
            this.focusItem(currentItem);
            break;
          }

          nextItem = this.findNextOption(currentItem);

          if (nextItem) {
            this.focusItem(nextItem);
            event.preventDefault();
          }

          break;

        case " ":
        case "Enter":
        case "Escape":
          event.preventDefault();
          this.hideListbox();
          this.button.focus();
          break;

        default:
          var itemToFocus = this.findItemToFocus(key);

          if (itemToFocus) {
            this.focusItem(itemToFocus);
          }

      }
    }
  }, {
    key: "checkClickItem",
    value: function checkClickItem(event) {
      if (event.target.getAttribute("role") !== "option") {
        return;
      }

      this.focusItem(event.target);
    }
  }, {
    key: "registerListboxEvents",
    value: function registerListboxEvents() {
      this.listboxNode.addEventListener("keydown", this.checkKeyPress.bind(this));
    }
  }, {
    key: "showListbox",
    value: function showListbox() {
      this.listboxNode.classList.remove("dropdown__list--hidden");
      this.button.setAttribute("aria-expanded", "true");
      this.button.classList.add("dropdown__button--clicked");
      this.listboxNode.focus();
    }
  }, {
    key: "hideListbox",
    value: function hideListbox() {
      this.listboxNode.classList.add("dropdown__list--hidden");
      this.button.classList.remove("dropdown__button--clicked");
      this.button.setAttribute("aria-expanded", "true");
      this.button.focus();
    }
  }, {
    key: "checkShow",
    value: function checkShow(event) {
      var key = event.key; // eslint-disable-next-line default-case

      switch (key) {
        case "ArrowUp":
        case "ArrowDown":
          event.preventDefault();
          this.showListbox();
          this.checkKeyPress(event);
          break;
      }
    }
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      this.button.addEventListener("click", this.showListbox.bind(this));
      this.button.addEventListener("keyup", this.checkShow.bind(this));
      this.listboxNode.addEventListener("blur", this.hideListbox.bind(this));
      this.listboxNode.addEventListener("keydown", this.checkKeyPress.bind(this));
      this.listboxNode.addEventListener("click", this.checkClickItem.bind(this));
    }
  }]);

  return Dropdown;
}();

var _default = Dropdown;
exports.default = _default;
},{}],"js/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formattedPrice = formattedPrice;
exports.formattedPriceRange = formattedPriceRange;
exports.loadCartFromStorage = loadCartFromStorage;
exports.weightToText = weightToText;

function formattedPrice(price) {
  return "".concat((price / 100).toFixed(2), "\u20AC").replace(".", ",");
}

function formattedPriceRange(product) {
  var minPrice = product.variants[0].price / 100;
  var maxPrice = product.variants[product.variants.length - 1].price / 100;
  return "".concat(minPrice.toFixed(2), "\u20AC \u2013 ").concat(maxPrice.toFixed(2), "\u20AC").replaceAll(".", ",");
}

function loadCartFromStorage() {
  return JSON.parse(window.localStorage.getItem("products"));
}

function weightToText(weight) {
  if (weight >= 1000) {
    return "".concat(weight / 1000, " kg").replaceAll(".", ",");
  }

  return "".concat(weight, " g");
}
},{}],"js/products.json":[function(require,module,exports) {
module.exports = [{
  "id": 0,
  "productName": "Äthiopien",
  "image": "fend-coffee-aethiopien",
  "variants": [{
    "name": "500g",
    "weight": 500,
    "price": 690
  }, {
    "name": "1kg",
    "weight": 1000,
    "price": 1000
  }, {
    "name": "5kg",
    "weight": 5000,
    "price": 5000
  }],
  "tags": [{
    "name": "Mild",
    "image": "icon_coffee_beans"
  }, {
    "name": "Für Filterkaffee",
    "image": "icon_coffee_french-press"
  }, {
    "name": "Fair gehandelt",
    "image": "icon_coffee_shovel"
  }],
  "abstract": "Äthiopien Filterkaffee ist äußerst ergiebig und hat praktisch keine Säure. Den Gaumen umschmeichelt ein vollmundiges Haselnussaroma. Gleich probieren!",
  "description": "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft."
}, {
  "id": 1,
  "productName": "Brasilien",
  "image": "fend-coffee-brasilien",
  "variants": [{
    "name": "500g",
    "weight": 500,
    "price": 880
  }, {
    "name": "1kg",
    "weight": 1000,
    "price": 1200
  }, {
    "name": "5kg",
    "weight": 5000,
    "price": 6500
  }],
  "tags": [{
    "name": "Mild",
    "image": "icon_coffee_beans"
  }, {
    "name": "Für Filterkaffee",
    "image": "icon_coffee_french-press"
  }, {
    "name": "Fair gehandelt",
    "image": "icon_coffee_shovel"
  }],
  "abstract": "Brasilien Filterkaffee ist äußerst ergiebig und hat praktisch keine Säure. Den Gaumen umschmeichelt ein vollmundiges Haselnussaroma. Gleich probieren!",
  "description": "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft."
}, {
  "id": 2,
  "productName": "Costa Rica",
  "image": "fend-coffee-costa-rica-2",
  "variants": [{
    "name": "250g",
    "weight": 250,
    "price": 690
  }, {
    "name": "500g",
    "weight": 500,
    "price": 1480
  }],
  "tags": [{
    "name": "Mild",
    "image": "icon_coffee_beans"
  }, {
    "name": "Für Filterkaffee",
    "image": "icon_coffee_french-press"
  }, {
    "name": "Fair gehandelt",
    "image": "icon_coffee_shovel"
  }],
  "abstract": "Costa Rica Filterkaffee ist äußerst ergiebig und hat praktisch keine Säure. Den Gaumen umschmeichelt ein vollmundiges Haselnussaroma. Gleich probieren!",
  "description": "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft."
}, {
  "id": 3,
  "productName": "Indien",
  "image": "fend-coffee-costa-rica-2",
  "variants": [{
    "name": "250g",
    "weight": 250,
    "price": 740
  }, {
    "name": "500g",
    "weight": 500,
    "price": 1360
  }, {
    "name": "1000g",
    "weight": 1000,
    "price": 2500
  }],
  "tags": [{
    "name": "Mild",
    "image": "icon_coffee_beans"
  }, {
    "name": "Für Filterkaffee",
    "image": "icon_coffee_french-press"
  }, {
    "name": "Fair gehandelt",
    "image": "icon_coffee_shovel"
  }],
  "abstract": "Indien Filterkaffee ist äußerst ergiebig und hat praktisch keine Säure. Den Gaumen umschmeichelt ein vollmundiges Haselnussaroma. Gleich probieren!",
  "description": "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft."
}, {
  "id": 4,
  "productName": "Costa Rica - Helle Röstung",
  "image": "fend-coffee-costa-rica-2",
  "variants": [{
    "name": "250g",
    "weight": 250,
    "price": 750
  }, {
    "name": "500g",
    "weight": 500,
    "price": 1490
  }],
  "tags": [{
    "name": "Mild",
    "image": "icon_coffee_beans"
  }, {
    "name": "Für Filterkaffee",
    "image": "icon_coffee_french-press"
  }, {
    "name": "Fair gehandelt",
    "image": "icon_coffee_shovel"
  }],
  "abstract": "Costa Rica mit milder Röstung Filterkaffee ist äußerst ergiebig und hat praktisch keine Säure. Den Gaumen umschmeichelt ein vollmundiges Haselnussaroma. Gleich probieren!",
  "description": "MAYA Hochlandkaffee von MAYA Kaffee 1991 wird an den Hängen der Sierra Madre de Chiapas angebaut, ein Gebirgszug, der sich entlang der Pazifikküste im Süden Mexikos erstreckt. Hier haben sich indianische Kleinbauern mit Anbauflächen von ein bis drei Hektar Land in Kooperativen zusammengeschlossen und verzichten komplett auf Industriedünger und Pestizide. Schonend geröstet, entwickelt diese einzigartige Spezialität ein überraschend vielschichtiges Aromenspiel mit deutlichen Noten von Haselnuss. Als klassischer Aufguss ist unser MAYA Filterkaffee besonders ergiebig. 100% BIO aus kontrolliert ökologischem Anbau. DE-ÖKO-003 / Nicht-EU-Landwirtschaft."
}];
},{}],"images/products/fend-coffee-aethiopien.png":[function(require,module,exports) {
module.exports = "/fend-coffee-aethiopien.f646a2d4.png";
},{}],"images/products/fend-coffee-brasilien.png":[function(require,module,exports) {
module.exports = "/fend-coffee-brasilien.a2783143.png";
},{}],"images/products/fend-coffee-costa-rica-2.png":[function(require,module,exports) {
module.exports = "/fend-coffee-costa-rica-2.c02424d7.png";
},{}],"images/products/*.png":[function(require,module,exports) {
module.exports = {
  "fend-coffee-aethiopien": require("./fend-coffee-aethiopien.png"),
  "fend-coffee-brasilien": require("./fend-coffee-brasilien.png"),
  "fend-coffee-costa-rica-2": require("./fend-coffee-costa-rica-2.png")
};
},{"./fend-coffee-aethiopien.png":"images/products/fend-coffee-aethiopien.png","./fend-coffee-brasilien.png":"images/products/fend-coffee-brasilien.png","./fend-coffee-costa-rica-2.png":"images/products/fend-coffee-costa-rica-2.png"}],"images/products/tags/icon_coffee_beans.png":[function(require,module,exports) {
module.exports = "/icon_coffee_beans.0d6e6b8a.png";
},{}],"images/products/tags/icon_coffee_french-press.png":[function(require,module,exports) {
module.exports = "/icon_coffee_french-press.42becc06.png";
},{}],"images/products/tags/icon_coffee_plant.png":[function(require,module,exports) {
module.exports = "/icon_coffee_plant.fc541519.png";
},{}],"images/products/tags/icon_coffee_shovel.png":[function(require,module,exports) {
module.exports = "/icon_coffee_shovel.9291d612.png";
},{}],"images/products/tags/*.png":[function(require,module,exports) {
module.exports = {
  "icon_coffee_beans": require("./icon_coffee_beans.png"),
  "icon_coffee_french-press": require("./icon_coffee_french-press.png"),
  "icon_coffee_plant": require("./icon_coffee_plant.png"),
  "icon_coffee_shovel": require("./icon_coffee_shovel.png")
};
},{"./icon_coffee_beans.png":"images/products/tags/icon_coffee_beans.png","./icon_coffee_french-press.png":"images/products/tags/icon_coffee_french-press.png","./icon_coffee_plant.png":"images/products/tags/icon_coffee_plant.png","./icon_coffee_shovel.png":"images/products/tags/icon_coffee_shovel.png"}],"js/addToCart.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function addToCart(selectedProduct) {
  var cartProducts = JSON.parse(window.localStorage.getItem("products"));

  if (!cartProducts) {
    var _newCart = [selectedProduct];
    window.localStorage.setItem("products", JSON.stringify(_newCart));
    return;
  }

  var index = cartProducts.findIndex(function (product) {
    return product.id === selectedProduct.id && product.weight === selectedProduct.weight && product.type === selectedProduct.type;
  });

  if (index === -1) {
    var _newCart2 = [].concat(_toConsumableArray(cartProducts), [selectedProduct]);

    window.localStorage.setItem("products", JSON.stringify(_newCart2));
    return;
  }

  var newCart = _toConsumableArray(cartProducts);

  newCart[index].quantity += 1;
  window.localStorage.setItem("products", JSON.stringify(newCart));
}

var _default = addToCart;
exports.default = _default;
},{}],"js/productPage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var util = _interopRequireWildcard(require("./utils"));

var _products = _interopRequireDefault(require("./products.json"));

var _ = _interopRequireDefault(require("../images/products/*.png"));

var _2 = _interopRequireDefault(require("../images/products/tags/*.png"));

var _addToCart = _interopRequireDefault(require("./addToCart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function pullProduct() {
  var pageURL = new URL(window.location.href);
  var productId = parseInt(pageURL.searchParams.get("id"), 10); // add if-case for product not found

  return _products.default.find(function (product) {
    return product.id === productId;
  });
}

function fillVariantTemplateGrinded(variant, index) {
  return "\n    <li class=\"dropdown__list-item\" id=\"".concat(index, "-ground\" role=\"option\" data-price=\"").concat(variant.price, "\" data-weight=\"").concat(variant.weight, "\" data-type=\"ground\">\n      ").concat(util.weightToText(variant.weight), " gemahlen \u2013 ").concat(util.formattedPrice(variant.price), "\n    </li>\n  ");
}

function fillVariantTemplateBeans(variant, index) {
  return "\n    <li class=\"dropdown__list-item\" id=\"".concat(index, "-beans\" role=\"option\" data-price=\"").concat(variant.price, "\" data-weight=\"").concat(variant.weight, "\" data-type=\"beans\">\n      ").concat(util.weightToText(variant.weight), " Bohnen \u2013 ").concat(util.formattedPrice(variant.price), "\n\n    </li>\n  ");
}

function sortVariantsByWeight(product) {
  return product.variants.sort(function (variant1, variant2) {
    return variant1.weight - variant2.weight;
  });
}

function addHTMLProductVariants(variants) {
  return [].concat(_toConsumableArray(variants.map(fillVariantTemplateGrinded)), _toConsumableArray(variants.map(fillVariantTemplateBeans))).join("");
}

function fillTagTemplate(tag) {
  return "\n    <figure>\n      <img\n        class=\"image product-showcase__tag\"\n        src=\"".concat(_2.default[tag.image], "\";\n        alt=\"").concat(tag.name, "\"\n      />\n      <figcaption class=\"product-showcase__tag-caption\">\n        ").concat(tag.name, "\n      </figcaption>\n    </figure>\n  ");
}

function addHTMLTagIcons(tags) {
  return tags.map(fillTagTemplate).join("");
}

function fillTemplate(product) {
  return "\n    <div class=\"product-showcase__image-container\">\n      <img\n        class=\"image\";\n        src=\"".concat(_.default[product.image], "\"\n        alt=\"Eine Packung unserers Kaffees ").concat(product.productName, "\"\n      />\n    </div>\n    <h2 class=\"text h2 product-showcase__heading\">").concat(product.productName, "</h2>\n    <p class=\"text product-showcase__price\">").concat(util.formattedPriceRange(product), "</p>\n    <p class=\"text product-showcase__text\">").concat(product.abstract, "</p>\n    <div class=\"dropdown product-showcase__dropdown\">\n      <button\n        aria-haspopup=\"listbox\"\n        aria-labelledby=\"dropdown__button\"\n        class=\"text dropdown__button\"\n        id=\"subject-dropdown\"\n        type=\"button\"\n        aria-required=\"true\"\n        aria-invalid=\"false\"\n        tabindex=\"6\"\n      >\n        Wie viel Kaffee brauchst du?\n      </button>\n      <ul\n        class=\"text dropdown__list dropdown__list--hidden\"\n        id=\"subject-listbox\"\n        tabindex=\"-1\"\n        role=\"listbox\"\n        aria-labelledby=\"dropdown__button\"\n        aria-expanded=\"false\"\n      >\n        ").concat(addHTMLProductVariants(sortVariantsByWeight(product)), "\n      </ul>\n    </div>\n    <button class=\"button product-showcase__button\">\n      <span class=\"text button__text\">Warenkorb</span>\n    </button>\n    <div class=\"product-showcase__message\" id=\"messageBox\">\n      <p class=\"text\"></p>\n    </div> \n    <div class=\"product-showcase__tag-grid\">\n      ").concat(addHTMLTagIcons(product.tags), "\n    </div>\n      ");
}

function addHTMLDescription(product) {
  var descriptionElement = document.querySelector(".product-description");
  descriptionElement.innerHTML = "\n    <h3 class=\"h3\">Beschreibung</h3>\n    <p class=\"text product-description__text\">".concat(product.description, "</p>\n  ");
}

function processProductRequest() {
  var product = pullProduct();
  var showcase = document.querySelector(".product-showcase");
  var productHTML = fillTemplate(product);
  showcase.classList.add("product-showcase--filled");
  showcase.innerHTML = productHTML;
  addHTMLDescription(product);
}

function removeDropdownMessage() {
  var messageBoxElement = document.getElementById("messageBox");
  var messageText = messageBoxElement.firstElementChild;
  messageBoxElement.classList.remove("product-showcase__remove--active");
  messageText.removeAttribute("role");
  messageText.textContent = "";
}

function showDropdownMessage(msg, isAlert) {
  var messageBoxElement = document.getElementById("messageBox");
  var messageText = messageBoxElement.firstElementChild;
  messageText.textContent = "".concat(msg);

  if (isAlert) {
    messageText.setAttribute("role", "alert");
  }

  messageBoxElement.classList.add("product-showcase__message--active");
}

function retrieveSelectedProduct() {
  var dropdown = document.querySelector(".dropdown");
  var selectedVariantElement = dropdown.querySelector('[aria-selected="true"]');

  if (!selectedVariantElement) {
    showDropdownMessage("Gute Wahl! Wie viel Kaffee möchtest du?", true);
    return null;
  }

  removeDropdownMessage();
  var product = pullProduct(); // eslint-disable-next-line consistent-return

  return {
    id: product.id,
    name: product.name,
    price: selectedVariantElement.dataset.price,
    weight: selectedVariantElement.dataset.weight,
    type: selectedVariantElement.dataset.type,
    quantity: 1
  };
}

function handleCartButton() {
  var selectedProduct = retrieveSelectedProduct();

  if (!selectedProduct) {
    return;
  }

  (0, _addToCart.default)(selectedProduct);
  showDropdownMessage("Hinzugefügt!", false);
}

function registerEvents() {
  var button = document.querySelector(".product-showcase__button");
  button.addEventListener("click", handleCartButton);
}

function initProductPage() {
  processProductRequest();
  registerEvents();
}

var _default = initProductPage;
exports.default = _default;
},{"./utils":"js/utils.js","./products.json":"js/products.json","../images/products/*.png":"images/products/*.png","../images/products/tags/*.png":"images/products/tags/*.png","./addToCart":"js/addToCart.js"}],"js/indexProduct.js":[function(require,module,exports) {
"use strict";

var _dropdown = _interopRequireDefault(require("./dropdown"));

var _productPage = _interopRequireDefault(require("./productPage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initDropdown() {
  var dropdownButton = document.querySelector(".dropdown__button");
  var dropdownListbox = document.querySelector(".dropdown__list");

  if (dropdownButton && dropdownListbox) {
    new _dropdown.default(dropdownButton, dropdownListbox, "");
  } else {
    console.warn("no dropdown found");
  }
}

window.addEventListener("load", function () {
  (0, _productPage.default)();
  initDropdown();
});

function heppy() {
  console.log("happy with an e");
}
},{"./dropdown":"js/dropdown.js","./productPage":"js/productPage.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41367" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/indexProduct.js"], null)
//# sourceMappingURL=/indexProduct.63ae35d2.js.map