import "./pages/index.css";
import { placeCards } from "./components/card";
import {closeModal, openModal} from "./components/modal";

const placeList = document.querySelector(".places__list");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");

const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");

const popupsOverlays = document.querySelectorAll(".popup");

placeCards();

editProfileButton.addEventListener("click", () => {
  openModal(editProfilePopup);
});

addCardButton.addEventListener("click", () => {
  openModal(addCardPopup);
});

popupCloseButtons.forEach((item) => {
  item.addEventListener("click", () => {
    closeModal(item.closest(".popup"));
  });
});

popupsOverlays.forEach((item) => {
  item.addEventListener("click", (evt) => {
    closeModal(evt.target);
  });
});

export { placeList, editProfileButton, addCardButton, editProfilePopup, addCardPopup, popupsOverlays }