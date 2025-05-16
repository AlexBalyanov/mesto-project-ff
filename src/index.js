import "./pages/index.css";
import { placeCards } from "./components/card";
import {closeModal, openModal} from "./components/modal";

const placeList = document.querySelector(".places__list");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const profileEditPopup = document.querySelector(".popup_type_edit");
const addCardPopup = document.querySelector(".popup_type_new-card");
const popupCloseButton = document.querySelector(".popup__close")


editProfileButton.addEventListener("click", openModal);
popupCloseButton.addEventListener("click", closeModal);


placeCards();

export { placeList, editProfileButton, addCardButton, profileEditPopup, addCardPopup, popupCloseButton }