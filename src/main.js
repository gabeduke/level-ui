import App from './App.vue'
import store from './store'
import router from './router'

import Vue from 'vue'
import firebase from 'firebase'
import { firestorePlugin } from 'vuefire'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './registerServiceWorker'


const firebaseConfig = {
  apiKey: "AIzaSyAW6JqpSnJB9_WWNpxjyirq5Ltq9tOoo3o",
  authDomain: "leetapp-979bf.firebaseapp.com",
  databaseURL: "https://leetapp-979bf.firebaseio.com",
  projectId: "leetapp-979bf",
  storageBucket: "leetapp-979bf.appspot.com",
  messagingSenderId: "157484514902",
  appId: "1:157484514902:web:251f0bb25cb50cdeca45f7"
};

firebase.initializeApp(firebaseConfig)

Vue.use(firestorePlugin)
Vue.use(BootstrapVue)

Vue.component('v-select', vSelect)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
