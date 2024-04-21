const profileElements = {
  name: document.querySelector('.profile__title'),
  description: document.querySelector('.profile__description'),
  avatar: document.querySelector('.profile__image')
}

export const initialProfile = ({ name, about, avatar }) => {
  profileElements.name.textContent = name
  profileElements.description.textContent = about
  profileElements.avatar.style.backgroundImage = `url(${avatar})`
}

/**
 * Обработчик отправки формы.
 * @param {Event} event Cобытие клика.
 * @param {Element} profileForm Форма профиля.
 */
export function handleEditFormSubmit (event, profileForm) {
  event.preventDefault()

  profileElements.name.textContent = profileForm.name.value
  profileElements.description.textContent = profileForm.description.value
}

/**
 * Инициализирует форму редактирования профиля.
 * @param {Element} profileForm Форма профиля.
 */
export function initEditForm (profileForm) {
  profileForm.name.value = profileElements.name.textContent
  profileForm.description.value = profileElements.description.textContent
}
