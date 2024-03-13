const popups = {
  edit: document.querySelector('.popup_type_edit'),
  addCard: document.querySelector('.popup_type_new-card'),
  gallery: document.querySelector('.popup_type_image')
}
const currentPopupSelector = 'popup_is-opened'

/**
 * Закрытие popup'а.
 */
export function closePopup () {
  document.querySelector(`.${currentPopupSelector}`).classList.remove(currentPopupSelector)
}

/**
 * Обработчик нажатие кнопки "Esc".
 * @param {KeyboardEvent} event Данные события.
 */
export function handleKeyDownEsc (event) {
  event.key === 'Escape' && closePopup()
}

/**
 * Обработчик клика по Overlay.
 * @param {Event} event Данные события.
 */
export function handleClickOverlay (event) {
  if (event.target.classList.contains(currentPopupSelector)) {
    closePopup()
    event.target.removeEventListener('click', handleClickOverlay)
  }
}

/**
 * Открытие popup'а.
 * @param {string} name Название popup'а.
 * @param {function} [callback] Функция callback.
 */
export function openPopup (name, callback) {
  popups[name].classList.add(currentPopupSelector)

  callback && callback()

  // Навешиваем обработчики закрытия модального окна
  popups[name].addEventListener('click', handleClickOverlay)
  document.addEventListener('keydown', handleKeyDownEsc, { once: true })
  popups[name].querySelector('.popup__close').addEventListener('click', closePopup, { once: true })
}
