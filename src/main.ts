import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routeList } from './constants/routeList'

const app = createApp(App)
app.use(
  createRouter({
    history: createWebHashHistory(),
    routes: routeList,
  }),
)

app.mount('#app')
