import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
//import BootstrapVue from "bootstrap-vue";
//import "bootstrap/dist/css/bootstrap.min.css"
//import "bootstrap-vue/dist/bootstrap-vue.css"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle,faUserSecret,faMinusCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faPlusCircle,faUserSecret,faMinusCircle);



createApp(App).use(router).mount('#app')
