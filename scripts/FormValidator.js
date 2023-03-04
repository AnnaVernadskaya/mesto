export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  //отключаем стандартную отправку формы
  _disableSubmit(event) {
    event.preventDefault();
  }

  //функция, которая валидирует форму
  enableValidation() {
    //находим форму на странице (параметр=объект.ключ)
    this._formList = Array.from(
      document.querySelectorAll(this._config.formSelector)
    );

    this._formList.forEach((item) => {
      this._enableFormValidation(item);
    });
  }

  // находит все формы, перебирает их, включает валидацию
  _enableFormValidation() {

    //событие инпут у формы
    this._formElement.addEventListener("input", () => {
      this._toggleButton();
    });

    this._addInputListeners();
  }

  //добавка класса на невалидный инпут
  _handleFormInput(event) {



    //находим инпут, на котором сработало событие
    this._input = event.target;
    this._inputId = this._input.id;
    //для связки инпута и спана с ошибкой
    this._errorElement = document.querySelector(`#${this._inputId}-error`);

    //сообщение об ошибке
    // свяжем спан с инпутом

    if (this._input.validity.valid) {
      this._input.classList.remove(this._config.inputErrorClass);
      this._errorElement.textContent = "";
    } else {
      this._input.classList.add(this._config.inputErrorClass);
      this._errorElement.textContent = this._input.validationMessage;
    }
  }

  //ф-ция блокирующая кнопку
  _toggleButton() {
    this._buttonSubmit = this._formElement.querySelector(this._config.buttonSelector);
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
      //вводим текст в инпут и слушатель срабатывает при каждой букве
      //включается ф-ция которая добавляет класс на невалидный инпут
      item.addEventListener("input", (item) => {
        this._handleFormInput(item);
        this._toggleButton();
      });
    });
  }
}
