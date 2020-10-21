import { apiKey } from "./keys.js";
import callButtonEvent from "./functions/handleClick.js";

const searchPrice = document.getElementById('price');
let output = '';

export async function getItems() {
    try {
        await fetch(apiKey).then((res) => res.json()).then((data) => {
            const returnedList = data.data;
            createList(returnedList);
        });
    }
    catch(error) {
        root.innerHTML = error
        root.style.color = "red";

    }
}

function createList(list){

    list.filter((item) => {
        const iD = item.id;
        const name = item.name;
        const price = parseFloat(item.price);

        output += `<li>
                        <span class="list-name">${name} </span>
                        <span class="list-price">${price} $</span>
                        <i class="far fa-star" data-id="${iD}" data-name="${name}"></i>
                    </li>`;
        root.innerHTML = output;
    });

    searchPrice.addEventListener("keyup", function(){
        const maxPrice = parseFloat(searchPrice.value);
        const newList = list;
        
        //if input has no value
        if (!maxPrice){
            output = '';

            newList.filter((product) => {
                const iD = product.id;
                const name = product.name;
                const price = product.price;
        
                output += `<li>
                                <span class="list-name">${name} </span>
                                <span class="list-price">${price} $</span>
                                <i class="far fa-star" data-id="${iD}" data-name="${name}"></i>
                            </li>`;
                root.innerHTML = output;
            });

            //if input value is 0 or greater
        } else if (maxPrice >= 0){
            output = '';
            console.log(2)

            newList.filter(product => {
                const iD = product.id;
                const name = product.name;
                const price = product.price;

                if (maxPrice >= price){
                    output += `<li>
                                    <span class="list-name">${name} </span>
                                    <span class="list-price">${price} $</span>
                                    <i class="far fa-star" data-id="${iD}" data-name="${name}"></i>
                                </li>`;
                root.innerHTML = output;
                console.log(2.1)
            }
        })};
        addEvent();
        console.log('hi from inside event listener')
    });
    console.log('hi from outside of the event listener')
    addEvent();
    
};

function addEvent(){
    const wishlistbutton = document.querySelectorAll('li i');
    callButtonEvent(wishlistbutton);
}