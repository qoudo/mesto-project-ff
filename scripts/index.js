// Темплейт карточки
const cardTemplate =  document.querySelector('#card-template').content;
// DOM узлы
const content = document.querySelector('.content');
const cardList = content.querySelector('.places__list');

/**
 * Функция создания карточки.
 * @param cardData Данные карточки.
 * @param onDelete Обработчик удаления карточки.
 */
function renderCard(cardData, onDelete) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__delete-button').onclick = () => onDelete(cardElement);

    cardList.append(cardElement)
}

/**
 * Функция удаления карточки.
 * @param element HTML-элемент.
 */
function deleteCard (element) {
    element.remove();
}

// Выводим карточки на страницу
cardList.append(initialCards.map((data) => renderCard(data, deleteCard)))
