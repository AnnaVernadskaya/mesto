//ОТКРЫТИЕ И ЗАКРЫТИЕ ПОПАПА
//выбираем попапы - профиль, карточки, фото
const popupProfile = document.querySelector('.popup_section_profile');
const popupCards = document.querySelector('.popup_section_cards');
const popupPhoto = document.querySelector('.popup_section_photo');

//выбираем кнопки, открывающую попап на странице - профиль, карточки
const popupProfileOpenButton = document.querySelector('.profile__button-edit');
const popupCardsOpenButton = document.querySelector('.profile__button-plus');

//выбираем кнопку закрывающую попап - профиль, карточки, фото
const popupProfileCloseButton = popupProfile.querySelector('.popup__close-profile');
const popupCardsCloseButton = popupCards.querySelector('.popup__close-cards');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__close-photo');

//функция, добавляющая модификатор в html -открывание попапа
//общая функция
const openPopup = function (popup) {
  popup.classList.add('popup_is-opened');
}

  //находим форму в попапе профиля
  const formProfilePopup = document.querySelector('.popup__form-profile');
  //находим поля формы
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_job');
  // Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');

//открываем попап профиль
popupProfileOpenButton.addEventListener('click', function () {
  openPopup(popupProfile);

  nameInput.value = profileName.textContent;
  jobInput.value = profileAboutMe.textContent;
});

popupCardsOpenButton.addEventListener('click', function () {
  openPopup(popupCards);
});

//функция закрывающая попап
const closePopup = function (popup) {
  popup.classList.remove('popup_is-opened');
}

popupProfileCloseButton.addEventListener('click', function () {
  closePopup(popupProfile);
});

popupCardsCloseButton.addEventListener('click', function () {
  closePopup(popupCards);
});

popupPhotoCloseButton.addEventListener('click', function () {
  closePopup(popupPhoto);
});


// сохранение изменений в форме профиля

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
// Так мы можем определить свою логику отправки.

  // Получите значение полей jobInput и nameInput из свойства value
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = jobInput.value;

  closePopup(popupProfile);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfilePopup.addEventListener('submit', handleFormSubmit);

//карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


// получаем элемент темплейт
//const galleryCardsTemplate = document.querySelector('#galleryCards');
//чтобы получить содержимое темплейт, нужно обратиться к его св-ву контент
const galleryCardsTemplate = document.querySelector('#galleryCards').content;

//делаем константу галлереи, куда добавить
const gallery = document.querySelector('.gallery__cards');

//пишем функцию, которая будет создавать карточку
const createCard = (dataCard) => {
//клонируем содержимое тега темплейт
  const card = galleryCardsTemplate.cloneNode(true);
  //наполняем содержимым
  const img = card.querySelector('.gallery__img');
  const place = card.querySelector('.gallery__place');
  place.textContent = dataCard.name;
  img.src = dataCard.link;
  img.alt = dataCard.name;

//удаление карточки- функция
const deleteCard = (evt) => {
  evt.target.closest('.gallery__card').remove();
}
//удадение карточки - слушатель событий
const buttonDeleteCard = card.querySelector('.gallery__delete-card');
buttonDeleteCard.addEventListener('click', deleteCard);

//функция лайка
const buttonToggleLike = card.querySelector('.gallery__button-like');

buttonToggleLike.addEventListener('click', function (evt) {
  evt.target.classList.toggle('gallery__button-like_active');
});

//фото
const popupPhotoOpenButton = card.querySelector('.gallery__img');
const popupPhotoImg = popupPhoto.querySelector('.popup__image');
const popupPhotoFiqcaption = popupPhoto.querySelector('.popup__figcaption');
console.log(popupPhotoFiqcaption);

popupPhotoOpenButton.addEventListener('click', function (name, link) {
popupPhotoImg.src = dataCard.link,
popupPhotoImg.alt = dataCard.name,
popupPhotoFiqcaption.textContent = dataCard.name;

  openPopup(popupPhoto);
});

  return card;
}

// функция, которая будет рендерить карточкуна странице
const renderCard = (dataCard) => {
  gallery.prepend(createCard(dataCard));
}


//добавление новой карточки через попап
// сохранение изменений в форме профиля

const formCardPopup = document.querySelector('#popup-form-cards');
const inputPlace = document.querySelector('#popup-input-place');
const inputLink = document.querySelector('#popup-input-link');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function handleCardSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
// Так мы можем определить свою логику отправки.

//наполняем содержимым из инпутов
    renderCard({name: inputPlace.value, link: inputLink.value});

  closePopup(popupCards);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

formCardPopup.addEventListener('submit', handleCardSubmit);



//функция, которая переберает массив и сохдает на основе его карточки
initialCards.forEach((dataCard) => {
  renderCard(dataCard);
});
