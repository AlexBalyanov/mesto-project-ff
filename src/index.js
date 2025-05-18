import "./pages/index.css";
import { placeCards } from "./components/card";
import {
  closeModal,
  openModal,
  handleEditProfileFormSubmit,
  handleAddCardFormSubmit
} from "./components/modal";

const placeList = document.querySelector(".places__list");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");

const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const showCardPopup = document.querySelector(".popup_type_image");
const modalWindows = document.querySelectorAll(".popup");

const editProfileForm = document.querySelector('form[name="edit-profile"]');
let nameInput = document.querySelector('input[name="name"]');
let jobInput = document.querySelector('input[name="description"]');

const addCardForm = document.querySelector('form[name="new-place"]');
const placeInput = document.querySelector('input[name="place-name"]');
const linkInput = document.querySelector('input[name="link"]');

const profileName = document.querySelector(".profile__title");
const jobDescription = document.querySelector(".profile__description");

placeCards();

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = jobDescription.textContent;
  openModal(editProfilePopup);
});

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  openModal(addCardPopup);
});

popupCloseButtons.forEach((item) => {
  item.addEventListener("click", () => {
    closeModal(item.closest(".popup"));
  });
});

modalWindows.forEach((item) => {
  item.addEventListener("click", (evt) => {
    closeModal(evt.target);
  });
});

editProfileForm.addEventListener("submit", handleEditProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

export {
  placeList,
  modalWindows,
  nameInput,
  jobInput,
  profileName,
  jobDescription,
  addCardForm,
  placeInput,
  linkInput,
  showCardPopup
};