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
})({"js/products.json":[function(require,module,exports) {
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
},{"./icon_coffee_beans.png":"images/products/tags/icon_coffee_beans.png","./icon_coffee_french-press.png":"images/products/tags/icon_coffee_french-press.png","./icon_coffee_plant.png":"images/products/tags/icon_coffee_plant.png","./icon_coffee_shovel.png":"images/products/tags/icon_coffee_shovel.png"}],"js/shop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _products = _interopRequireDefault(require("./products.json"));

var _ = _interopRequireDefault(require("../images/products/*.png"));

var _2 = _interopRequireDefault(require("../images/products/tags/*.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-useless-return */
function addShopGrid(shop) {
  shop.classList.add("coffee-display__grouping");
}

function formattedPrice(product) {
  var minPrice = product.variants[0].price / 100;
  var maxPrice = product.variants[product.variants.length - 1].price / 100;
  return "".concat(minPrice.toFixed(2), "\u20AC \u2013 ").concat(maxPrice.toFixed(2), "\u20AC").replaceAll(".", ",");
}

function fillTagTemplatePreview(tag) {
  return "\n    <div class=\"coffee-tag-row__container\">\n      <img\n        class=\"image--inverted\"\n        src=\"".concat(_2.default[tag.image], "\"\n        alt=\"").concat(tag.name, "\"\n      />\n    </div>\n  ");
}

function fillTagTemplate(tag) {
  return "\n    <div class=\"coffee-tag-row__container\">\n      <img\n        class=\"image\"\n        src=\"".concat(_2.default[tag.image], "\"\n        alt=\"").concat(tag.name, "\"\n      />\n    </div>\n  ");
}

function addHTMLTagIcon(product) {
  var isPreview = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (isPreview) {
    return product.tags.map(fillTagTemplatePreview).join("");
  }

  return product.tags.map(fillTagTemplate).join("");
}

function fillTemplatePreview(product) {
  return "\n    <div class=\"coffee-item\">\n      <a class=\"coffee-item__image-box\" href=\"/produkt/index.html?id=".concat(product.id, "\">\n        <img\n          class=\"image coffee-item__image\"\n          src=\"").concat(_.default[product.image], "\"\n          alt=\"Eine Packung unserers Kaffess ").concat(product.productName, "\"\n        />\n      </a>\n      <p class=\"subhead-m coffee-item__name\">").concat(product.productName, "</p>\n      <p class=\"text coffee-item__pricetag\">").concat(formattedPrice(product), "</p>\n      <div class=\"coffee-tag-row\">\n        ").concat(addHTMLTagIcon(product, true), "\n      </div>\n    </div>\n  ");
}

function fillTemplate(product) {
  return "\n    <div class=\"coffee-item\">\n      <a class=\"coffee-item__image-box\" href=\"/produkt/index.html?id=".concat(product.id, "\">\n        <img\n          class=\"image coffee-item__image\"\n          src=\"").concat(_.default[product.image], "\"\n          alt=\"Eine Packung unserers Kaffess ").concat(product.productName, "\"\n        />\n      </a>\n      <p class=\"subhead-m coffee-item__name--light\">").concat(product.productName, "</p>\n      <p class=\"text coffee-item__pricetag\">").concat(formattedPrice(product), "</p>\n      <div class=\"coffee-tag-row\">\n        ").concat(addHTMLTagIcon(product), "\n      </div>\n    </div>\n  ");
}

function initShop() {
  var numberOfItems = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var productTemplates = null;
  var shop = null;

  if (numberOfItems) {
    productTemplates = _products.default.slice(0, numberOfItems).map(fillTemplatePreview).join("");
    shop = document.getElementById("shop-preview");
  } else {
    productTemplates = _products.default.map(fillTemplate).join("");
    shop = document.getElementById("shop");
  }

  addShopGrid(shop);
  shop.innerHTML = productTemplates;
}

var _default = initShop;
exports.default = _default;
},{"./products.json":"js/products.json","../images/products/*.png":"images/products/*.png","../images/products/tags/*.png":"images/products/tags/*.png"}],"js/indexShop.js":[function(require,module,exports) {
"use strict";

var _shop = _interopRequireDefault(require("./shop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener("load", function () {
  (0, _shop.default)();
});
},{"./shop":"js/shop.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/indexShop.js"], null)
//# sourceMappingURL=/indexShop.3ca10dc5.js.map