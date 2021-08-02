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
},{}],"js/contactForm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-useless-return */
var ContactForm = /*#__PURE__*/function () {
  function ContactForm(formNode) {
    _classCallCheck(this, ContactForm);

    this.formNode = formNode;
    this.nameInputId = "name";
    this.mailInputId = "mail";
    this.privacyPolicyId = "privacy-policy";
    this.messageId = "text";
    this.subjectDropdownId = "subject-dropdown";
    this.isValid = true;
    this.registerEvents();
  }

  _createClass(ContactForm, [{
    key: "checkName",
    value: function checkName() {
      var nameInput = this.formNode[this.nameInputId];

      if (nameInput.validity.valueMissing) {
        nameInput.setCustomValidity("Bitte gib deinen Namen an.");
        nameInput.classList.add("contact-form__input--error");
        nameInput.reportValidity();
        this.isValid = false;
        return;
      }

      nameInput.setCustomValidity("");
    }
  }, {
    key: "checkMail",
    value: function checkMail() {
      var mailInput = this.formNode[this.mailInputId];

      if (!mailInput.validity.valid) {
        if (mailInput.validity.valueMissing) {
          mailInput.setCustomValidity("Bitte gib deine Mail-Adresse an.");
        } else if (mailInput.validity.typeMismatch) {
          mailInput.setCustomValidity("Das ist keine gültige Mail-Adresse.");
        }

        mailInput.classList.add("contact-form__input--error");
        mailInput.reportValidity();
        this.isValid = false;
        return;
      }

      mailInput.setCustomValidity("");
    }
  }, {
    key: "checkMessage",
    value: function checkMessage() {
      var messageInput = this.formNode[this.messageId];

      if (messageInput.validity.valueMissing) {
        messageInput.setCustomValidity("Bitte sag uns, was du auf dem Herzen hast.");
        messageInput.classList.add("contact-form__input--error");
        messageInput.reportValidity();
        this.isValid = false;
        return;
      }

      messageInput.setCustomValidity("");
    }
  }, {
    key: "checkPrivacyPolicy",
    value: function checkPrivacyPolicy() {
      var privacyPolicyCheckbox = this.formNode[this.privacyPolicyId];

      if (!privacyPolicyCheckbox.checked) {
        privacyPolicyCheckbox.setCustomValidity("Bitte akzeptiere die Datenschutzerklärung");
        var privacyPolicyLabel = privacyPolicyCheckbox.labels[0];
        privacyPolicyLabel.classList.add("checkbox-wrapper__label--error");
        privacyPolicyCheckbox.reportValidity();
        this.isValid = false;
        return;
      }

      privacyPolicyCheckbox.setCustomValidity("");
    }
  }, {
    key: "resetValidity",
    value: function resetValidity() {
      var mailInput = this.formNode[this.mailInputId];
      mailInput.setCustomValidity("");
      this.isValid = true;
    }
  }, {
    key: "validate",
    value: function validate(event) {
      this.resetValidity();
      this.checkPrivacyPolicy();
      this.checkMessage();
      this.checkMail();
      this.checkName();

      if (this.isValid) {
        return;
      }

      event.preventDefault();
    }
  }, {
    key: "retrieveSubject",
    value: function retrieveSubject() {
      var subjectDropdown = document.getElementById(this.subjectDropdownId); // cut off "Dein Betreff:"

      var subjectText = subjectDropdown.innerText.slice(13);

      if (subjectText.length === 0) {
        return "kein Betreff";
      }

      return subjectText;
    }
  }, {
    key: "addSubjectToForm",
    value: function addSubjectToForm(event) {
      var formData = event.formData;
      formData.append("subject", this.retrieveSubject());
    }
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      this.formNode.addEventListener("submit", this.validate.bind(this));
      this.formNode.addEventListener("formdata", this.addSubjectToForm.bind(this));
    }
  }]);

  return ContactForm;
}();

var _default = ContactForm;
exports.default = _default;
},{}],"js/indexContactForm.js":[function(require,module,exports) {
"use strict";

var _dropdown = _interopRequireDefault(require("./dropdown"));

var _contactForm = _interopRequireDefault(require("./contactForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener("load", function () {
  var dropdownButton = document.querySelector(".dropdown__button");
  var dropdownListbox = document.querySelector(".dropdown__list");

  if (dropdownButton && dropdownListbox) {
    new _dropdown.default(dropdownButton, dropdownListbox, "Dein Betreff:");
  } else {
    console.warn("no dropdown found");
  }

  var formNode = document.forms["contact-form"];

  if (formNode) {
    new _contactForm.default(formNode);
  }
});
},{"./dropdown":"js/dropdown.js","./contactForm":"js/contactForm.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/indexContactForm.js"], null)
//# sourceMappingURL=/indexContactForm.d05973ce.js.map