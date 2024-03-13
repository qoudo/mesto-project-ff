const cardTemplate = document.querySelector('#card-template').content
export const cardSelector = '.card'

/**
 * Функция удаления карточки.
 * @param {Event} event Cобытие клика.
 */
export function deleteCard (event) {
  event.target.closest(cardSelector).remove()
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
 * @param {Object} callbacks Функции callback.
 * @return {Element} Элемент карточки
 */
export function renderCard (cardData, callbacks) {
  const cardElement = cardTemplate.querySelector(cardSelector).cloneNode(true)
  const image = cardElement.querySelector('.card__image')

  image.src = cardData.link
  image.alt = cardData.name

  cardElement.querySelector('.card__title').textContent = cardData.name
  cardElement.querySelector('.card__delete-button').onclick = callbacks.deleteCard
  cardElement.querySelector('.card__like-button').onclick = callbacks.likeCard
  cardElement.querySelector('.card__image').onclick = callbacks.openGallery

  return cardElement
}
