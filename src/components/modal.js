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
    const openedPopup = document.querySelector(".popup_is-opened");

    closeModal(openedPopup);
  }
};

export { openModal, closeModal, handleEscKey };