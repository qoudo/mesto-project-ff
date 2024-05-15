import { deleteCard, likeCard, renderCard } from './scripts/cards'
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
const popupSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const handleCardDelete = ({ cardId, buttonElement }) => {
  // так как по сути кнопка "Да" все равно выполняет только ровно одну операцию как confirm()
  popupConfirmButton.onclick = () => {
    buttonElement.disabled = true;

    APIDeleteCard(cardId)
        .then(() => {
          buttonElement.closest('.card').remove();

          closeModal(popupConfirm);
        })
        .catch((error) => {
          buttonElement.disabled = false;
          console.error(error);
        });
  };
};

/**
 * Обработчик открытия popup'а.
 * @param {string} name Название popup'а.
 * @param {object} [data] Данные popup'а.
 */
export function handleOpenPopup (name, data) {
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
 * Возвращает элемент карточки.
 * @param {object} data Данные карточки.
 */
const getCardElement = (data) => renderCard(data, {
  deleteCard,
  likeCard,
  openGallery: () => handleOpenPopup(popupKeys.gallery, data)
})

// Открытие попапов
buttons.forEach(({ name, ...item }) => item[name].addEventListener('click', () => handleOpenPopup(name)))

// Слушаем событие отправки формы "Редактировать профиль"
forms.edit.addEventListener('submit', (event) => {
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
})

// Слушаем событие отправки формы "Добавить карточку"
forms.addCard.addEventListener('submit', (event) => {
  event.preventDefault()

  RemoteAPI.addCard({
    name: forms.addCard['place-name'].value,
    link: forms.addCard.link.value
  })
    .then((data) => {
      cardList.prepend(getCardElement(data))

      closePopup()
      forms.addCard.reset()
    })
    .catch(handleError)
})

// Запускаем валидацию форм
enableValidation(popupSelectors)

// Инициализируем загрузку данных пользотвателя и карточек
Promise.all([RemoteAPI.getUser(), RemoteAPI.getCards()])
  .then(([{ _id: id, ...user }, cards]) => {
    // Инициализация пользователя
    addProfile(user)
    // Выводим карточки на страницу
    cardList.append(...cards.map(getCardElement))
  })
  .catch(handleError)
