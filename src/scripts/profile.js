const formElement = document.forms['edit-profile']
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

  profileElements.name.textContent = formElement.name.value
  profileElements.description.textContent = formElement.description.value
}

/**
 * Инициализирует форму редактирования профиля.
 */
export function initEditForm () {
  formElement.name.value = profileElements.name.textContent
  formElement.description.value = profileElements.description.textContent
}
