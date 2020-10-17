const apiKey = 'https://t9jt3myad3.execute-api.eu-west-2.amazonaws.com/api/products';
const searchPrice = document.getElementById('price');

const root = document.getElementById('root');
let output = '';

root.innerHTML = `<div class="loader"></div>`;

async function getItems() {
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

getItems();

function createList(list) {
	list.forEach((id) => {
		const price = id.price;
		const name = id.name;

		output += `<li><span class="list-name">${name} </span><span class="list-price">${price} $</span><i class="fas fa-star"></i></li>`;
		root.innerHTML = output;
	});
	searchPrice.addEventListener('keyup', function() {
		if (!searchPrice.value) {
			root.innerHTML = output;
		} else if (searchPrice.value < price) {
			root.innerHTML = `<h3>There are no products below ${searchPrice.value}$</h3>`;
		}
		newList(list);
	});
}

function newList(list) {
	let output = '';

	list.filter((item) => parseFloat(item.price) < parseFloat(searchPrice.value)).forEach((item) => {
		const name = item.name;
		const price = item.price;

		output += `<li><span class="list-name">${name} </span><span class="list-price">${price}</span><i class="fas fa-star"></i></li>`;
		root.innerHTML = output;
	});
}
