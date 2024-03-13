
const popups = {
    edit: document.querySelector('.popup_type_edit'),
    addCard: document.querySelector('.popup_type_new-card'),
    gallery: document.querySelector('.popup_type_image'),
};

/**
 * Открытие popup'а.
 * @param {string} name Данные карточки.
 */
export function openPopup(name) {
    popups[name].classList.add('popup_is-opened');

    popups[name].addEventListener('click', handleClickOverlay);
    document.addEventListener('keydown', handleKeyDownEsc,  { once: true });
    popups[name].querySelector('.popup__close').addEventListener('click', closePopup, { once: true });
}

/**
 * Закрытие popup'а.
 */
export function closePopup() {
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
}

/**
 * Обработчик нажатие кнопки "Esc".
 * @param {object} evt Данные карточки.
 */
export function handleKeyDownEsc(evt) {
   evt.key === 'Escape' && closePopup();
}

/**
 * Обработчик клика по Overlay.
 * @param {object} evt Данные карточки.
 */
export function handleClickOverlay(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closePopup();
        evt.target.removeEventListener('click', handleClickOverlay);
    }
}
