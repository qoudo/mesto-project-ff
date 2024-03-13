import { INITIAL_CARDS, POPUPS_KEYS } from './scripts/constants'
import { renderCard } from './scripts/cards'

import './styles/index.css'
import { openPopup } from './scripts/popups'

const CONTENT = document.querySelector('.content')
const CARD_LIST = CONTENT.querySelector('.places__list')

const BUTTONS = [
  { edit: CONTENT.querySelector('.profile__edit-button'), name: POPUPS_KEYS.edit },
  { addCard: CONTENT.querySelector('.profile__add-button'), name: POPUPS_KEYS.addCard }
]

// Выводим карточки на страницу
CARD_LIST.append(...INITIAL_CARDS.map((data) => renderCard(data)))

// Открытие попапа
BUTTONS.forEach(({ name, ...item }) => item[name].addEventListener('click', () => openPopup(name)))
