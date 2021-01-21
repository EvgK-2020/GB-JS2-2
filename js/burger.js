
class Ingredients {
    constructor(item) {
        let { id, title, price, calories } = item;
        this.id = id;
        this.title = title;
        this.price = price;
        this.calories = calories;
    }

    render() {
        return `<option value="${this.id}">${this.title} - Цена: ${this.price}, Калорийность: ${this.calories}</option>`;
    }

}


class Basis extends Ingredients {
}


class Filling extends Ingredients {

}


class Topping extends Ingredients {
    render() {
        return `<input type="checkbox" name="topping_${this.id}"  class="topping_checkbox" value="${this.id}">${this.title} - Цена: ${this.price}, Калорийность: ${this.calories}<br>`;
    }
}


class Showcase {
    constructor(containerBasis = '#basis', containerFilling = '#filling', containerTopping = '.topping') {
        this.data = [];

        this.basis = [];
        this._fetchDataBasis();
        this.containerBasis = document.querySelector(containerBasis);
        this._renderBasis();

        this.filling = [];
        this._fetchDataFilling();
        this.containerFilling = document.querySelector(containerFilling);
        this._renderFilling();
       
        this.topping = [];
        this._fetchDataTopping();
        this.containerTopping = document.querySelector(containerTopping);
        this._renderTopping();

    }


    _fetchDataBasis() {
        this.data = [
            { id: 1, title: 'Маленький', price: 50, calories: 20 },
            { id: 2, title: 'Большой', price: 100, calories: 40 }
        ];
    }

    _renderBasis() {
        for (let dataEl of this.data) {
            const item = new Basis(dataEl);
            this.basis.push(item);
            this.containerBasis.insertAdjacentHTML('beforeend', item.render());
        }
    }

    _fetchDataFilling() {
        this.data = [
            { id: 1, title: 'С сыром', price: 10, calories: 20 },
            { id: 2, title: 'С салатом', price: 20, calories: 5 },
            { id: 3, title: 'С картофелем', price: 15, calories: 10 }
        ];
    }

    _renderFilling() {
        for (let dataEl of this.data) {
            const item = new Filling(dataEl);
            this.filling.push(item);
            this.containerFilling.insertAdjacentHTML('beforeend', item.render());
        }
    }

     _fetchDataTopping() {
        this.data = [
            { id: 1, title: 'посыпать приправой', price: 15, calories: 0 },
            { id: 2, title: 'полить майонезом', price: 20, calories: 5 }
        ];
    }

    _renderTopping() {
        for (let dataEl of this.data) {
            const item = new Topping(dataEl);
            this.topping.push(item);
            this.containerTopping.insertAdjacentHTML('beforeend', item.render());
        }
    }
}


class Burger {
    constructor() {
        this.basis = [];
        this.filling = [];
        this.toppingsPrice = 0;
        this.toppingsCalories = 0;
        this._Ingredients();
        this._showInfo();
    }

    _getToppings() {
        let selectedCheckBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        let toppingsCB = Array.from(selectedCheckBoxes).map(cb => cb.value);
        toppingsCB.forEach(item => {
            let toppings = sc.topping.find(itemID => itemID.id == item);
            this.toppingsPrice += toppings.price;
            this.toppingsCalories += toppings.calories;
        })
    }

    _Ingredients() {
        this.basis = sc.basis.find(item => item.id == basis.value);
        this.filling = sc.filling.find(item => item.id == filling.value);
        this._getToppings();
    };

    _showInfo() {
        alert(`Стоимость бургера: ${this.basis.price + this.filling.price + this.toppingsPrice}, калорийность: ${this.basis.calories + this.filling.calories + this.toppingsCalories}`);
    }

}

const sc = new Showcase();

function burger() {
    const dg = new Burger();
}