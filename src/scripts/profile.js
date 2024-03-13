import { closePopup } from './popups'

const formElement = document.forms['edit-profile']

const profileData = {
  name: document.querySelector('.profile__title'),
  description: document.querySelector('.profile__description')
}

/**
 * Обработчик отправки формы.
 */
function handleEditFormSubmit (evt) {
  evt.preventDefault()

  profileData.name.textContent = formElement.name.value
  profileData.description.textContent = formElement.description.value

  closePopup()
}

/**
 * Инициализирует форму редактирования профиля.
 */
export function initEditForm () {
  formElement.name.value = profileData.name.textContent
  formElement.description.value = profileData.description.textContent
}

formElement.addEventListener('submit', handleEditFormSubmit)
