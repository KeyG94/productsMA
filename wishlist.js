import { retrieveList } from './components/functions/handleClick.js';
import {createItem } from './components/fetch.js';

const documentList = document.getElementById('wishlist');

const retrievedList = retrieveList();

let output = '';
const items = retrieveList()

if (items.length > 0){
    items.forEach((item) => {
        output += createItem(item);
    });    
} else {
    output = "<h3>Ops, there's nothing on your wishlist yet.</h3>";
}
documentList.innerHTML = output;

console.log(retrievedList);
