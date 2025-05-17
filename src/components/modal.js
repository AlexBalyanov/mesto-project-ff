import {jobDescription, jobInput, modalWindows, nameInput, profileName} from "../index";

const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKey);
}

const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKey);
}

const handleEscKey = (evt) => {
  if(evt.key === "Escape") {
    modalWindows.forEach((item) => {
      closeModal(item);
    });
  }
};

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileName.textContent = name;
  jobDescription.textContent = job;

  modalWindows.forEach((item) => {
    closeModal(item);
  });
};

export { openModal, closeModal, handleEscKey, handleFormSubmit };