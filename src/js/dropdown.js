/* eslint-disable no-useless-return */
class Dropdown {
  constructor(button, listboxNode) {
    this.button = button;
    this.listboxNode = listboxNode;
    this.activeDescendant = this.listboxNode.getAttribute(
      "aria-activedescendant"
    );
    this.keysSoFar = "";
    this.registerEvents();
  }

  // methods
  // eslint-disable-next-line class-methods-use-this
  defocusItem(element) {
    if (element) {
      element.removeAttribute("aria-selected");
      element.classList.remove("dropdown__list-item--focused");
    }
  }

  onFocusChange(focusedItem) {
    this.button.innerText = `Betreff: ${focusedItem.innerText}`;
  }

  focusItem(element) {
    this.defocusItem(document.getElementById(this.activeDescendant));
    element.setAttribute("aria-selected", "true");
    element.classList.add("dropdown__list-item--focused");
    this.listboxNode.setAttribute("aria-activedescendant", element.id);
    this.activeDescendant = element.id;
    this.onFocusChange(element);
  }

  focusFirstItem() {
    const firstItem = this.listboxNode.querySelector('[role="option"]');

    if (firstItem) {
      this.focusItem(firstItem);
    }
  }

  focusLastItem() {
    const itemList = this.listboxNode.querySelectorAll('[role="option"]');

    if (itemList) {
      this.focusItem(itemList[itemList.length - 1]);
    }
  }

  setupFocus() {
    if (!this.activeDescendant) {
      this.focusFirstItem();
    }
  }

  findPreviousOption(currentOption) {
    const allOptions = [
      ...this.listboxNode.querySelectorAll('[role="option"]'),
    ];
    const currentOptionIndex = allOptions.indexOf(currentOption);
    let nextOption = null;

    if (currentOptionIndex > 0) {
      nextOption = allOptions[currentOptionIndex - 1];
    }

    return nextOption;
  }

  findNextOption(currentOption) {
    const allOptions = [
      ...this.listboxNode.querySelectorAll('[role="option"]'),
    ];
    const currentOptionIndex = allOptions.indexOf(currentOption);
    let nextOption = null;
    if (currentOptionIndex > -1 && currentOptionIndex < allOptions.length - 1) {
      nextOption = allOptions[currentOptionIndex + 1];
    }

    return nextOption;
  }

  clearKeysSoFarAfterDelay() {
    if (this.keyClear) {
      clearTimeout(this.keyClear);
      this.keyClear = null;
    }
    this.keyClear = setTimeout(
      function () {
        this.keysSoFar = "";
        this.keyClear = null;
      }.bind(this),
      500
    );
  }

  findMatchInRange(list, startIndex, endIndex) {
    let label = "";
    for (let n = startIndex; n < endIndex; n++) {
      label = list[n].innerText;
      if (
        label &&
        label.toUpperCase().indexOf(this.keysSoFar.toUpperCase()) === 0
      ) {
        return list[n];
      }
    }
    return null;
  }

  findItemToFocus(key) {
    const itemList = this.listboxNode.querySelectorAll('[role="option"]');
    if (key.length !== 1) {
      return;
    }
    let searchIndex = 0;
    if (!this.keysSoFar) {
      for (let i = 0; i < itemList.length; i++) {
        if (itemList[i].getAttribute("id") === this.activeDescendant) {
          searchIndex = i;
        }
      }
    }
    this.keysSoFar += key;
    this.clearKeysSoFarAfterDelay();

    let nextMatch = this.findMatchInRange(
      itemList,
      searchIndex + 1,
      itemList.length
    );
    if (!nextMatch) {
      nextMatch = this.findMatchInRange(itemList, 0, searchIndex);
    }
    return nextMatch;
  }

  checkKeyPress(event) {
    const { key } = event;
    const allOptions = this.listboxNode.querySelectorAll('[role="option"]');
    const currentItem =
      document.getElementById(this.activeDescendant) || allOptions[0];
    let nextItem = currentItem;

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
        const itemToFocus = this.findItemToFocus(key);
        if (itemToFocus) {
          this.focusItem(itemToFocus);
        }
    }
  }

  registerListboxEvents() {
    this.listboxNode.addEventListener("keydown", this.checkKeyPress.bind(this));
  }

  showListbox() {
    this.listboxNode.classList.remove("dropdown__list--hidden");
    this.button.setAttribute("aria-expanded", "true");
    this.button.classList.add("dropdown__button--clicked");
    this.listboxNode.focus();
  }

  hideListbox() {
    this.listboxNode.classList.add("dropdown__list--hidden");
    this.button.classList.remove("dropdown__button--clicked");
    this.button.setAttribute("aria-expanded", "true");
    this.button.focus();
  }

  checkShow(event) {
    const { key } = event;

    // eslint-disable-next-line default-case
    switch (key) {
      case "ArrowUp":
      case "ArrowDown":
        event.preventDefault();
        this.showListbox();
        this.checkKeyPress(event);
        break;
    }
  }

  registerEvents() {
    this.button.addEventListener("click", this.showListbox.bind(this));
    this.button.addEventListener("keyup", this.checkShow.bind(this));
    this.listboxNode.addEventListener("blur", this.hideListbox.bind(this));
    this.listboxNode.addEventListener("keydown", this.checkKeyPress.bind(this));
  }
}

export default Dropdown;
