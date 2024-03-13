import { CARD_SELECTOR } from './constants'
import { closePopup, openPopup } from './popups'

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

/**
 * Функция создания карточки.
 * @param {Object} cardData Данные карточки.
 * @return {Node} Элемент карточки
 */
export function renderCard (cardData) {
  const cardElement = cardTemplate.querySelector(CARD_SELECTOR).cloneNode(true)
  const image = cardElement.querySelector('.card__image')

  image.src = cardData.link
  image.alt = cardData.name

  cardElement.querySelector('.card__title').textContent = cardData.name
  cardElement.querySelector('.card__delete-button').onclick = deleteCard
  cardElement.querySelector('.card__like-button').onclick = likeCard
  cardElement.querySelector('.card__image').onclick = () => openPopup('gallery', { src: cardData.link, description: cardData.name })

  return cardElement
}

/**
 * Функция удаления карточки.
 * @param {object} event Cобытие клика.
 */
export function deleteCard (event) {
  event.target.closest(CARD_SELECTOR).remove()
}

/**
 * Функция лайка карточки.
 * @param {object} event Cобытие клика.
 */
export function likeCard (event) {
  event.target.classList.toggle('card__like-button_is-active')
}

const formElement = document.forms['new-place']

/**
 * Функция создания карточки.
 * @param {Object} evt Данные события.
 */
export function addCard (evt) {
  evt.preventDefault()
  const content = document.querySelector('.content')
  const cardList = content.querySelector('.places__list')

  const element = renderCard({ name: formElement['place-name'].value, link: formElement.link.value })

  cardList.prepend(element)

  formElement.reset()

  closePopup()
}
