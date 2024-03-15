import { initialsCards } from './scripts/initials-cards'
import { deleteCard, likeCard, renderCard } from './scripts/cards'
import { closePopup, openPopup } from './scripts/popups'
import { handleEditFormSubmit, initEditForm } from './scripts/profile'
import { initGallery } from './scripts/gallery'

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
  addCard: document.forms['new-place']
}
const buttons = [
  { edit: content.querySelector('.profile__edit-button'), name: popupKeys.edit },
  { addCard: content.querySelector('.profile__add-button'), name: popupKeys.addCard }
]
const popups = {
  edit: document.querySelector('.popup_type_edit'),
  addCard: document.querySelector('.popup_type_new-card'),
  gallery: document.querySelector('.popup_type_image')
}

/**
 * Обработчик открытия popup'а.
 * @param {string} name Название popup'а.
 * @param {object} [data] Данные popup'а.
 */
export function handleOpenPopup (name, data) {
  switch (name) {
    case popupKeys.edit:
      initEditForm()
      break
    case popupKeys.gallery:
      initGallery(data)
      break
  }
  openPopup(popups[name])
}

/**
 * Возвращает элемент карточки.
 * @param {object} data Данные карточки.
 */
const getCardElement = (data) => renderCard(data, {
  deleteCard,
  likeCard,
  openGallery: () => handleOpenPopup(popupKeys.gallery, data)
})

// Выводим карточки на страницу
cardList.append(...initialsCards.map(getCardElement))

// Открытие попапов
buttons.forEach(({ name, ...item }) => item[name].addEventListener('click', () => handleOpenPopup(name)))

// Слушаем событие отправки формы "Редактировать профиль"
forms.edit.addEventListener('submit', (event) => {
  handleEditFormSubmit(event)
  closePopup()
})

// Слушаем событие отправки формы "Добавить карточку"
forms.addCard.addEventListener('submit', (event) => {
  event.preventDefault()
  cardList.prepend(getCardElement({
    name: forms.addCard['place-name'].value,
    link: forms.addCard.link.value
  }))
  closePopup()
  forms.addCard.reset()
})
