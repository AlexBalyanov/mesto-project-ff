// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placeCards = (cardsArray, deleteCardCallback) => {
  const placeList = document.querySelector(".places__list");

  cardsArray.forEach((card) => {
    const cardTemplate = document.querySelector("#card-template").content;
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

    cardElement.querySelector(".card__title").textContent = card.name;
    cardElement.querySelector(".card__image").src = card.link;

    placeList.append(cardElement);
  });

  const deletButton = document.querySelector(".card__delete-button");
  deletButton.addEventListener("click", (evt) => {
    console.log(evt.target)
  });
};

const deleteCard = () => {
  document.querySelector(".card").remove()
}



placeCards(initialCards, deleteCard);
