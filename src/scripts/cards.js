import { CARD_SELECTOR } from './constants';

// Темплейт карточки
const cardTemplate =  document.querySelector('#card-template').content;
// DOM узлы
const content = document.querySelector('.content');

/**
 * Функция создания карточки.
 * @param cardData Данные карточки.
 * @param onDelete Обработчик удаления карточки.
 */
function renderCard(cardData, onDelete) {
    const cardElement = cardTemplate.querySelector(cardSelector).cloneNode(true);
    const image = cardElement.querySelector('.card__image');

    image.src = cardData.link;
    image.alt = cardData.name;

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__delete-button').onclick = onDelete;

    return cardElement;
}

/**
 * Функция удаления карточки.
 * @param event Cобытие клика.
 */
function deleteCard (event) {
    event.target.closest(CARD_SELECTOR).remove();
}
