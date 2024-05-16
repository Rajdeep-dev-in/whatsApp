import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vue3GoogleLogin,{
    clientId: "851984497318-t69n8oaibgjdlbg3fp90nlu3md9imqut.apps.googleusercontent.com",
})

app.mount('#app')
