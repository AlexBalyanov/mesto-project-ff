const placeList = document.querySelector(".places__list");

const createCard = (dataFromCards, onDeleteCardCallback) => {

  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  
  cardElement.querySelector(".card__title").textContent = dataFromCards.name
  cardElement.querySelector(".card__image").src = dataFromCards.link;
  cardElement.querySelector(".card__image").alt = `Фотография места: ${dataFromCards.name}`;
  
  cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
    onDeleteCardCallback(cardElement);  
  });

  return cardElement;
};

const placeCards = () => {
  initialCards.forEach((cardItem) => {
    const cardData = createCard(cardItem, deleteCard);
    placeList.append(cardData);
  });
};

const deleteCard = (cardElement) => {
  cardElement.remove();
};

placeCards();