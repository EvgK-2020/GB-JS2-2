import {Cartitem} from "./Cartitem.js";

export const Cart = {
    components: {
        Cartitem
    },
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            imgCart: 'https://placehold.it/50x150',
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            this.$root.getJson(`${this.$root.API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++
                        } else {
                            let prod = Object.assign({ quantity: 1 }, product);
                            this.cartItems.push(prod);
                        }
                    }
                });
        },
        

        remove(product) {
            this.$root.getJson(`${this.$root.API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        if (product.quantity > 1) {
                            product.quantity--
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    }
                });
        }        
    },
    mounted() {
        this.$root.getJson(`${this.$root.API + this.cartUrl}`)
            .then(data => {
                for (let product of data.contents) {
                    this.cartItems.push(product);
                }
            });
    },
    template: `            <div class="cart">
    
<button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
<div class="cart-block" v-show="showCart">
    <p v-if="!cartItems.length">Cart is empty</p> 
    <Cartitem class="cart-item" 
        v-for="item of cartItems" 
        :key="item.id_product"
        :img="imgCart"
        :product="item"
    ></Cartitem> 
</div>
</div>`
};