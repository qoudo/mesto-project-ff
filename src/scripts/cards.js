export const cardSelector = '.card'

const cardTemplate = document.querySelector('#card-template').content

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
    image: element.querySelector('.card__image'),
    likeCounter: element.querySelector('.card__like-counter'),
  },
  buttons: {
    delete: element.querySelector('.card__delete-button'),
    like: element.querySelector('.card__like-button'),
  }
})

/**
 * Функция создания карточки.
 * @param {Object} cardData Данные карточки.
 * @param {number} userId Индентификатор пользователя.
 * @param {Object} callbacks Функции callback.
 * @return {Element} Элемент карточки
 */
export function renderCard (cardData, userId,  callbacks) {
  const cardElement = cardTemplate.querySelector(cardSelector).cloneNode(true)
  const { contents, buttons } = getCardElements(cardElement)
  const cardId = cardData.owner['_id'];

  contents.image.src = cardData.link
  contents.image.alt = cardData.name

  contents.title.textContent = cardData.name

  if (Array.isArray(cardData.likes) && cardData.likes.length > 0) {
    contents.likeCounter.classList.add('card__like-counter_is-active');
    contents.likeCounter.textContent = cardData.likes.length;
  }

  if (cardId === userId) {
    buttons.delete.classList.add('card__delete-button_is-active');
    buttons.delete.addEventListener('click',  (event) => callbacks.deleteCard(event, cardId))
  }

  buttons.like.addEventListener('click', callbacks.likeCard)
  contents.image.addEventListener('click', callbacks.openGallery)

  return cardElement
}
