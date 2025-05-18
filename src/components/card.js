import { initialCards } from "./cards";
import { placeList } from "../index";
import { showCard } from "./modal";

const createCard = (dataFromCards, onDeleteCardCallback, onCardLikeCallback, onShowCardCallback) => {

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDescription = cardElement.querySelector(".card__image");

  const titleData = cardTitle.textContent = dataFromCards.name;
  const imageData = cardImage.src = dataFromCards.link;
  const altData = cardDescription.alt = `Фотография места: ${dataFromCards.name}`;

  cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
    onDeleteCardCallback(cardElement);  
  });

  cardElement.querySelector(".card__like-button").addEventListener("click", (evt) => {
    onCardLikeCallback(evt.target);
  });

  cardImage.addEventListener("click", () => {
    onShowCardCallback(titleData, imageData, altData);
  });

  return cardElement;
};

const placeCards = () => {
  initialCards.forEach((cardItem) => {
    const cardData = createCard(cardItem, deleteCard, likeCard, showCard);
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