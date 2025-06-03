import "./pages/index.css";
import { createCard, deleteCard, toggleLike } from "./components/card";
import { closeModal, openModal } from "./components/modal";
import { enableValidation } from "./components/validation";
import { loadCards, deleteCardFromServer, loadProfileData, editProfile, addNewCard, editAvatar } from "./components/api";

const placeList = document.querySelector(".places__list");

const editProfileButton = document.querySelector(".profile__edit-button");
const editAvatarButton = document.querySelector(".profile__image-button");
const addCardButton = document.querySelector(".profile__add-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const submitButtons = document.querySelectorAll(".popup__button");

const editProfilePopup = document.querySelector(".popup_type_edit");
const editAvatarPopup = document.querySelector(".popup_type_new-avatar");
const addCardPopup = document.querySelector(".popup_type_new-card");
const showCardPopup = document.querySelector(".popup_type_image");
const deleteCardPopup = document.querySelector(".popup_type_delete");
const popupImage = showCardPopup.querySelector(".popup__image");
const popupPlaceDescription = showCardPopup.querySelector(".popup__caption");

const modalWindows = document.querySelectorAll(".popup");

const editAvatarForm = document.forms["edit-avatar"];
const editProfileForm = document.forms["edit-profile"];
const addCardForm = document.forms["new-place"];
const deleteCardForm = document.forms["delete-card"];

const editAvatarInput = editAvatarForm.elements["avatar-link"];
const nameInput = editProfileForm.elements["profile-name"];
const jobInput = editProfileForm.elements["description"];
const placeInput = addCardForm.elements["place-name"];
const linkInput = addCardForm.elements["link"];

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
  errorClass: 'popup__error_visible',
  noDisableClass: 'no-disable'
};

enableValidation(validationConfig);

await Promise.all([loadProfileData(), loadCards()])
  .then(([profileData, cardsList]) => {
    profileName.textContent = profileData.name;
    jobDescription.textContent = profileData.about;
    profileImage.style.backgroundImage = `url(${profileData.avatar})`;

    initialCards = cardsList;
    userId = profileData._id;
})
  .catch((err) => {
    console.log(err);
  });

const showCard = (title, image, description) => {
  popupImage.src = image;
  popupImage.alt = description;
  popupPlaceDescription.textContent = title;

  openModal(showCardPopup);
};

(() => {
  initialCards.forEach((cardItem) => {
    const cardData = createCard(cardItem, deleteCard, toggleLike, showCard, userId);
    placeList.append(cardData);
  });
})();

const handleEditProfileFormSubmit = (evt) => {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  renderLoading(true, editProfilePopup, "Сохранение...", "Сохранить");

  editProfile(name, job)
    .then((profileData) => {
      profileName.textContent = profileData.name;
      jobDescription.textContent = profileData.about;

      closeModal(editProfilePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, editProfilePopup, "Сохранение...", "Сохранить");
    });
};

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();

  const place = placeInput.value;
  const link = linkInput.value;

  renderLoading(true, addCardPopup, "Сохранение...", "Сохранить");

  addNewCard(place, link)
    .then((card) => {
      const cardData = createCard(card, deleteCard, toggleLike, showCard, userId);
      placeList.prepend(cardData);
      closeModal(addCardPopup);
      addCardForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, addCardPopup, "Сохранение...", "Сохранить");
    });
};

const handleEditAvatarFormSubmit = (evt) => {
  evt.preventDefault();

  const link = editAvatarInput.value;

  renderLoading(true, editAvatarPopup, "Сохранение...", "Сохранить");

  editAvatar(link)
    .then((profile) => {
      profileImage.style.backgroundImage = `url(${profile.avatar})`;
      closeModal(editAvatarPopup);
      editAvatarForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, editAvatarPopup, "Сохранение...", "Сохранить");
    });
};

const handleDeleteCardFormSubmit = (evt, cardElement, cardId) => {
  evt.preventDefault();

  renderLoading(true, deleteCardPopup, "Удаление...", "Да");

  deleteCardFromServer(cardId)
    .then(() => {
      cardElement.remove();
      closeModal(deleteCardPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, deleteCardPopup, "Удаление...", "Да");
    });
};

const renderLoading = (isLoading, popup, pendingText, normalText) => {
  const submitButton = popup.querySelector(".popup__button");

    if (isLoading) {
      submitButton.textContent = `${pendingText}`;
    } else {
      submitButton.textContent = `${normalText}`;
    }
};

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

popupCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(button.closest(".popup"));
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
  validationConfig,
  deleteCardPopup,
  deleteCardForm,
  renderLoading,
  handleDeleteCardFormSubmit
};