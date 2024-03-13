import { closePopup } from './popups'

const FORM_ELEMENT = document.forms['edit-profile']
const PROFILE_NODES = {
  name: document.querySelector('.profile__title'),
  description: document.querySelector('.profile__description')
}

/**
 * Обработчик отправки формы.
 * @param {Event} event Cобытие клика.
 */
function handleEditFormSubmit (event) {
  event.preventDefault()

  PROFILE_NODES.name.textContent = FORM_ELEMENT.name.value
  PROFILE_NODES.description.textContent = FORM_ELEMENT.description.value

  closePopup()
}

/**
 * Инициализирует форму редактирования профиля.
 */
export function initEditForm () {
  FORM_ELEMENT.name.value = PROFILE_NODES.name.textContent
  FORM_ELEMENT.description.value = PROFILE_NODES.description.textContent
}

// Навешиваем обработчик клика на кнопку отправки формы
FORM_ELEMENT.addEventListener('submit', handleEditFormSubmit)
