import { modalWindows } from "../index";

const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKey);
};

const closeModal = (popup) => {
  if (popup.classList.contains("popup_is-opened")) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handleEscKey);
  }
};

const handleEscKey = (evt) => {
  if(evt.key === "Escape") {
    modalWindows.forEach((item) => {
      closeModal(item);
    });
  }
};

export { openModal, closeModal, handleEscKey };