import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'

import './assets/tailwind.css'

const router = createRouter({
  history: createWebHistory(),
  routes: import.meta.hot ? [] : routes,

  scrollBehavior () {
    return { top: 0 }
  }
})

if (import.meta.hot) {
  const removeRoutes = []

  for (const route of routes) {
    removeRoutes.push(router.addRoute(route))
  }

  import.meta.hot.acceptDeps('./routes.js', ({ routes }) => {
    for (const removeRoute of removeRoutes) {
      removeRoute()
    }

    removeRoutes.length = 0

    for (const route of routes) {
      removeRoutes.push(router.addRoute(route))
    }

    return router.replace('')
  })
}

createApp(App).use(router).mount('#app')
