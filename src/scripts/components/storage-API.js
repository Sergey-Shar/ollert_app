

function setDataLocalStorage(data) {
  localStorage.setItem("todos", JSON.stringify(data));
}

function getDataLocalStorage() {
  const data = JSON.parse(localStorage.getItem("todos"));
  return  data ?? []
}

export{setDataLocalStorage,getDataLocalStorage}