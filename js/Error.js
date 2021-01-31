export const Error = {
    data() {
        return {
            showError: false,
        }
    },
    methods:{
        statusError() {
            this.showError = true;
            console.log("Ошибка"+msg);
        }
    },
    template: `<div class="error" v-if="showError">Ошибка подключения к БД</div>`
};