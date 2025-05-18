import {
  addCardForm,
  jobDescription,
  jobInput,
  linkInput,
  modalWindows,
  nameInput,
  placeInput,
  placeList,
  profileName
} from "../index";
import {createCard, deleteCard} from "./card";

const openModal = (popup) => {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKey);
}

const closeModal = (popup) => {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKey);
}

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

  const cardData = createCard(cardObject, deleteCard);
  placeList.prepend(cardData);

  modalWindows.forEach((item) => {
    closeModal(item);
  });

  addCardForm.reset();
}

export { openModal, closeModal, handleEscKey, handleEditProfileFormSubmit, handleAddCardFormSubmit };