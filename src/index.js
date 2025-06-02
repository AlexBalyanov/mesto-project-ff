import "./pages/index.css";
import { createCard, deleteCard, toggleLike } from "./components/card";
import { closeModal, openModal } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import {loadCards, loadProfileData, editProfile, addNewCard, editAvatar } from "./components/api";

const placeList = document.querySelector(".places__list");

const editProfileButton = document.querySelector(".profile__edit-button");
const editAvatarButton = document.querySelector(".profile__image-button");
const addCardButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");

const editProfilePopup = document.querySelector(".popup_type_edit");
const editAvatarPopup = document.querySelector(".popup_type_new-avatar");
const addCardPopup = document.querySelector(".popup_type_new-card");
const showCardPopup = document.querySelector(".popup_type_image");
const popupImage = showCardPopup.querySelector(".popup__image");
const popupPlaceDescription = showCardPopup.querySelector(".popup__caption");

const modalWindows = document.querySelectorAll(".popup");

const editProfileForm = document.querySelector('form[name="edit-profile"]');
const editAvatarForm = document.querySelector('form[name="edit-avatar"]');
const nameInput = document.querySelector('input[name="name"]');
const jobInput = document.querySelector('input[name="description"]');

const addCardForm = document.querySelector('form[name="new-place"]');
const placeInput = document.querySelector('input[name="place-name"]');
const linkInput = document.querySelector('input[name="link"]');
const editAvatarInput = document.querySelector('input[name="avatar-link"]');

const profileImage = document.querySelector(".profile__image");
const profileName = document.querySelector(".profile__title");
const jobDescription = document.querySelector(".profile__description");

let initialCards = [];
let userId = "";

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  errorTextSelector: '.popup__input_error_text',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

await Promise.all([loadProfileData(), loadCards()])
  .then(([profileData, cardsList]) => {
    console.log(profileData) //----------------------------------------
    profileName.textContent = profileData.name;
    jobDescription.textContent = profileData.about;
    profileImage.style.backgroundImage = `url(${profileData.avatar})`;

    initialCards = cardsList;
    userId = profileData._id;
    console.log(initialCards, userId); //----------------------------------------
});

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

  editProfile(name, job)
    .then((profileData) => {
      profileName.textContent = profileData.name;
      jobDescription.textContent = profileData.about;
    });

  modalWindows.forEach((item) => {
    closeModal(item);
  });
};

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();

  const place = placeInput.value;
  const link = linkInput.value;

  addNewCard(place, link)
    .then((card) => {
      const cardData = createCard(card, deleteCard, toggleLike, showCard, userId);
      placeList.prepend(cardData);
    });

  modalWindows.forEach((item) => {
    closeModal(item);
  });

  addCardForm.reset();
};

const handleEditAvatarFormSubmit = (evt) => {
  evt.preventDefault();

  const link = editAvatarInput.value;

  editAvatar(link)
    .then((profile) => {
      profileImage.style.backgroundImage = `url(${profile.avatar})`;
    });

  modalWindows.forEach((item) => {
    closeModal(item);
  });

  editAvatarForm.reset();
};

(() => {
  initialCards.forEach((cardItem) => {
    const cardData = createCard(cardItem, deleteCard, toggleLike, showCard, userId);
    placeList.append(cardData);
  });
})();

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = jobDescription.textContent;
  openModal(editProfilePopup);
});

editAvatarButton.addEventListener("click", () => {
  editAvatarForm.reset();
  openModal(editAvatarPopup);
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
editAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit);

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
  validationConfig
};