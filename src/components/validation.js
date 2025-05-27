const checkInputValidity = (popupElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(popupElement, inputElement, config)
  } else {
    hideInputError(popupElement, inputElement, config)
  }
};

const isValid = () => {

};

const showInputError = (popupElement, inputElement, config) => {
  const errorMessage = popupElement.querySelector(`.${inputElement.name}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorMessage.classList.add(config.errorClass);
  errorMessage.textContent = inputElement.validationMessage;
};

const hideInputError = (popupElement, inputElement, config) => {
  const errorMessage = popupElement.querySelector(`.${inputElement.name}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorMessage.classList.remove(config.errorClass);
  errorMessage.textContent = '';
};

const setInputsEventListeners = (popupElement, config) => {
  const inputs = popupElement.querySelectorAll(config.inputSelector);

  inputs.forEach(input => {
    input.addEventListener("input", () => {
      checkInputValidity(popupElement, input, config);
    });
  });
};

const enableValidation = (config) => {
  const popups = document.querySelectorAll(config.formSelector);

  popups.forEach((popup) => {
    setInputsEventListeners(popup, config);
  });
};

const toggleButtonState = (popupElement, config) => {

}

const clearValidation = (popup, config) => {

};

export { enableValidation };

