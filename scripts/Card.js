import { initialCards } from "./constants.js";
import { openPopupPhoto } from "./index.js";

// создаём класс, который хранит разметку карточки и наполняет его содержимым
export class Card {
  //в конструкторе - динамические данные, для каждого экземпляра свои
  constructor(name, link, openPopupPhoto) {
    //link(картинка) и name(текст)
    //- это приватные поля, они нужны только внутри класса
    this._name = name;
    this._link = link;
    this._openPopupPhoto = openPopupPhoto;
  }

  //Задача метода _getTemplate — вернуть разметку карточки через return
  _getTemplate() {
    //забираем разметку из html и клонируем элемент
    const cardElement = document
      .querySelector("#galleryCards")
      .content.querySelector(".gallery__card")
      .cloneNode(true);

    //вернём ДОМ-элемент карточки
    return cardElement;
  }

  // метод generateCard подготовит карточку к публикации
  //он добавит данные в разметку
  //метод-публичный, чтобы возвращать готовые карточки внешним функциям
  generateCard() {
    // Запишем разметку в приватное поле _element.
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    //добавим данные
    this._element.querySelector(".gallery__img").src = this._link;
    this._element.querySelector(".gallery__place").textContent = this._name;
    this._element.querySelector(".gallery__img").alt = this._name;

    this._setEventListeners();

    //вернём элемент наружу
    return this._element;
  }

  //лайк
  _setEventListeners() {
    this._element
      .querySelector(".gallery__button-like")
      .addEventListener("click", () => {
        this._toggleButtonLike();
      });
    //удаление
    this._element
      .querySelector(".gallery__delete-card")
      .addEventListener("click", () => {
        this._deleteCardButton();
      });

    //открытие попапа фото
    this._element
      .querySelector(".gallery__img")
      .addEventListener("click", () => {
        this._openPopupPhoto(this._name, this._link);
      });
  }

  _toggleButtonLike() {
    this._element
      .querySelector(".gallery__button-like")
      .classList.toggle("gallery__button-like_active");
  }

  _deleteCardButton() {
    this._element
      .querySelector(".gallery__delete-card")
      .closest(".gallery__card")
      .remove();
  }
}
