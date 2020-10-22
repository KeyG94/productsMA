import { apiKey } from './keys.js';
import callButtonEvent, { isInStorage } from './functions/handleClick.js';

const searchPrice = document.getElementById('price');
let output = '';

export async function getItems() {
	try {
		await fetch(apiKey).then((res) => res.json()).then((data) => {
			const returnedList = data.data;
			createList(returnedList);
		});
	} catch (error) {
		root.innerHTML = error;
		root.style.color = 'red';
	}
}

export const createItem = (item) =>
	`<li>
    <span class="list-name">${item.name} </span>
    <span class="list-price">${item.price} $</span>
    <i class="${isInStorage(item.id)
		? 'fa'
		: 'far'} fa-star" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}"></i>
</li>`;

function createList(list) {
	const keyUpFunction = () => {
		const maxPrice = parseFloat(searchPrice.value);
		const newList = list;

		//if input has no value
		if (!maxPrice && maxPrice !== 0) {
			output = '';
			list.forEach((item) => {
				output += createItem(item);
				root.innerHTML = output;
			});
			//if input value is 0 or greater
		} else if (maxPrice >= 0) {
			output = '';
			const filteredList = newList.filter((product) => product.price <= maxPrice);

			if (filteredList.length === 0) {
				output = '<h3>No results</h3>';
			} else {
				filteredList.forEach((item) => {
					output += createItem(item);
				});
			}
			root.innerHTML = output;
		}
		// Add clickEvent to all items
		addEvent();
	};

	searchPrice.addEventListener('keyup', keyUpFunction);

	list.forEach((item) => {
		output += createItem(item);
		root.innerHTML = output;
	});
	// Add click event to all items
	addEvent();
	console.log('hi from outside of the event listener');
}

function addEvent() {
	const wishlistbutton = document.querySelectorAll('li i');
	callButtonEvent(wishlistbutton);
}
