/**
 * Инициализирует форму редактирования профиля.
 */
export function initGallery (data) {
  const popup = document.querySelector('.popup_type_image')
  const img = popup.querySelector('.popup__image')
  const caption = popup.querySelector('.popup__caption')

  img.src = data.src
  img.alt = data.description

  caption.innerText = data.description
}
