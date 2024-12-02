import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import './assets/base.css'
import 'primevue/resources/themes/saga-blue/theme.css'  // Choisissez votre thème
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persistedState from 'pinia-plugin-persistedstate';

const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.use(ToastService);
app.component('Toast',Toast)

const pinia = createPinia()
pinia.use(persistedState);
app.use(pinia)

app.mount('#app')
