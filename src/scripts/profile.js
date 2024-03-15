const profileForm = document.forms['edit-profile']
const profileElements = {
  name: document.querySelector('.profile__title'),
  description: document.querySelector('.profile__description')
}

/**
 * Обработчик отправки формы.
 * @param {Event} event Cобытие клика.
 */
export function handleEditFormSubmit (event) {
  event.preventDefault()

  profileElements.name.textContent = profileForm.name.value
  profileElements.description.textContent = profileForm.description.value
}

/**
 * Инициализирует форму редактирования профиля.
 */
export function initEditForm () {
  profileForm.name.value = profileElements.name.textContent
  profileForm.description.value = profileElements.description.textContent
}
