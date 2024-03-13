import { INITIAL_CARDS } from './scripts/constants';
import { renderCard, deleteCard } from './scripts/cards';

import './styles/index.css';

const content = document.querySelector('.content');
const cardList = content.querySelector('.places__list');

// Выводим карточки на страницу
cardList.append(...INITIAL_CARDS.map((data) => renderCard(data, deleteCard)))
