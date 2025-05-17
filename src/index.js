import "./pages/index.css";
import { placeCards } from "./components/card";
import {closeModal, openModal, handleEscKey, handleFormSubmit} from "./components/modal";

const placeList = document.querySelector(".places__list");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");

const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const modalWindows = document.querySelectorAll(".popup");

const editProfileForm = document.querySelector('form[name="edit-profile"]');
let nameInput = document.querySelector('input[name="name"]');
let jobInput = document.querySelector('input[name="description"]');

const profileName = document.querySelector(".profile__title");
const jobDescription = document.querySelector(".profile__description");

nameInput.value = profileName.textContent;
jobInput.value = jobDescription.textContent;

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

modalWindows.forEach((item) => {
  item.addEventListener("click", (evt) => {
    if (!item.classList.contains("popup_is-opened")) {
      closeModal(evt.target);
    }
  });
});

editProfileForm.addEventListener("submit", handleFormSubmit);

export { placeList, modalWindows, nameInput, jobInput, profileName, jobDescription }