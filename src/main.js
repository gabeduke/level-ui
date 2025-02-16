// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Firebase v9 modular
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// VueFire for Vue 3
import { VueFire, VueFireAuth } from 'vuefire'

// BootstrapVue 3 (community version)
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

// Service Worker registration (if you need it)
import './registerServiceWorker'

// Your firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAW6JqpSnJB9_WWNpxjyirq5Ltq9tOoo3o",
  authDomain: "leetapp-979bf.firebaseapp.com",
  databaseURL: "https://leetapp-979bf.firebaseio.com",
  projectId: "leetapp-979bf",
  storageBucket: "leetapp-979bf.appspot.com",
  messagingSenderId: "157484514902",
  appId: "1:157484514902:web:251f0bb25cb50cdeca45f7"
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)

const app = createApp(App)
app.use(router)
app.use(store)
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()]
})
app.use(BootstrapVue3)

app.mount('#app')
