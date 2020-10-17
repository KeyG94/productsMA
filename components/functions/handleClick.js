import {listKey} from "../keys.js";

export default function callButtonEvent(click){
    click.forEach(item =>{
        item.addEventListener("click", handleClick);
    });
};

function handleClick(){
    this.classList.toggle("fa")
    this.classList.toggle("far")

    const id = this.dataset.id;
    const name = this.dataset.name;
    const currentList = retrieveList()
    const trackStorage = currentList.find(wishlist => wishlist.id === id)
    
    if(!trackStorage){
        const product = {id, name};
        currentList.push(product)
        saveList(currentList);
    } else {
        const newList = currentList.filter(wishlist => wishlist.id !== id);
        saveList(newList);
    }
};

function retrieveList(){
    const wishlist = localStorage.getItem(listKey);

    if (!wishlist){
        return [];
    } else {
        return JSON.parse(wishlist);
    }
};

function saveList(wishlist){
    localStorage.setItem(listKey, JSON.stringify(wishlist))
}