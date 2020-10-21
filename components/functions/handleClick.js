import { listKey } from '../keys.js';

export default function callButtonEvent(click) {
	click.forEach((item) => {
		item.addEventListener('click', handleClick);
	});
}

export const isInStorage = (id) => !!retrieveList().find((item) => item.id == id);

function handleClick() {
	this.classList.toggle('fa');
	this.classList.toggle('far');

    const { id, name, price } = this.dataset;
    console.log(price)
	const currentList = retrieveList();

	if (!isInStorage(id)) {
		const product = { id, name, price };
		currentList.push(product);
		saveList(currentList);
	} else {
		const newList = currentList.filter((wishlist) => wishlist.id !== id);
		saveList(newList);
	}
}

export function retrieveList() {
	const wishlist = localStorage.getItem(listKey);
	return wishlist ? JSON.parse(wishlist) : [];
}

function saveList(wishlist) {
	localStorage.setItem(listKey, JSON.stringify(wishlist));
}
