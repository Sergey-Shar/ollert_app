"use strict";

const data = getData();
render(data);

// часы

const clock = document.querySelector(".header__clock");
function renderTime() {
  let time = new Date().toLocaleTimeString();
  clock.innerText = time;
}
setInterval(renderTime, 1000);

// plugins

function CreateCard({ id, title, description, user, time }) {
  this.template = function () {
    return `<div class="card" draggable="true" id="${id}">
       <h3 class="card__title">${title}</h3>
       <p class="card__description">${description}</p>
       <p class="card__user">${user}</p>
       <button class="card__btn-edit">EDIT</button>
       <button class="card__btn-delete">DELETE</button>
       <button class="card__btn-progress">></button>
       <div class="card__time">${time}</div>
       </div>`;
  };

  const cardd = document.querySelector(".card");
  const cardContainerProgress = document.querySelector(
    ".column-progress__card-container"
  );
  const cardBtnDelete = document.querySelector(".card__btn-delete");
  const cardBtnProgress = document.querySelector(".card__btn-progress");
  const cardBtnEdit = document.querySelector(".card__btn-edit");

  this.printCard = function (item) {
    const card = this.template();
    item.insertAdjacentHTML("afterbegin", card);
  };

  this.listener = function () {
    const cardd = document.querySelector(".card");
    cardd.addEventListener("click", this.addListener);
  };

  this.addListener = function (event) {
    if (event.target === cardBtnProgress) {
      cardContainerProgress.append(cardd);
      let data = getData();
      data.map((item) => {item.classeCard = "progress"
      setData(data);
    });
      //setData(data);
    } else if (event.target === cardBtnDelete) {
      cardd.remove();
      const data = getData().filter((item) => item.id != cardd.id);
      setData(data);
    }
  };
}

// modal

const wrapper = document.querySelector(".wrapper");

function createPopup() {
  const popupp = document.createElement("div");
  popupp.classList.add("popup");
  popupp.insertAdjacentHTML(
    "afterbegin",
    `<div class="popup__body">
        <div class="popup__content">
        <input type="text" placeholder="Title" class="popup__title">
        <input type="textarea" placeholder="Text" class="popup__description">
        <div class="popup__footer">
        <select name="user" class="popup__user"></select>
        <button class="popup__btn-add">add</button>
         <button class="popup__btn-close">close</button>
        </div>
    </div>
 </div>`
  );
  wrapper.append(popupp);
  return popupp;
}

function open() {
  return (
    modal.classList.add("_open"),
    popupContent.classList.add("_open-cont"),
    getUsers()
  );
}

function close() {
  return modal.classList.remove("_open");
}

const modal = createPopup();
const popupContent = document.querySelector(".popup__content");
const popupBtnClose = document.querySelector(".popup__btn-close");
const popupBody = document.querySelector(".popup__body");
const select = document.querySelector(".popup__user");
const popupBtnAdd = document.querySelector(".popup__btn-add");

// fetch API

function getUsers() {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((response) => response.forEach(printUsers));
}

function printUsers({ name, username }) {
  const listItem = document.createElement("option");
  listItem.textContent = `${name}, ${username}`;
  select.append(listItem);
}

// locale

function setData(data) {
  localStorage.setItem("todos", JSON.stringify(data));
}
function getData() {
  const data = JSON.parse(localStorage.getItem("todos"));
  if (data) {
    return data;
  }
  return [];
}

function TodoStorage(title, description, user) {
  this.id = Math.random();
  this.classeCard = "todo";
  this.title = title;
  this.description = description;
  this.user = user;
  this.time = new Date().toLocaleTimeString();
}

function createLocale() {
  let popupTitle = document.querySelector(".popup__title");
  let popupDescription = document.querySelector(".popup__description");
  const data = getData();
  const todoStorage = new TodoStorage(
    popupTitle.value,
    popupDescription.value,
    select.value
  );
  data.push(todoStorage);
  setData(data);
  popupTitle.value = "";
  popupDescription.value = "";
  //render(data);
}

// Drag & drop

function dragStart() {
  console.log("ffff");
}

function dragEnd() {
  console.log("qqq");
}

//-------------------------------------------------------

const btnAdd = document.querySelector(".column-todo__btn-todo--add");

wrapper.addEventListener("click", (e) => {
  if (e.target === btnAdd) {
    open();
  } else if (e.target === popupBtnClose) {
    close();
  } else if (e.target === popupBody) {
    close();
  } else if (e.target === popupBtnAdd) {
    createLocale();
    render(getData())
    close();
  }
});

// render

function render(data) {
  const cardContainerTodo = document.querySelector(
    ".column-todo__card-container"
  );
  const cardContainerProgress = document.querySelector(
    ".column-progress__card-container"
  );
  // const cardContainerDone = document.querySelector(".column-progress__card-container")
  data.map((item) => {
    if (item.classeCard === "todo") {
      new CreateCard(item).printCard(cardContainerTodo);
      new CreateCard(item).listener();
    } else if (item.classeCard === "progress") {
      new CreateCard(item).printCard(cardContainerProgress);
      new CreateCard(item).listener();
    }
  });
}

// карточка

// const cardContainer = document.querySelector(".column-todo__card-container--todo")

//   function CreateCard (title,description,user, time){
//     this.title = title,
//     this.description = description,
//     this.user = user,

//     this.time = time,

//     this.init =function(){
//       const cardItem = this.template()
//       cardContainer.insertAdjacentHTML("afterbegin", cardItem)

//     }
//      this.template = function(){
//      return `<div class="card">
//       <input type="text" class="card__title">${this.title}
//       <input type="textarea" class="card__description">
//       <p class="card__user">${this.user}</p>
//       <button class="card__btn-edit">EDIT</button>
//       <button class="card__btn-delete">DELETE</button>
//       <button class="card__btn-progress">></button>
//       <div class="card__time">${this.time}</div>
//    </div>`
//     }

// }
// let cardTime = new Date().toLocaleTimeString()

// function card (){
// new CreateCard("job", "wed-developer","Sergey",cardTime).init()
// }

// модалка

// const popup = document.querySelector(".popup")
// const popupContent = document.querySelector(".popup__content")

// const body = document.querySelector("body")

// const lockPadding = document.querySelector(".lock-padding")

// function openPopup (){
//  popup.classList.add("_open")
//   popupContent.classList.add("_open-cont")
// }

//btnAdd.addEventListener("click", open)

//-------------------------------------------------------------------

// function CreateCard({id, title,description, user, time}) {

//   const cardContainerTodo = document.querySelector(".column-todo__card-container--todo")
//   const cardContainerProgress = document.querySelector(".column-progress__card-container--progress")
//   const cardContainerDone = document.querySelector(".column-progress__card-container--done")

//   this.template = function () {
//       `<div class="card" draggable="true" id="${id}">
//        <h3 class="card__title">${title}</h3>
//        <p class="card__description">${description}</p>
//        <p class="card__user">${user}</p>
//        <button class="card__btn-edit">EDIT</button>
//        <button class="card__btn-delete">DELETE</button>
//        <button class="card__btn-progress">></button>
//        <div class="card__time">${time}</div>
//        </div>`
//   }

//   //const cardBtnDelete = document.querySelector(".card__btn-delete")
//   //const cardBtnProgress = document.querySelector(".card__btn-progress")
//   //const cardBtnEdit = document.querySelector(".card__btn-edit")

//   this.printCardTodo = function () {
//       const card = this.template()
//       cardContainerTodo.insertAdjacentHTML("afterbegin", card)
//   }

//   this.printCardProgress = function () {
//       const card = this.template()
//       cardContainerProgress.insertAdjacentHTML("afterbegin", card)
//   }

//   this.printCardDone = function () {
//       const card = this.template()
//       cardContainerDone.insertAdjacentHTML("afterbegin", card)
//   }

//   }

// function createCard ({id,title, description, user, time}){
// const cardContainerTodo = document.querySelector(".column-todo__card-container--todo")
// const cardContainerProgress = document.querySelector(".column-progress__card-container--progress")
// cardContainerTodo.insertAdjacentHTML("afterbegin",
// `<div class="card" draggable="true" id="${id}">
//       <h3 class="card__title">${title}</h3>
//       <p class="card__description">${description}</p>
//       <p class="card__user">${user}</p>
//       <button class="card__btn-edit">EDIT</button>
//       <button class="card__btn-delete">DELETE</button>
//       <button class="card__btn-progress">></button>
//       <div class="card__time">${time}</div>
//    </div>`)
//    const card = document.querySelector(".card")
//    const cardBtnDelete = document.querySelector(".card__btn-delete")
//    const cardBtnProgress = document.querySelector(".card__btn-progress")
//    const cardBtnEdit = document.querySelector(".card__btn-edit")

//    card.addEventListener("dragstart",dragStart)
//    card.addEventListener("dragend",dragEnd)
//    card.addEventListener("click", (e) => {
//     if(e.target === cardBtnDelete){
//     card.remove()
//     const data = getData().filter((todo) => todo.id != card.id);
//     setData(data);
//     } else if (e.target === cardBtnProgress){
//       cardContainerProgress.append(card)
//       const a = card.className = "aaa"
//       //createLocale(a)

//       }
//     })
//     return cardContainerTodo
//   }

// const modal = createPopup()
//  const popupContent = document.querySelector(".popup__content")
//  const popupBtnClose = document.querySelector(".popup__btn-close")
//  const popupBody = document.querySelector(".popup__body")
//  const select = document.querySelector(".popup__user")
//  const popupBtnAdd = document.querySelector(".popup__btn-add")
