import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap/js/index.umd.js'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'
// import { createStore } from 'vuex/types/index.js'
import store from './store'

const app = createApp(App)

app.use(createStore(store))
app.use(router)

app.mount('#app')
