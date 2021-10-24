


export class LocalStorage {
  constructor(title, description, user){
  this.id = Math.random()
  this.classCard = "todo"
  this.title = title
  this.description = description
  this.user = user
  this.time = new Date().toLocaleTimeString()
  }
}