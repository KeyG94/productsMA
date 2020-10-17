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

function createList(list) {
    
    list.forEach((id) => {
        const price = id.price;
        const name = id.name;
        const iD = id.id
        
        output += `<li>
                        <span class="list-name">${name} </span>
                        <span class="list-price">${price} $</span>
                        <i class="far fa-star" data-id="${iD}" data-name="${name}"></i>
                   </li>`;
        root.innerHTML = output;
    });
    const wishlistButtons = document.querySelectorAll("li i");
    callButtonEvent(wishlistButtons);

	searchPrice.addEventListener('keyup', function() {
        if (!searchPrice.value) {
            root.innerHTML = output;
            console.log(wishlistButtons);
            callButtonEvent(wishlistButtons);
		} else if (searchPrice.value < price) {
            root.innerHTML = `<h3>There are no products below ${searchPrice.value}$</h3>`;
        }
		newList(list);
	});
    
}

function newList(list) {
    let output = '';
    const wishlistButtons = document.querySelectorAll("li i");
    console.log(wishlistButtons)
	list.filter((item) => parseFloat(item.price) < parseFloat(searchPrice.value)).forEach((item) => {
        const name = item.name;
		const price = item.price;
        
		output += `<li><span class="list-name">${name} </span><span class="list-price">${price}</span><i class="far fa-star"></i></li>`;
        console.log(wishlistButtons)
		root.innerHTML = output;
	});
}