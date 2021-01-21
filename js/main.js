
class Product {
    constructor(product, img = 'https://placehold.it/100x50') {
        let { title, price = 0, id } = product;
        this.title = title;
        this.img = img;
        this.price = price;
        this.id = id;
    }

    render() {
        return `<div class="product-item">
                  <img src="${this.img}" alt="${this.title}">
                  <div class="desc">
                      <h3>${this.title}</h3>
                      <p>${this.price}</p>
                      <button class="buy-btn" data-product_id="${this.id}">Купить</button>
                  </div>
              </div>`
    }

}

class ProductsList {
    constructor(container = '.products') {
        this.data = [];
        this.products = [];
        this.container = document.querySelector(container);
        this._fetchData();
        this._render();
        console.log(`Стоимость всех товаров: ${this._costProductsList()}`);
    }

    init() { }

    _fetchData() {
        this.data = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Keyboard', price: 200 },
            { id: 3, title: 'Mouse', price: 100 },
            { id: 4, title: 'Gamepad' },
        ];
    }

    _render() {
        for (let dataEl of this.data) {
            const product = new Product(dataEl);
            this.products.push(product);
            this.container.insertAdjacentHTML('beforeend', product.render())
        }
    }

    _costProductsList() {
        let cost = 0;
        for (let dataEl of this.products) {
            cost += dataEl.price;
        }
        return cost;
    }
}

class CartItem {
    constructor(product, quantity) {
        let { id, title, price = 0 } = product;
        this.id = id;
        this.title = title;
        this.price = price;
        this.quantity = quantity;
        // id - id товара
        // title - название товара
        // img - картинка товара
        // price - цена товара
        // quantity - количество товара
    }

    //changeQuantity() - метод для изменения количества товара
    render() {
        return `<div class="cart_item_product" id="cart_item_product_${this.id}">
        <div class="cart_item_product_name">${this.title}</div>
        <div class="cart_item_product_quantity_minus plus_minus" data-id="${this.id}" data-action="minus" title="убрать 1">	
        &#10134;</div>
        <div class="cart_item_product_quantity">${this.quantity}</div>
         <div class="cart_item_product_quantity_plus plus_minus data-id="${this.id}" data-action="plus" title="добавить 1">	
        &#10133;</div> 
        <div class="cart_item_product_price">${this.price}</div>
        <div class="cart_item_product_cost">${this.quantity * this.price}</div>
    </div>`;
    }

    changeQuantity(e){
        console.log(e.target);
    }


}

class Cart {
    constructor() {
        this.productInCart = [];
//        this._costOfCartItems();  // - метод для подсчета стоимости товаров в корзине
    }

 
    addToCart(e) {
        this.productInCart.push(Number(e.target.dataset.product_id));
        alert("Товар добавлен в корзину");
    }

    removeFromCart(e) {
        this.productInCart = this.productInCart.filter(item => item != e.target.dataset.id);
        console.log(this.productInCart);
        this._closeCart();
        this.render();
    }

    render() {       // - метод для построения и вывода корзины
        this._renderCart();
        this._renderCartItems();
        wrp_cart.insertAdjacentHTML('beforeend', `Итого: ${this._costOfCartItems()}`);
        this._renderRemoveButton();
    }

    _renderCart() {
        let darkLayer = document.createElement('div');
        darkLayer.id = 'shadow';
        document.body.appendChild(darkLayer);

        let modalWin = document.getElementById('modal');
        modalWin.classList.remove("close");

       
        darkLayer.onclick = function () {
            darkLayer.parentNode.removeChild(darkLayer);
            modalWin.classList.add("close");
        };
    };

    _renderCartItems() {
        let countProducts = {};
        for (let elem of this.productInCart) {
            if (countProducts[elem] === undefined) {
                countProducts[elem] = 1;
            }
            else {
                countProducts[elem]++;
            }
        }

        let allProductItem = `<div class="cart_item_product">
        <div class="cart_item_product_name">Название</div>
        <div class="cart_item_product_quantity">Количество</div>
        <div class="cart_item_product_price">Цена</div>
        <div class="cart_item_product_cost">Стоимость</div>
    </div>`;
        for (let dataEl in countProducts) {
            const productItem = new CartItem(showcase.products.find(item => item.id == dataEl), countProducts[dataEl]);
            allProductItem += productItem.render();
        }
        wrp_cart.innerHTML = allProductItem;
        
    }

    _costOfCartItems() {
        let totalCost = 0;
        for (let dataEl of this.productInCart) {
            totalCost += showcase.products.find(item => item.id == dataEl).price;
        }
        return totalCost;
    };

    _renderRemoveButton() {
        for (let dataEl of Array.from(new Set(this.productInCart))) {
            document.getElementById("cart_item_product_" + dataEl).insertAdjacentHTML('beforeend', `<div class="remove-product"  data-id="${dataEl}"title="Удалить позицию">&#128465;</div>`);
            document.querySelector(".remove-product").onclick = removeFromCart;
        }
    };

    _closeCart(dLayer="shadow",mlWin = "modal") {
        let darkLayer =document.getElementById(dLayer);
        let modalWin = document.getElementById(mlWin);
        darkLayer.parentNode.removeChild(darkLayer);
        modalWin.classList.add("close");
    };

}





const showcase = new ProductsList();


let buttons = document.querySelectorAll(".buy-btn");
for (let item of buttons) {
    item.onclick = addToCart;
}
document.querySelector(".btn-cart").onclick = showCart;


function addToCart(e) {
    cart.addToCart(e);
}

function removeFromCart(e) {
    cart.removeFromCart(e);
}

function changeQuantity(e){
    console.log("тыц");
}

function showCart() {
    cart.render();
}

const cart = new Cart();