

import{printUsers} from "./../index.js";

export function getUsers() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((response) => response.forEach(printUsers))
        .catch(e => console.log(`Error! ${e}`))

}

