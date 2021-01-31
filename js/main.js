import {Products} from './Products.js';
import {Cart} from './Cart.js';
import {Search} from './Search.js';
import {Error} from './Error.js';

const Shop = {
    components: {
      Products,
      Cart,
      Search,
      Error
    },
    data() {
        return {
            API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
        }
    },
    methods: {
        getJson(url, msg="Список товаорв") {
            return fetch(url)
                .then(result => result.json())
               //  .catch(error => console.log(error));
                .catch(error => this.$refs.error.statusError());
        }
    },
};

Vue.createApp(Shop).mount('#app');

