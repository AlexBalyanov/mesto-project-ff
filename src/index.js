import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card";
import { closeModal, openModal } from "./components/modal";
import { enableValidation } from "./components/validation";
import { initialCards } from "./components/cards";

const placeList = document.querySelector(".places__list");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");

const editProfilePopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const showCardPopup = document.querySelector(".popup_type_image");
const popupImage = showCardPopup.querySelector(".popup__image");
const popupPlaceDescription = showCardPopup.querySelector(".popup__caption");

const modalWindows = document.querySelectorAll(".popup");

const editProfileForm = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="description"]');

const addCardForm = document.querySelector('form[name="new-place"]');
const placeInput = document.querySelector('input[name="place-name"]');
const linkInput = document.querySelector('input[name="link"]');

const profileName = document.querySelector(".profile__title");
const jobDescription = document.querySelector(".profile__description");

const showCard = (title, image, description) => {
  popupImage.src = image;
  popupImage.alt = description;
  popupPlaceDescription.textContent = title;

  openModal(showCardPopup);
};

const handleEditProfileFormSubmit = (evt) => {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileName.textContent = name;
  jobDescription.textContent = job;

  modalWindows.forEach((item) => {
    closeModal(item);
  });
};

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();

  const place = placeInput.value;
  const link = linkInput.value;

  const cardObject = {
    name: "",
    link: ""
  };

  cardObject.name = place;
  cardObject.link = link;

  const cardData = createCard(cardObject, deleteCard, likeCard, showCard);
  placeList.prepend(cardData);

  modalWindows.forEach((item) => {
    closeModal(item);
  });

  addCardForm.reset();
};

(() => {
  initialCards.forEach((cardItem) => {
    const cardData = createCard(cardItem, deleteCard, likeCard, showCard);
    placeList.append(cardData);
  });
})();

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
  showCardPopup,
  popupImage,
  popupPlaceDescription,
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});