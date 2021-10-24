


import { renderCards, asynchronous, popupBtnOk, renderCounter } from "./../index.js";
import { setDataLocalStorage, getDataLocalStorage } from "./storage-API.js";
import { PopupSmall, Popup } from "./Popup.js";

export class Card {

    constructor({ id, title, description, user, time }, [btn], column , ) {
        
        this.id = id;
        this.title = title;
        this.description = description;
        this.user = user;
        this.time = time;
        this.btn = btn;
        this.column = column;
    
    }


    createCard() {
        return `<div class="card" draggable="true" id="${this.id}">
        <h3 class="card__title">${this.title}</h3>
        <input disabled type="textarea" placeholder="Todo" class="card__description" value=${this.description}>
        <p class="card__user">${this.user}</p>
        <div class="card__time">${this.time}</div>
        </div>`;
    }

    addCard() {
        this.column.insertAdjacentHTML("afterbegin", this.createCard());
        this.createBtn()
        this.addListenerCard()
        this.dragAndDrop()

    }

    addListenerCard() {
    const card = document.querySelector(".card")
    const cardBtnDelete = document.querySelector(".card__btn-delete")
    const cardBtnEdit = document.querySelector(".card__btn-edit")
    const cardBtnBack = document.querySelector(".card__btn-back")
    const cardBtnProgress = document.querySelector(".card__btn-progress")
    const cardBtnComlete = document.querySelector(".card__btn-complete")
    document.addEventListener("click", (event) => {
            switch (event.target) {
                case cardBtnProgress:
                    const lengthProgresse = getDataLocalStorage().filter(item => item.classCard === "progress")
                    if (lengthProgresse.length >= 5) {
                        const popup = new PopupSmall({}, "it is necessary to finish the things started", [popupBtnOk])
                        popup.popupOpen()
                        event.stopPropagation()
                        break;
                    } else {
                        const addProgressClass = getDataLocalStorage()
                        addProgressClass.forEach(item => (item.id == this.id) && (item.classCard = "progress"))
                        setDataLocalStorage(addProgressClass)
                        renderCards(addProgressClass)
                        event.stopPropagation()
                        break;
                    }
                case cardBtnDelete:
                    card.remove();
                    const deleteData = getDataLocalStorage().filter(item => item.id != card.id)
                    setDataLocalStorage(deleteData)
                    renderCounter(".column-todo__title", "Todo", "todo")
                    renderCounter(".column-progress__title", "In Progress", "progress")
                    renderCounter(".column-done__title", "Done", "done")
                    event.stopPropagation()
                    break;
                case cardBtnEdit:
                    getDataLocalStorage().forEach(item => {
                        if (item.id == this.id) {
                            const popup = new Popup(item,"save", "cansel")
                            popup.popupOpen()
                        }
                    })
                    break;
                case cardBtnBack:
                    const addTodoClass = getDataLocalStorage()
                    addTodoClass.forEach(item => (item.id == this.id) && (item.classCard = "todo"))
                    setDataLocalStorage(addTodoClass)
                    renderCards(addTodoClass)
                    event.stopPropagation()
                    break;
                case cardBtnComlete:
                    const addDoneClass = getDataLocalStorage()
                    addDoneClass.forEach(item => (item.id == this.id) && (item.classCard = "done"))
                    setDataLocalStorage(addDoneClass)
                    renderCards(addDoneClass)
                    event.stopPropagation()
                    break;
         
        }
        })
    
    }

    dragAndDrop() {
    const card = document.querySelector(".card")
    const cardContainerTodo = document.querySelector(".column-todo__card-container")
    const cardContainerProgress = document.querySelector(".column-progress__card-container");
    const cardContainerDone = document.querySelector(".column-done__card-container")
        card.addEventListener("dragstart", (event) => {
            const drop = document.querySelectorAll(".drop")
            drop.forEach(item => {
                item.addEventListener("dragover", (event) => {
                    event.preventDefault()
                    event.stopPropagation()
                })
                item.addEventListener("dragenter", (event) => {
                    event.target.classList.add("drag-enter")
                    event.stopPropagation()
                })
                item.addEventListener("dragleave", (event) => {
                    event.target.classList.remove("drag-enter")
                    event.stopPropagation()
                })
                item.addEventListener("drop", (event) => {
                    switch (event.target) {
                        case cardContainerTodo:
                            const addClassTodo = getDataLocalStorage()
                            addClassTodo.forEach(item => (item.id == card.id) && (item.classCard = "todo"))
                            setDataLocalStorage(addClassTodo)
                            renderCards(addClassTodo)
                            event.stopPropagation()
                            break;
                        case cardContainerProgress:
                            const addProgressClass = getDataLocalStorage()
                            addProgressClass.forEach(item => item.id == card.id && (item.classCard = "progress"))
                            setDataLocalStorage(addProgressClass)
                            renderCards(addProgressClass)
                            event.stopPropagation()
                            break;
                        case cardContainerDone:
                            const addClasseDone = getDataLocalStorage()
                            addClasseDone.forEach(item => (item.id == card.id) && (item.classCard = "done"))
                            setDataLocalStorage(addClasseDone)
                            renderCards(addClasseDone)
                            event.stopPropagation()
                            break;
                    }
                })
            })
            asynchronous(0).then(() => event.target.style.display = "none")
        })
        card.addEventListener("dragend", (event) => {
            event.target.style.display = "block"
            event.stopPropagation()
        })
    }




    createBtn() {
        const card = document.querySelectorAll(".card")
        this.btn.forEach(item => {
            const btn = document.createElement("button")
            btn.id = this.id
            btn.className = item.class
            btn.textContent = item.text
            card.forEach(item => item.id == btn.id && item.append(btn))
        })
    }
}




