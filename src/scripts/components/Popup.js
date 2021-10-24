


import { fillLocalStorage, renderCards, asynchronous } from "./../index.js";
import { getUsers } from "./fetch-API.js";
import { setDataLocalStorage, getDataLocalStorage } from "./storage-API.js";

class Popup {

    constructor({ id = "", title = "", description = "", user = "" },confirmBtn,cancelBtn) {
        this.id = id
        this.title = title
        this.description = description
        this.user = user
        this.confirmBtn = confirmBtn
        this.cancelBtn = cancelBtn
    }

    createPopup() {
        return `<div class="popup" id="${this.id}">
    <div class="popup__body">
    <div class="popup__content">
    <input type="text" placeholder="Title" class="popup__title" value=${this.title}>
    <input type="textarea" placeholder="Todo" class="popup__description" value=${this.description}>
    <div class="popup__footer">
    <select name="user" class="popup__user">
    <option>${this.user}</option>
    </select>
    <button type="button" class="popup__btn-add">${this.confirmBtn}</button>
     <button type="button" class="popup__btn-close">${this.cancelBtn}</button>
    </div>
    </div>
    </div>
    </div>`
    }

    addPopup() {
        const wrapper = document.querySelector(".wrapper")
        wrapper.insertAdjacentHTML("afterEnd", this.createPopup())
    }

    addListenerPopup() {
        this.addPopup()
        const popup = document.querySelector(".popup")
        const popupBtnClose = document.querySelector(".popup__btn-close")
        const popupBody = document.querySelector(".popup__body")
        const popupBtnAdd = document.querySelector(".popup__btn-add")
        popup.addEventListener("click", (event) => {
            switch (event.target) {
                case popupBody:
                    this.popupClose()
                    break;
                case popupBtnAdd:
                    const data = getDataLocalStorage().filter(item => item.id != this.id)
                    setDataLocalStorage(data)
                    fillLocalStorage()
                    const storagetData = getDataLocalStorage()
                    renderCards(storagetData);
                    this.popupClose()
                    break;
                case popupBtnClose:
                    this.popupClose()
                    break;
            }
        })
        document.addEventListener("keydown",(event => this.deleteEnter(event)))   
    }

    popupOpen() {
        this.addListenerPopup()
        getUsers()
        const popup = document.querySelector(".popup")
        const popupContent = document.querySelector(".popup__content")
        asynchronous(0).then(() => popup.classList.add("open"))
        asynchronous(0).then(() => popupContent.classList.add("open"))
    }

    popupClose() {
        const popup = document.querySelector(".popup")
        const popupContent = document.querySelector(".popup__content")
        popup.classList.remove("open")
        popupContent.classList.remove("open")
        this.destroy()
    }

    destroy() {
        const popup = document.querySelector(".popup")
        asynchronous(1000).then(() => popup.remove(popup))
        asynchronous(1000).then(() => popup.removeEventListener("click", () => this.addListenerPopup()))
    }

    deleteEnter(event){
        if(event.code === "NumpadEnter") {
        event.preventDefault()    
     } else if(event.code === "Enter"){
        event.preventDefault()  
     } else if(event.code === "Escape"){
         this.popupClose()
     }
}
}

class PopupSmall extends Popup {

    constructor({ id, title, description, user }, warning, [btn]) {

        super({ id, title, description, user })
        this.warning = warning;
        this.btn = btn
    }

    createPopup() {
        return `<div class="popup-warning">
        <div class="popup-warning__body">
        <div class="popup-warning__content">
        <h3 class="popup-warning__text">${this.warning}</h3>
        <button class="popup-warning__btn-close">&times;</button>
        <div class="popup__footer"></div>
        </div>
        </div>`

    }


    addListenerPopup() {
        this.addPopup()
        const btnClose = document.querySelector(".popup-warning__btn-close")
        btnClose.addEventListener("click", () => this.popupClose())
        document.addEventListener("keydown",(event => this.deleteEnter(event)))
    }

    popupOpen() {
        this.addListenerPopup()
        this.createBtn()
        const popup = document.querySelector(".popup-warning")
        const popupContent = document.querySelector(".popup-warning__content")
        asynchronous(100).then(() => popup.classList.add("open"))
        asynchronous(100).then(() => popupContent.classList.add("open"))
    }

    popupClose() {
        const popup = document.querySelector(".popup-warning")
        const popupContent = document.querySelector(".popup-warning__content")
        popup.classList.remove("open")
        popupContent.classList.remove("open")
        this.destroy()
    }

    destroy() {
        const popup = document.querySelector(".popup-warning")
        const btnClose = document.querySelector(".popup-warning__btn-close")
        asynchronous(1000).then(() => popup.remove(popup))
        asynchronous(1000).then(() => btnClose.removeEventListener("click", () => this.popupClose()))
    }

    createBtn() {
        const popupFooter = document.querySelector(".popup__footer")
        this.btn.forEach(item => {
            const btn = document.createElement("button")
            btn.className = item.class
            btn.textContent = item.text
            btn.style.padding = item.padding
            btn.style.background = item.background
            btn.onclick = item.hendler
            popupFooter.append(btn)
        })
    }
}



export { Popup, PopupSmall }

