import {
  addCardForm,
  jobDescription,
  jobInput,
  linkInput,
  modalWindows,
  nameInput,
  placeInput,
  placeList,
  profileName,
  showCardPopup
} from "../index";

import {
  createCard,
  deleteCard,
  likeCard
} from "./card";

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

const showCard = (title, image, description) => {
  const popupImage = showCardPopup.querySelector(".popup__image");
  const popupPlaceDescription = showCardPopup.querySelector(".popup__caption");

  popupImage.src = image;
  popupImage.alt = description;
  popupPlaceDescription.textContent = title;

  openModal(showCardPopup);
};

export {
  openModal,
  closeModal,
  handleEscKey,
  handleEditProfileFormSubmit,
  handleAddCardFormSubmit,
  showCard
};