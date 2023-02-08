//сгруппируем необходимые нам параметры в объект
const formValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  buttonSelector: ".popup__button-save",
  buttonDisabledClass: "popup__button-save_disabled",
};

//отключаем стандартную отправку формы
function disableSubmit(event) {
  event.preventDefault();
}

//функция, которая валидирует форму
function enableValidation(config) {
  //находим форму на странице (параметр=объект.ключ)
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    enableFormValidation(form, config);
  });
}

// находит все формы, перебирает их, включает валидацию
function enableFormValidation(form, config) {
  //слушатель, вызывает функцию, отменяющую стандартную отправку формы
  form.addEventListener("submit", disableSubmit);

  //событие инпут у формы
  form.addEventListener("input", () => {
    toggleButton(form, config);
  });

  addInputListeners(form, config);
  toggleButton(form, config);
}

//добавка класса на невалидный инпут
function handleFormInput(event, config) {
  //находим инпут, на котором сработало событие
  const input = event.target;
  const inputId = input.id;
  //для связки инпута и спана с ошибкой
  const errorElement = document.querySelector(`#${inputId}-error`);

  //сообщение об ошибке
  // свяжем спан с инпутом

  if (input.validity.valid) {
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
  } else {
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }
}

//ф-ция блокирующая кнопку
function toggleButton(form, config) {
  const buttonSubmit = form.querySelector(config.buttonSelector);
  const isFormValid = form.checkValidity();

  //если форма невалидна - дизейбл включить
  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle("popup__button-save_disabled", !isFormValid);
}

//добавим слушатели на инпут - передаём форму и объект-в нём находим все инпуты
function addInputListeners(form, config) {
  //коллекция дом элементов-инпутов - сделали массив
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));

  //проходимся по инпутам и навешиваем обработчик, в котором запускаятся функция, проверяет валидность и добавляет-убирает класс
  inputList.forEach(function (item) {
    //вводим текст в инпут и слушатель срабатывает при каждой букве
    //включается ф-ция которая добавляет класс на невалидный инпут
    item.addEventListener("input", (event) => {
      handleFormInput(event, config);
    });
  });
}

//вызываем функцию, которая валидирует форму, передаём ей объект
enableValidation(formValidationConfig);
