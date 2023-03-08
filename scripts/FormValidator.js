//Экземпляр класса FormValidator создаётся для каждой проверяемой формы. Класс соответствует описанию из проектной работы.


export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._buttonSubmit = this._formElement.querySelector(
      this._config.buttonSelector
    );
  }

  //функция, которая валидирует форму
  enableValidation() {
    this._addInputListeners();
    this.toggleButton();
  }

  //показывает сообщение об ошибке
  _showInputError = (item) => {
    this._inputId = item.id;
    this._errorElement = this._formElement.querySelector(
      `#${this._inputId}-error`
    );

    item.classList.add(this._config.inputErrorClass);
    this._errorElement.textContent = item.validationMessage;
  };

  _hideInputError = (item) => {
    this._inputId = item.id;
    this._errorElement = this._formElement.querySelector(
      `#${this._inputId}-error`
    );

    item.classList.remove(this._config.inputErrorClass);
    this._errorElement.textContent = "";
  };

  _handleFormInput = (item) => {
    if (!item.validity.valid) {
      this._showInputError(item);
    } else {
      this._hideInputError(item);
    }
  };

  //ф-ция блокирующая кнопку
  toggleButton() {
    this._isFormValid = this._formElement.checkValidity();

    //если форма невалидна - дизейбл включить
    this._buttonSubmit.disabled = !this._isFormValid;
    this._buttonSubmit.classList.toggle(
      this._config.buttonDisabledClass,
      !this._isFormValid
    );
  }

  //добавим слушатели на инпут - передаём форму и объект-в нём находим все инпуты
  _addInputListeners() {
    //коллекция дом элементов-инпутов - сделали массив
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );

    //проходимся по инпутам и навешиваем обработчик, в котором запускаятся функция, проверяет валидность и добавляет-убирает класс
    this._inputList.forEach((item) => {
      item.addEventListener('input', () => {
        this._handleFormInput(item);
        this.toggleButton();
      });
    });
  }
}
