import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./constants.js";

const formValidationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  buttonSelector: ".popup__button-save",
  buttonDisabledClass: "popup__button-save_disabled",
};

//ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА
//выбираем попапы - профиль, карточки, фото
const popupProfile = document.querySelector(".popup_section_profile");
const popupCards = document.querySelector(".popup_section_cards");
const popupPhoto = document.querySelector(".popup_section_photo");
//выбираем кнопки, открывающую попап на странице - профиль, карточки
const popupProfileOpenButton = document.querySelector(".profile__button-edit");
const popupCardsOpenButton = document.querySelector(".profile__button-plus");
//находим форму в попапе профиля
const formProfilePopup = document.forms["profileForm"];
//находим поля формы
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_job");
// Выбераем элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");
//открытое фото и подпись к нему
const popupPhotoImg = popupPhoto.querySelector(".popup__image");
const popupPhotoFiqcaption = popupPhoto.querySelector(".popup__figcaption");
//находим все закрывающие кнопки-крестики
const closeButtons = document.querySelectorAll(".popup__close");
// получаем элемент темплейт

//делаем константу галлереи, куда добавить карточки
const gallery = document.querySelector(".gallery__cards");
//попап добавления новой карточки и инпуты в форме
const formCardPopup = document.forms["cardForm"];
const inputPlace = document.querySelector("#popup-input-place");
const inputLink = document.querySelector("#popup-input-link");



const selectorTemplate = "#galleryCards";

export { selectorTemplate };

//функция для открытия попапа с фото
function openPopupPhoto(name, link) {
  popupPhotoImg.src = link;
  popupPhotoImg.alt = name;
  popupPhotoFiqcaption.textContent = name;

  openPopup(popupPhoto);
}

export { openPopupPhoto };

//функция, добавляющая модификатор в html -открывание попапа
//общая функция
const openPopup = function (popup) {
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closePopupByEsc);
};

//открываем попап профиль
popupProfileOpenButton.addEventListener("click", function () {
  openPopup(popupProfile);

  nameInput.value = profileName.textContent;
  jobInput.value = profileAboutMe.textContent;
});

popupCardsOpenButton.addEventListener("click", function () {
  openPopup(popupCards);
});

//функция закрывающая попап
// находим все крестики проекта по универсальному селектору closeButtons=.popup__close
const closePopup = function (popup) {
  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closePopupByEsc);
};

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

// сохранение изменений в форме профиля

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.

  // Получаем значение полей jobInput и nameInput из свойства value
  // Вставляем новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = jobInput.value;

  closePopup(popupProfile);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formProfilePopup.addEventListener("submit", handleProfileFormSubmit);

// закрытие попапа по оверлею
const closePopupByClickOnOverlay = function (evt) {
  console.log(evt.target);
  console.log(evt.currentTarget);

  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};

popupProfile.addEventListener("click", closePopupByClickOnOverlay);
popupCards.addEventListener("click", closePopupByClickOnOverlay);
popupPhoto.addEventListener("click", closePopupByClickOnOverlay);

//закрытие попапа на esc
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

// функция, которая будет рендерить карточкуна странице
const renderCard = (item) => {
  gallery.prepend(addCard(item));
};

//добавление новой карточки через попап
// сохранение изменений в форме профиля

function handleCardSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.

  evt.submitter.disabled = true;
  evt.submitter.classList.add("popup__button-save_disabled");

  //наполняем содержимым из инпутов
  renderCard({ name: inputPlace.value, link: inputLink.value });

  //inputPlace.value = '';
  //inputLink.value = '';
  evt.target.reset();

  closePopup(popupCards);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formCardPopup.addEventListener("submit", handleCardSubmit);

//экзепмляры класса валидации для каждой формы
const validationFormProfile = new FormValidator(
  formValidationConfig,
  formProfilePopup
);
validationFormProfile.enableValidation();

const ValidationFormCards = new FormValidator(
  formValidationConfig,
  formCardPopup
);
ValidationFormCards.enableValidation();

initialCards.forEach((item) => {
  // Добавляем в DOM
  document.querySelector(".gallery__cards").append(addCard(item));
});

function addCard(item) {
  //Создадим экземпляр карточки
  const card = new Card(item.name, item.link, openPopupPhoto, selectorTemplate);
  //Создаём карточку и возвращаем наружу
  return card.generateCard();
}
