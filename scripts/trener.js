
//пишем функцию, которая будет создавать карточку
const createCard = (dataCard) => {
  //клонируем содержимое тега темплейт
  const card = galleryCardsTemplate.cloneNode(true);

  // получаем элемент темплейт
  //const galleryCardsTemplate = document.querySelector('#galleryCards');
  //чтобы получить содержимое темплейт, нужно обратиться к его св-ву контент
  //const galleryCardsTemplate = document.querySelector("#galleryCards").content;




  //наполняем содержимым
  const imgPopup = card.querySelector(".gallery__img");
  const place = card.querySelector(".gallery__place");
  place.textContent = dataCard.name;
  imgPopup.src = dataCard.link;
  imgPopup.alt = dataCard.name;

/*
  //удаление карточки- функция
  const deleteCard = (evt) => {
    evt.target.closest(".gallery__card").remove();
  };
  //удадение карточки - слушатель событий
  const buttonDeleteCard = card.querySelector(".gallery__delete-card");
  buttonDeleteCard.addEventListener("click", deleteCard);
*/
  //функция лайка
  const buttonToggleLike = card.querySelector(".gallery__button-like");

  buttonToggleLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("gallery__button-like_active");
  });
/*
  //открытие попапа - большое фото
  imgPopup.addEventListener("click", function () {
    (popupPhotoImg.src = dataCard.link),
      (popupPhotoImg.alt = dataCard.name),
      (popupPhotoFiqcaption.textContent = dataCard.name);

    openPopup(popupPhoto);
  });

  return card;
};



*/






// функция, которая будет рендерить карточку на странице
//const renderCard = (dataCard) => {
 // gallery.prepend(createCard(dataCard));
//};


//const gallery = document.querySelector(".gallery__cards");







//добавление новой карточки через попап
// сохранение изменений в форме профиля

function handleCardSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.

  evt.submitter.disabled = true;
  evt.submitter.classList.add('popup__button-save_disabled');

  //наполняем содержимым из инпутов
  renderCard({ name: inputPlace.value, link: inputLink.value });

  //inputPlace.value = '';
  //inputLink.value = '';
  evt.target.reset();

  closePopup(popupCards);
}







//функция, которая переберает массив и сохдает на основе его карточки
initialCards.forEach(renderCard);

//initialCards.forEach((dataCard) => {
// renderCard(dataCard);
//});


