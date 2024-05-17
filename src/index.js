import { cardSelector, renderCard } from './scripts/cards'
import { closePopup, openPopup } from './scripts/popups'
import { initEditForm, addProfile } from './scripts/profile'
import { initGallery } from './scripts/gallery'
import { enableValidation, clearValidation } from './scripts/validation'
import './styles/index.css'
import { handleError, RemoteAPI } from './scripts/api'

const content = document.querySelector('.content')
const cardList = content.querySelector('.places__list')
export const popupKeys = {
  edit: 'edit',
  addCard: 'addCard',
  gallery: 'gallery',
  deleteCard: 'deleteCard',
    updateAvatar: 'updateAvatar'
}
const forms = {
  edit: document.forms['edit-profile'],
  addCard: document.forms['new-place'],
    updateAvatar: document.forms['update-avatar']
}
const buttons = [
  { edit: content.querySelector('.profile__edit-button'), name: popupKeys.edit },
  { addCard: content.querySelector('.profile__add-button'), name: popupKeys.addCard },
  { updateAvatar: content.querySelector('.profile__image'), name: popupKeys.updateAvatar }
]
const popups = {
  edit: document.querySelector('.popup_type_edit'),
  addCard: document.querySelector('.popup_type_new-card'),
  gallery: document.querySelector('.popup_type_image'),
  deleteCard: document.querySelector('.popup_type_delete-card'),
  updateAvatar: document.querySelector('.popup_type_update-avatar')
}
const popupSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

/**
 * Обработчик удаления карточки.
 * @param {CloseEvent} event Cобытие клика.
 * @param {number} cardId Индентификатор карточки.
 */
function handleDeleteCard (event, cardId) {
  openPopup(popups.deleteCard)

  popups.deleteCard.querySelector(popupSelectors.submitButtonSelector).addEventListener('click', () => {
    RemoteAPI.deleteCard(cardId)
      .then(() => {
        event.target.closest(cardSelector).remove()
        closePopup()
      })
      .catch(handleError)
  })
};

/**
 * Обработчик кнопки "нравится".
 * @param {CloseEvent} event Cобытие клика.
 * @param {number} cardId Индентификатор карточки.
 * @param {HTMLSpanElement} likeCounter Счетчик лайков.
 */
function handleToggleLike (event, cardId, likeCounter) {
  if (event.target.classList.contains('card__like-button_is-active')) {
    RemoteAPI.unLikeCard(cardId)
      .then((data) => {
        event.target.classList.remove('card__like-button_is-active')
        likeCounter.textContent = data.likes.length
      })
      .catch(handleError)
  } else {
    RemoteAPI.likeCard(cardId)
      .then((data) => {
        event.target.classList.add('card__like-button_is-active')
        likeCounter.textContent = data.likes.length
      })
      .catch(handleError)
  }
};

/**
 * Обработчик открытия popup'а.
 * @param {string} name Название popup'а.
 * @param {object} [data] Данные popup'а.
 */
function handleOpenPopup (name, data) {
  switch (name) {
    case popupKeys.edit:
      initEditForm(forms.edit)
      break
    case popupKeys.gallery:
      initGallery(data)
      break
  }

  clearValidation(popupSelectors)
  openPopup(popups[name])
}

/**
 * Обработчик добавление карточки.
 * @param {Event} event Объект события.
 */
function handleAddCard (event) {
  event.preventDefault()

  RemoteAPI.addCard({
    name: forms.addCard['place-name'].value,
    link: forms.addCard.link.value
  })
    .then((data) => {
      cardList.prepend(getCardElement(data, data.owner._id))
      closePopup()
      forms.addCard.reset()
    })
    .catch(handleError)
}

/**
 * Обработчик обновления данных пользователя.
 * @param {Event} event Объект события.
 */
function handleUpdateUser (event) {
  event.preventDefault()

  RemoteAPI.updateUser({
    name: forms.edit.name.value,
    about: forms.edit.description.value
  })
    .then((data) => {
      addProfile(data)
      closePopup()
    })
    .catch(handleError)
}

/**
 * Возвращает элемент карточки.
 * @param {object} data Данные карточки.
 * @param {number} userId Индентификатор пользователя.
 */
const getCardElement = (data, userId) => renderCard(data, userId, {
  deleteCard: (event) => handleDeleteCard(event, data._id),
  likeCard: (event, likeCounter) => handleToggleLike(event, data._id, likeCounter),
  openGallery: () => handleOpenPopup(popupKeys.gallery, data)
})

// Открытие попапов
buttons.forEach(({ name, ...item }) => item[name].addEventListener('click', () => handleOpenPopup(name)))
// Слушаем событие отправки формы "Редактировать профиль"
forms.edit.addEventListener('submit', (event) => handleUpdateUser)
// Слушаем событие отправки формы "Добавить карточку"
forms.addCard.addEventListener('submit', (event) => handleAddCard)

// Запускаем валидацию форм
enableValidation(popupSelectors)

// Инициализируем загрузку данных пользотвателя и карточек
Promise.all([RemoteAPI.getUser(), RemoteAPI.getCards()])
  .then(([{ _id: id, ...user }, cards]) => {
    // Инициализация пользователя
    addProfile(user)
    // Выводим карточки на страницу
    cardList.append(...cards.map((item) => getCardElement(item, id)))
  })
  .catch(handleError)
