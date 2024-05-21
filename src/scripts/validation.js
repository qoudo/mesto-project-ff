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
    buttonElement.disabled = true
    buttonElement.classList.add(selectors.inactiveButtonClass)
  } else {
    buttonElement.disabled = false
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
 * @param {object} config Набор селекторов.
 * @param {HTMLDivElement} popup Попап.
 */
export const clearValidation = (
  config,
  popup
) => {
  const form = popup.querySelector(config.formSelector)
  const inputList = [...form.querySelectorAll(config.inputSelector)]
  const submitButtonElement = form.querySelector(config.submitButtonSelector)

    inputList.forEach((inputElement) => {
    hideInputError(form, inputElement, config)
    form.reset()
    toggleButtonState(inputList, submitButtonElement, config)
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
