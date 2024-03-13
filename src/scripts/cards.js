import { CARD_SELECTOR } from './constants';

// Темплейт карточки
const cardTemplate =  document.querySelector('#card-template').content;

/**
 * Функция создания карточки.
 * @param {Object} cardData Данные карточки.
 * @param {function} onDelete Обработчик удаления карточки.
 */
export function renderCard(cardData, onDelete) {
    const cardElement = cardTemplate.querySelector(CARD_SELECTOR).cloneNode(true);
    const image = cardElement.querySelector('.card__image');

    image.src = cardData.link;
    image.alt = cardData.name;

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__delete-button').onclick = onDelete;

    return cardElement;
}

/**
 * Функция удаления карточки.
 * @param {object} event Cобытие клика.
 */
export function deleteCard (event) {
    event.target.closest(CARD_SELECTOR).remove();
}
