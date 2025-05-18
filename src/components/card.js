import { initialCards } from "./cards";
import { placeList } from "../index";

const createCard = (dataFromCards, onDeleteCardCallback, OnCardLikeCallback) => {

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  
  cardElement.querySelector(".card__title").textContent = dataFromCards.name
  cardElement.querySelector(".card__image").src = dataFromCards.link;
  cardElement.querySelector(".card__image").alt = `Фотография места: ${dataFromCards.name}`;
  
  cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
    onDeleteCardCallback(cardElement);  
  });

  cardElement.querySelector(".card__like-button").addEventListener("click", (evt) => {
    OnCardLikeCallback(evt.target);
  })

  return cardElement;
};

const placeCards = () => {
  initialCards.forEach((cardItem) => {
    const cardData = createCard(cardItem, deleteCard, likeCard);
    placeList.append(cardData);
  });
};

const deleteCard = (cardElement) => {
  cardElement.remove();
};

const likeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

export { placeCards, createCard, deleteCard, likeCard };