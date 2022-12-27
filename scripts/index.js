//ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА
//выбираем попап
const popupElement = document.querySelector('.popup');
//выбираем кнопку, закрывающую попап
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
//выбираем кнопку, открывающую попап на странице
const popupOpenButtonElement = document.querySelector('.profile__button-edit');
// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const usernameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_job');
// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');

//добавляем модификатор в html
const openPopup = function() {
  popupElement.classList.add('popup_is-opened');

  usernameInput.value = profileName.textContent;
  jobInput.value = profileAboutMe.textContent;
}

const closePopup = function() {
  popupElement.classList.remove('popup_is-opened');
}

//СОХРАНЕНИЕ В ФОРМЕ

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
// Так мы можем определить свою логику отправки.

    // Получите значение полей jobInput и nameInput из свойства value
    // Вставьте новые значения с помощью textContent
    profileName.textContent = usernameInput.value;
    profileAboutMe.textContent = jobInput.value;

    closePopup();
  }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

