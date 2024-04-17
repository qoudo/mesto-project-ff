/**
 * Проверяет поле на валидность.
 * @param {Array<HTMLInputElement>} inputList Коллекция полей.
 */
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

/**
 * Переключает состояние кнопки активная/неактивная.
 * @param {Array<HTMLInputElement>} inputList Коллекция полей.
 * @param {HTMLButtonElement} buttonElement Кнопка.
 * @param {object} selectors Набор селекторов.
 */
const toggleButtonState = (inputList, buttonElement, selectors) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(selectors.inactiveButtonClass)
  } else {
    buttonElement.classList.remove(selectors.inactiveButtonClass)
  }
}

/**
 * Выводит сообщение об ошибке.
 * @param {HTMLFormElement} formElement Форма.
 * @param {HTMLInputElement} inputElement Инпут.
 * @param {string} errorMessage Сообщение.
 * @param {object} selectors Набор селекторов.
 */
const showInputError = (formElement, inputElement, errorMessage, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(selectors.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(selectors.errorClass)
}

/**
 * Прятает сообщение об ошибке.
 * @param {HTMLFormElement} formElement Форма.
 * @param {HTMLInputElement} inputElement Инпут.
 * @param {object} selectors Набор селекторов.
 */
const hideInputError = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(selectors.inputErrorClass)
  errorElement.classList.remove(selectors.errorClass)
  errorElement.textContent = ''
}

/**
 * Проверяет поле на валидность.
 * @param {HTMLFormElement} formElement Форма.
 * @param {HTMLInputElement} inputElement Инпут.
 * @param {object} selectors Набор селекторов.
 */
const checkInputValidity = (formElement, inputElement, selectors) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
  } else {
    inputElement.setCustomValidity('')
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectors)
  } else {
    hideInputError(formElement, inputElement, selectors)
  }
}

/**
 * Устанавливает слушателя событий.
 * @param {HTMLFormElement} formElement Форма.
 * @param {object} selectors Набор селекторов.
 */
const setEventListeners = (formElement, selectors) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector))
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector)
  toggleButtonState(inputList, buttonElement, selectors)
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, selectors)
      toggleButtonState(inputList, buttonElement, selectors)
    })
  })
}

/**
 * Отчищает ошибки форм.
 * @param {object} selectors Набор селекторов.
 */
export const clearValidation = (
  selectors
) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector))
  formList.forEach((formElement) => {
    const inputList = [...formElement.querySelectorAll(selectors.inputSelector)]
    const submitButtonElement = formElement.querySelector(selectors.submitButtonSelector)

    inputList.forEach((inputElement) => {
      hideInputError(formElement, inputElement, selectors)
    })

    toggleButtonState(inputList, submitButtonElement, selectors)
  })
}

/**
 * Включает валидацию полей форм.
 * @param {object} selectors Набор селекторов.
 */
export const enableValidation = (selectors) => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault()
    })
    setEventListeners(formElement, selectors)
  })
}
