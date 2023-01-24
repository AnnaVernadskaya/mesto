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
//const galleryCardsTemplate = document.querySelector('#galleryCards');
//чтобы получить содержимое темплейт, нужно обратиться к его св-ву контент
const galleryCardsTemplate = document.querySelector("#galleryCards").content;
//делаем константу галлереи, куда добавить карточки
const gallery = document.querySelector(".gallery__cards");
//попап добавления новой карточки и инпуты в форме
const formCardPopup = document.forms["cardForm"];
const inputPlace = document.querySelector("#popup-input-place");
const inputLink = document.querySelector("#popup-input-link");
//карточки
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//функция, добавляющая модификатор в html -открывание попапа
//общая функция
const openPopup = function (popup) {
  popup.classList.add("popup_is-opened");
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

//пишем функцию, которая будет создавать карточку
const createCard = (dataCard) => {
  //клонируем содержимое тега темплейт
  const card = galleryCardsTemplate.cloneNode(true);
  //наполняем содержимым
  const imgPopup = card.querySelector(".gallery__img");
  const place = card.querySelector(".gallery__place");
  place.textContent = dataCard.name;
  imgPopup.src = dataCard.link;
  imgPopup.alt = dataCard.name;

  //удаление карточки- функция
  const deleteCard = (evt) => {
    evt.target.closest(".gallery__card").remove();
  };
  //удадение карточки - слушатель событий
  const buttonDeleteCard = card.querySelector(".gallery__delete-card");
  buttonDeleteCard.addEventListener("click", deleteCard);

  //функция лайка
  const buttonToggleLike = card.querySelector(".gallery__button-like");

  buttonToggleLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("gallery__button-like_active");
  });

  //открытие попапа - большое фото
  imgPopup.addEventListener("click", function () {
    (popupPhotoImg.src = dataCard.link),
      (popupPhotoImg.alt = dataCard.name),
      (popupPhotoFiqcaption.textContent = dataCard.name);

    openPopup(popupPhoto);
  });

  return card;
};

// функция, которая будет рендерить карточкуна странице
const renderCard = (dataCard) => {
  gallery.prepend(createCard(dataCard));
};

//добавление новой карточки через попап
// сохранение изменений в форме профиля

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function handleCardSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.

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

//функция, которая переберает массив и сохдает на основе его карточки
initialCards.forEach(renderCard);

//initialCards.forEach((dataCard) => {
// renderCard(dataCard);
//});
