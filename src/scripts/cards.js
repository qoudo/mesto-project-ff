const cardSelector = '.card'

const cardTemplate = document.querySelector('#card-template').content

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
 * Возвращает элементы карточки.
 * @param {Element} element Данные карточки.
 * @return {Object} Элементы карточки.
 */
const getCardElements = (element) => ({
  contents: {
    title: element.querySelector('.card__title'),
    image: element.querySelector('.card__image')
  },
  buttons: {
    delete: element.querySelector('.card__delete-button'),
    like: element.querySelector('.card__like-button')
  }
})

/**
 * Функция создания карточки.
 * @param {Object} cardData Данные карточки.
 * @param {Object} callbacks Функции callback.
 * @return {Element} Элемент карточки
 */
export function renderCard (cardData, callbacks) {
  const cardElement = cardTemplate.querySelector(cardSelector).cloneNode(true)
  const { contents, buttons } = getCardElements(cardElement)

  contents.image.src = cardData.link
  contents.image.alt = cardData.name

  contents.title.textContent = cardData.name

  buttons.delete.addEventListener('click', callbacks.deleteCard)
  buttons.like.addEventListener('click', callbacks.likeCard)
  contents.image.addEventListener('click', callbacks.openGallery)

  return cardElement
}
