import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmPopup from 'primevue/confirmpopup';
import Button from 'primevue/button';
import vueDebounce from 'vue-debounce'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import '@/assets/common.css'
// import Vue from 'vue'
import Vuex from 'vuex'
import store from './store';

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fab);
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(far);
import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

import { projectAuth } from './firebase/config'

let app

projectAuth.onAuthStateChanged(() => {
    if(!app){
        app = createApp(App)
        app.use(Vuex)
        app.component('ConfirmPopup', ConfirmPopup)
        app.use(router)
        app.use(ToastService)
        app.use(store)
        app.use(vueDebounce)
        app.use(PrimeVue, {ripple: true})
        app.component('Toast', Toast)
        app.component('Button', Button)
        app.use(ElementPlus)
        app.use(ConfirmationService);
        app.component("font-awesome-icon", FontAwesomeIcon);
        app.mount('#app')
    }
})