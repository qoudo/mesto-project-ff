import { closePopup, openPopup } from './popups'
import { POPUPS_KEYS } from './constants'

const CARD_TEMPLATE = document.querySelector('#card-template').content
const FORM_ELEMENT = document.forms['new-place']
export const CARD_SELECTOR = '.card'

/**
 * Функция удаления карточки.
 * @param {Event} event Cобытие клика.
 */
export function deleteCard (event) {
  event.target.closest(CARD_SELECTOR).remove()
}

/**
 * Функция лайка карточки.
 * @param {Event} event Cобытие клика.
 */
export function likeCard (event) {
  event.target.classList.toggle('card__like-button_is-active')
}

/**
 * Функция создания карточки.
 * @param {Object} cardData Данные карточки.
 * @return {Element} Элемент карточки
 */
export function renderCard (cardData) {
  const cardElement = CARD_TEMPLATE.querySelector(CARD_SELECTOR).cloneNode(true)
  const image = cardElement.querySelector('.card__image')

  image.src = cardData.link
  image.alt = cardData.name

  cardElement.querySelector('.card__title').textContent = cardData.name
  cardElement.querySelector('.card__delete-button').onclick = deleteCard
  cardElement.querySelector('.card__like-button').onclick = likeCard
  cardElement.querySelector('.card__image').onclick = () => openPopup(POPUPS_KEYS.gallery, cardData)

  return cardElement
}

/**
 * Функция добавление карточки.
 * @param {Event} event Данные события.
 */
export function addCard (event) {
  event.preventDefault()
  const content = document.querySelector('.content')
  const cardList = content.querySelector('.places__list')
  const element = renderCard({ name: FORM_ELEMENT['place-name'].value, link: FORM_ELEMENT.link.value })

  cardList.prepend(element)

  FORM_ELEMENT.reset()

  closePopup()
}

// Навешиваем обработчик клика на кнопку отправки формы
FORM_ELEMENT.addEventListener('submit', addCard)
