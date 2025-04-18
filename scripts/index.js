const placeCards = (cardsArray, deleteCardCallback) => {

  cardsArray.forEach((card) => {
    const placeList = document.querySelector(".places__list");
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__title").textContent = card.name;
    cardElement.querySelector(".card__image").src = card.link;

    placeList.append(cardElement);

    cardElement.querySelector(".card__delete-button").addEventListener("click", () => {
      deleteCardCallback(cardElement);
    });
  });
};

const deleteCard = (cardElement) => {
  cardElement.remove();
}

placeCards(initialCards, deleteCard);
