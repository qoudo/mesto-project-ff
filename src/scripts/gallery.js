/**
 * Инициализирует галерею.
 */
export function initGallery (data) {
  const popup = document.querySelector('.popup_type_image')
  const img = popup.querySelector('.popup__image')
  const caption = popup.querySelector('.popup__caption')

  img.src = data.link
  img.alt = data.name

  caption.innerText = data.name
}
