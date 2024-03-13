import { initEditForm } from './profile'
import { initGallery } from './gallery'
import { POPUPS_KEYS } from './constants'

const POPUPS = {
  edit: document.querySelector('.popup_type_edit'),
  addCard: document.querySelector('.popup_type_new-card'),
  gallery: document.querySelector('.popup_type_image')
}

const CURRENT_POPUP_SELECTOR = 'popup_is-opened'

/**
 * Закрытие popup'а.
 */
export function closePopup () {
  document.querySelector(`.${CURRENT_POPUP_SELECTOR}`).classList.remove(CURRENT_POPUP_SELECTOR)
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
  if (event.target.classList.contains(CURRENT_POPUP_SELECTOR)) {
    closePopup()
    event.target.removeEventListener('click', handleClickOverlay)
  }
}

/**
 * Открытие popup'а.
 * @param {string} name Название popup'а.
 * @param {object} [data] Данные popup'а.
 */
export function openPopup (name, data) {
  POPUPS[name].classList.add(CURRENT_POPUP_SELECTOR)

  switch (name) {
    case POPUPS_KEYS.edit:
      initEditForm()
      break
    case POPUPS_KEYS.gallery:
      initGallery(data)
      break
  }

  // Навешиваем обработчики закрытия модального окна
  POPUPS[name].addEventListener('click', handleClickOverlay)
  document.addEventListener('keydown', handleKeyDownEsc, { once: true })
  POPUPS[name].querySelector('.popup__close').addEventListener('click', closePopup, { once: true })
}
