const products = [
    { title: "גבינה", images: "images/cheese.webp", price: 10.9 },
    { title: "שמן", images: "images/oil.webp", price: 8.9 },
    { title: "עוגיות", images: "images/cookies.webp", price: 10.9 },
    { title: "טונה שימורים", images: "images/fish.webp", price: 13.5 },
    { title: "שימורים תירס", images: "images/coren.webp", price: 7.9 },
    { title: "קפה", images: "images/coffe.webp", price: 15.9 },
    { title: "במבה", images: "images/bamba.webp", price: 3.9 },
    { title: "ביסלי", images: "images/bisli.webp", price: 4.9 },
    { title: "דגני בוקר פיטנס", images: "images/fitnes.webp", price: 23.9 },
    { title: "עוגיות עבאדי", images: "images/abadi.webp", price: 18.9 },
]
const cart = {};

function ProductSelection(products) {
    const containerproduct = document.querySelector(".container-product");
    const cartList = document.querySelector(".cart-list");
    const totalAmount = document.querySelector(".total-amount");
    const checkoutButton = document.querySelector("#checkout-button");

    products.forEach((product) => {
        const { title, images, price } = product;
        const productCard = document.createElement('div');
        productCard.className = "product-Card";
        productCard.innerHTML = `
         <h2>${title}</h2>
        <img src="${images}"alt="${title}">
            <p class="price">${price} ש"ח</p>
            <div class="counting">
                <button id="btnadd">+</button>
               <input id="counter" type="number" value="0" min="0"/>
                <button id="btnremove">-</button>
            </div>`

        containerproduct.appendChild(productCard);
        const btnAdd = productCard.querySelector("#btnadd");
        const btnRemove = productCard.querySelector("#btnremove");
        const counterInput = productCard.querySelector("#counter");
        btnAdd.addEventListener("click", () => {
            counterInput.value = parseInt(counterInput.value) + 1;
            updateCart(title, price, parseInt(counterInput.value), images, cartList, totalAmount);
        });
        btnRemove.addEventListener("click", () => {
            if (parseInt(counterInput.value) > 0) {
                counterInput.value = parseInt(counterInput.value) - 1;
                updateCart(title, price, parseInt(counterInput.value), images, cartList, totalAmount);
            }
        });
    });
    checkoutButton.addEventListener("click", () => {

        let popup = document.getElementById("popup");
        popup.style.display = "block";


        const sumEl = document.querySelector("#sum");
        sumEl.textContent = `סה"כ לתשלום: ${calculateTotal()} 
       ש"ח תודה על הרכישה!\n`;
        const btnClose = document.querySelector("#btnClose");
        btnClose.addEventListener('click', () =>
            popup.style.display = "none")
    });

}


function updateCart
    (title, price, quantity, images, cartList, totalAmount) {
    if (quantity > 0) {
        cart[title] = { price, quantity, images };
    } else {
        delete cart[title];
    }

    renderCart(cartList, totalAmount);
}

function renderCart(cartList, totalAmount) {
    cartList.innerHTML = "";
    Object.keys(cart).forEach((title) => {
        const item = document.createElement("li");

        const imgEl = document.createElement("img");
        const spanEl = document.createElement("span");
        imgEl.src = cart[title].images;
        spanEl.textContent = ` ${title} - ${cart[title].quantity} יח' - ${(
            cart[title].price * cart[title].quantity
        ).toFixed(2)} ש"ח`;
        item.appendChild(spanEl);
        item.style.justifyContent = "center";
        item.style.alignItems = "center";
        item.appendChild(imgEl);
        cartList.appendChild(item);
    });
    totalAmount.textContent = `סה"כ : ${calculateTotal()} ש"ח`;
}

function calculateTotal() {
    return Object.values(cart).reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}


ProductSelection(products);

