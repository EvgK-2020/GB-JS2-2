
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
                      <button class="buy-btn">Купить</button>
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
        this._costProductsList()
    }

    init() {}

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
        for (let dataEl of this.products){
            cost += dataEl.price;
        }
        console.log(`Стоимость всех товаров: ${cost}`);
    }
}

const list = new ProductsList();


class CartItem{
    constructor(){
        // id - id товара
        // title - название товара
        // img - картинка товара
        // price - цена товара
        // quantity - количество товара
    }

    //changeQuantity() - метод для изменения количества товара
    //render() - метод для построения и вывода товарной позиции
}


class Cart {
    constructor() {
        // data - массив товаров в корзине
        // container - куда выводить корзину
    }

    // fetchData() - метод для получения списка товаров для корзины
    // costOfCartItems () - метод для подсчета стоимости товаров в корзине
    // render() - метод для построения и вывода корзины
    // delItem() - метод для удаления позиции из корзины
}