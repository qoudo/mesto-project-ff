import { initialsCards } from './scripts/teamplate'
import {deleteCard, likeCard, renderCard} from './scripts/cards'
import {closePopup, openPopup} from './scripts/popups'
import {handleEditFormSubmit, initEditForm} from "./scripts/profile";
import {initGallery} from "./scripts/gallery";

import './styles/index.css'

const content = document.querySelector('.content')
const cardList = content.querySelector('.places__list')
export const popupKeys = {
  edit: 'edit',
  addCard: 'addCard',
  gallery: 'gallery'
}
const forms = {
  edit: document.forms['edit-profile'],
  addCard: document.forms['new-place'],
}
const buttons = [
  { edit: content.querySelector('.profile__edit-button'), name: popupKeys.edit, callback: initEditForm },
  { addCard: content.querySelector('.profile__add-button'), name: popupKeys.addCard }
]

/**
 * Возвращает элемент карточки.
 * @param {object} data Данные карточки.
 */
const getCardElement = (data)=> renderCard(data, {
  deleteCard,
  likeCard,
  openGallery: () => openPopup(popupKeys.gallery, () => initGallery(data)),
})


// Выводим карточки на страницу
cardList.append(...initialsCards.map(getCardElement))

// Открытие попапов
buttons.forEach(({ name, callback, ...item }) => item[name].addEventListener('click', () => openPopup(name, callback)))

// Слушаем событие отправки формы "Редактировать профиль"
forms.edit.addEventListener('submit', (event) => {
  handleEditFormSubmit(event);
  closePopup()
})

// Слушаем событие отправки формы "Добавить карточку"
forms.addCard.addEventListener('submit', (event) => {
  event.preventDefault()
  cardList.prepend(getCardElement({
    name: forms.addCard['place-name'].value,
    link: forms.addCard.link.value,
  }))
  closePopup();
  forms.addCard.reset();
})
