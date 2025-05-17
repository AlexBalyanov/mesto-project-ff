import "./pages/index.css";
import { placeCards } from "./components/card";
import { closeModal, openModal, handleEscKey } from "./components/modal";

const placeList = document.querySelector(".places__list");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");

const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");

const modalWindows = document.querySelectorAll(".popup");

placeCards();

editProfileButton.addEventListener("click", () => {
  openModal(editProfilePopup);
  document.addEventListener("keydown", handleEscKey);
});

addCardButton.addEventListener("click", () => {
  openModal(addCardPopup);
  document.addEventListener("keydown", handleEscKey);
});

popupCloseButtons.forEach((item) => {
  item.addEventListener("click", () => {
    closeModal(item.closest(".popup"));
    document.removeEventListener("keydown", handleEscKey);
  });
});

modalWindows.forEach((item) => {
  item.addEventListener("click", (evt) => {
    closeModal(evt.target);
    if (!item.classList.contains("popup_is-opened")) {
      document.removeEventListener("keydown", handleEscKey);
    }
  });
});

export { placeList, editProfileButton, addCardButton, editProfilePopup, addCardPopup, modalWindows }