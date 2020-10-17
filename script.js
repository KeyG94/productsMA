import { getItems } from "./components/fetch.js";

const root = document.getElementById('root');
root.innerHTML = `<div class="loader"></div>`;

getItems();