import { INITIAL_CARDS } from './scripts/constants';
import { renderCard, deleteCard } from './scripts/cards';

import './styles/index.css';
import { openPopup } from "./scripts/popups";

const content = document.querySelector('.content');
const cardList = content.querySelector('.places__list');
const buttons = [
    { edit: content.querySelector('.profile__edit-button'), name: 'edit' },
    { addCard: content.querySelector('.profile__add-button'), name: 'addCard' },
    { gallery: content.querySelector('.profile__image'), name:'gallery' },
];

// Выводим карточки на страницу
cardList.append(...INITIAL_CARDS.map((data) => renderCard(data, deleteCard)))

// Открытие попапа
buttons.forEach(({name, ...item}) => item[name].addEventListener('click', () => openPopup(name)));
