import { toggleLikeOnServer } from "./api";
import { deleteCardPopup, deleteCardForm, handleDeleteCardFormSubmit } from "../index";
import { openModal } from "./modal";

const createCard = (dataFromCards, onDeleteCardCallback, onCardLikeCallback, onShowCardCallback, userId) => {

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDescription = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikesNumber = cardElement.querySelector(".card__like-number");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  const isMyLikeOnCard = dataFromCards.likes.some((user) => {
    return user._id === userId;
  });

  const titleData = cardTitle.textContent = dataFromCards.name;
  const imageData = cardImage.src = dataFromCards.link;
  const altData = cardDescription.alt = `Фотография места: ${dataFromCards.name}`;
  const cardLikeData = cardLikesNumber.textContent = dataFromCards.likes.length;

  if (userId === dataFromCards.owner._id) {
    cardDeleteButton.addEventListener("click", () => {
    onDeleteCardCallback(cardElement, dataFromCards._id);
  });
  } else {
    cardDeleteButton.remove();
  }

  if (isMyLikeOnCard) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", (evt) => {
    onCardLikeCallback(cardLikeButton, cardLikesNumber,  dataFromCards);
  });

  cardImage.addEventListener("click", () => {
    onShowCardCallback(titleData, imageData, altData);
  });

  return cardElement;
};

const deleteCard = (cardElement, cardId) => {
  openModal(deleteCardPopup);

  deleteCardForm.addEventListener("submit", (evt) => {
    handleDeleteCardFormSubmit(evt, cardElement, cardId);
  });
};

const toggleLike = (likeButton, cardLikesNumber, dataFromCards) => {
  const methodConfig = {
    put: "PUT",
    delete: "DELETE"
  };

  if (!likeButton.classList.contains("card__like-button_is-active")) {
    toggleLikeOnServer(dataFromCards._id, methodConfig.put)
      .then((card) => {
        likeButton.classList.add("card__like-button_is-active");
        cardLikesNumber.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    toggleLikeOnServer(dataFromCards._id, methodConfig.delete)
      .then((card) => {
        likeButton.classList.remove("card__like-button_is-active");
        cardLikesNumber.textContent = card.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export { createCard, deleteCard, toggleLike };