/* eslint-disable no-useless-return */

class ContactForm {
  constructor(formNode) {
    this.formNode = formNode;
    this.nameInputId = "name";
    this.mailInputId = "mail";
    this.privacyPolicyId = "privacy-policy";
    this.messageId = "text";
    this.subjectDropdownId = "subject-dropdown";
    this.isValid = true;
    this.registerEvents();
  }

  checkName() {
    const nameInput = this.formNode[this.nameInputId];
    if (nameInput.validity.valueMissing) {
      nameInput.setCustomValidity("Bitte gib deinen Namen an.");
      nameInput.classList.add("contact-form__input--error");
      nameInput.reportValidity();
      this.isValid = false;
      return;
    }
    nameInput.setCustomValidity("");
  }

  checkMail() {
    const mailInput = this.formNode[this.mailInputId];
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

  checkMessage() {
    const messageInput = this.formNode[this.messageId];
    if (messageInput.validity.valueMissing) {
      messageInput.setCustomValidity(
        "Bitte sag uns, was du auf dem Herzen hast."
      );
      messageInput.classList.add("contact-form__input--error");
      messageInput.reportValidity();
      this.isValid = false;
      return;
    }
    messageInput.setCustomValidity("");
  }

  checkPrivacyPolicy() {
    const privacyPolicyCheckbox = this.formNode[this.privacyPolicyId];
    if (!privacyPolicyCheckbox.checked) {
      privacyPolicyCheckbox.setCustomValidity(
        "Bitte akzeptiere die Datenschutzerklärung"
      );
      const privacyPolicyLabel = privacyPolicyCheckbox.labels[0];
      privacyPolicyLabel.classList.add("checkbox-wrapper__label--error");
      privacyPolicyCheckbox.reportValidity();
      this.isValid = false;
      return;
    }
    privacyPolicyCheckbox.setCustomValidity("");
  }

  resetValidity() {
    const mailInput = this.formNode[this.mailInputId];
    mailInput.setCustomValidity("");
    this.isValid = true;
  }

  validate(event) {
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

  retrieveSubject() {
    const subjectDropdown = document.getElementById(this.subjectDropdownId);
    // cut off "Dein Betreff:"
    const subjectText = subjectDropdown.innerText.slice(13);
    if (subjectText.length === 0) {
      return "kein Betreff";
    }
    return subjectText;
  }

  addSubjectToForm(event) {
    const { formData } = event;
    formData.append("subject", this.retrieveSubject());
  }

  registerEvents() {
    this.formNode.addEventListener("submit", this.validate.bind(this));
    this.formNode.addEventListener(
      "formdata",
      this.addSubjectToForm.bind(this)
    );
  }
}

export default ContactForm;
