import { modalWindows } from "../index";

const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
}

const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
}

const handleEscKey = (evt) => {
  if(evt.key === "Escape") {
    modalWindows.forEach((item) => {
      closeModal(item);
      document.removeEventListener("keydown", handleEscKey);
    });
  }
};

export { openModal, closeModal, handleEscKey }