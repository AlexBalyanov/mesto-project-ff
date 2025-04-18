// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placeCards = (cardsArray) => {
  const placeList = document.querySelector(".places__list");
  const cardTemplate = document.querySelector("#card-template").content;

  cardsArray.forEach((card) => {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__title").textContent = card.name;
    cardElement.querySelector(".card__image").src = card.link;

    placeList.append(cardElement);
  });
};

const deletCard = (card) => {
  const deletButton = document.querySelector(".card__delete-button");

  deletButton.addEventListener("click", () => {
    card.remove();
  });
};

placeCards(initialCards);














// console.log(cardElement)
