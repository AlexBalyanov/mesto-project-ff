import { editProfileButton, profileEditPopup } from "../index";

const openModal = () => {
  profileEditPopup.classList.add("popup_is-opened");
}

const closeModal = () => {
  profileEditPopup.classList.remove("popup_is-opened");
}

export { openModal, closeModal }