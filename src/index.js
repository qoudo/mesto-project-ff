import './styles/index.css';
import { INITIAL_CARDS } from './scripts/constants';

const cardList = content.querySelector('.places__list');

// Выводим карточки на страницу
cardList.append(...INITIAL_CARDS.map((data) => renderCard(data, deleteCard)))
