export class Card {
  constructor(name, link, openPopupPhoto, selectorTemplate) {
    this._name = name;
    this._link = link;
    this._openPopupPhoto = openPopupPhoto;
    this._selectorTemplate = selectorTemplate;
  }
  //Задача метода _getTemplate — вернуть разметку карточки через return
  _getTemplate() {
    //забираем разметку из html и клонируем элемент

    const cardElement = document
      .querySelector(this._selectorTemplate)
      .content
      .querySelector('.gallery__card')
      .cloneNode(true);
    //вернём ДОМ-элемент карточки
    return cardElement;
  }
  // метод generateCard подготовит карточку к публикации -он добавит данные в разметку
  generateCard() {
    // Запишем разметку в приватное поле _element.
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.gallery__img');
    this._placeText = this._element.querySelector('.gallery__place');
    this._buttonLike = this._element.querySelector('.gallery__button-like');

    //добавим данные
    this._cardImage.src = this._link;
    this._placeText.textContent = this._name;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    //вернём элемент наружу
    return this._element;
  }

  //лайк
  _setEventListeners() {
    this._buttonLike
      .addEventListener('click', () => {
        this._toggleButtonLike();
      });
    //удаление
    this._element
      .querySelector('.gallery__delete-card')
      .addEventListener('click', () => {
        this._deleteCardButton();
      });

    //открытие попапа фото
    this._element
      .querySelector('.gallery__img')
      .addEventListener('click', () => {
        this._openPopupPhoto(this._name, this._link);
      });
  }

  _toggleButtonLike() {
    this._buttonLike.classList.toggle('gallery__button-like_active');
  }

  _deleteCardButton() {
    this._element.remove();
    this._element = null;
  }
}
