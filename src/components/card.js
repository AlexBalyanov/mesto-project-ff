const createCard = (dataFromCards, onDeleteCardCallback, onCardLikeCallback, onShowCardCallback) => {

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardDescription = cardElement.querySelector(".card__image");
  const cardLikesNumber = cardElement.querySelector(".card__like-number");

  const titleData = cardTitle.textContent = dataFromCards.name;
  const imageData = cardImage.src = dataFromCards.link;
  const altData = cardDescription.alt = `Фотография места: ${dataFromCards.name}`;
  const cardLikeData = cardLikesNumber.textContent = dataFromCards.likes.length;

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

const deleteCard = (cardElement) => {
  cardElement.remove();
};

const likeCard = (likeButton) => {
  likeButton.classList.toggle("card__like-button_is-active");
};

export { createCard, deleteCard, likeCard };