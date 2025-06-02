const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config)
  } else {
    hideInputError(formElement, inputElement, config)
  }
};

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid
  });
};

const showInputError = (formElement, inputElement, config) => {
  const errorMessage = formElement.querySelector(`.${inputElement.name}-error`);

  inputElement.classList.add(config.inputErrorClass);
  errorMessage.classList.add(config.errorClass);

  if (inputElement.validity.patternMismatch) {
    errorMessage.textContent = inputElement.dataset.errorMessage;
  } else {
    errorMessage.textContent = inputElement.validationMessage;
  }
};

const hideInputError = (formElement, inputElement, config) => {
  const errorMessage = formElement.querySelector(`.${inputElement.name}-error`);

  inputElement.classList.remove(config.inputErrorClass);
  errorMessage.classList.remove(config.errorClass);
  errorMessage.textContent = '';
};

const setInputsEventListeners = (formElement, config) => {
  const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputs, submitButton, config);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formElement, input, config);
      toggleButtonState(inputs, submitButton, config);
    });
  });
};

const enableValidation = (config) => {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    setInputsEventListeners(form, config);
  });
};

const toggleButtonState = (inputs, button, config) => {
  if (hasInvalidInput(inputs)) {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  }
};

const clearValidation = (formElement, config) => {
  const inputs = formElement.querySelectorAll(config.inputSelector);
  const errorMessages = formElement.querySelectorAll(config.errorTextSelector);
  const submitButtons = formElement.querySelectorAll(config.submitButtonSelector);

  submitButtons.forEach((submitButton) => {
    if (!submitButton.classList.contains(config.noDisableClass)) {
      submitButton.disabled = true;
      submitButton.classList.add(config.inactiveButtonClass);
    }
  });

  inputs.forEach((input) => {
    input.classList.remove(config.inputErrorClass);
  });

  errorMessages.forEach((error) => {
    error.classList.remove(config.errorClass);
    error.textContent = '';
  });
};

export { enableValidation, clearValidation };

