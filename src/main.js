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

import { projectAuth } from './firebase/config'

let app

projectAuth.onAuthStateChanged(() => {
    if(!app){
        app = createApp(App)
        app.component('ConfirmPopup', ConfirmPopup)
        app.use(router)
        app.use(ToastService)
        app.use(PrimeVue, {ripple: true})
        app.component('Toast', Toast)
        app.component('Button', Button)
        app.use(ConfirmationService);
        app.mount('#app')
    }
})