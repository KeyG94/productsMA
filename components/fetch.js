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
        console.log(root)
        

        if (!maxPrice){
            output = '';
            console.log(1)
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

        } else if (maxPrice > 0){
            output = '';
            console.log(2)
            newList.filter(product => {
                const iD = product.id;
                const name = product.name;
                const price = product.price;

                while (maxPrice >= price){
                    output += `<li>
                                    <span class="list-name">${name} </span>
                                    <span class="list-price">${price} $</span>
                                    <i class="far fa-star" data-id="${iD}" data-name="${name}"></i>
                                </li>`;
                root.innerHTML = output;
                console.log(product.id)
                }
                
                if (maxPrice < price){
                    output = '<h3>No results...</h3>';
                    root.innerHTML = output;
                }

            })
        };
            // if (price < maxPrice){
            //     output += `<li>
            //                     <span class="list-name">${name} </span>
            //                     <span class="list-price">${price} $</span>
            //                     <i class="far fa-star" data-id="${iD}" data-name="${name}"></i>
            //                 </li>`;
            //     item = output;
            // }
        
    })

};

// function createList(list) {
//     const maxPrice = parseFloat(searchPrice.value);
//     let output = '';
    
// 	list.filter((item) => parseFloat(item.price) < parseFloat(searchPrice.value)).forEach((item) => {
//         const wishlistButtons = document.querySelectorAll("li i");
//         console.log(wishlistButtons)
//         callButtonEvent(wishlistButtons);
//         const name = item.name;
//         const price = item.price;
//         const iD = item.id;
        
// 		output += `<li>
//                         <span class="list-name">${name} </span>
//                         <span class="list-price">${price} $</span>
//                         <i class="far fa-star" data-id="${iD}" data-name="${name}"></i>
//                     </li>`;
//         root.innerHTML = output;

//         searchPrice.addEventListener('keyup', function() {
//             if (price <= maxPrice) {
//                 output += `<li>
//                                 <span class="list-name">${name} </span>
//                                 <span class="list-price">${price} $</span>
//                                 <i class="far fa-star" data-id="${iD}" data-name="${name}"></i>
//                             </li>`;
//                 console.log('maxprice higher')
//             } else {
//                 output = `<h3>No Result..</h3>`;
//                 root.innerHTML = output;
//                 console.log('failed');
//             }
        
    
//     // list.forEach((id) => {
//     //     const price = parseFloat(id.price);
//     //     const name = id.name;
//     //     const iD = id.id
        
//     //     console.log(price)
//     //     console.log(maxPrice)
//     //     if (!maxPrice || isNaN(maxPrice)) {
//     //         output +=`  <li>
//     //                         <span class="list-name">${name} </span>
//     //                         <span class="list-price">${price} $</span>
//     //                         <i class="far fa-star" data-id="${iD}" data-name="${name}"></i>
//     //                     </li>`;


//     //         root.innerHTML = output;
//     //         console.log('output all')
//     //     } else if (maxPrice){

    
//     //         const wishlistButtons = document.querySelectorAll("li i");
//     //         callButtonEvent(wishlistButtons);
        
//     //             //is this needed?
//     //             // newList(list);
//     //         });

//     //     }
            
//     // });
    
//     })}
// )};



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
	})};
