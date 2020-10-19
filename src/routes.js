import { defineAsyncComponent } from 'vue'

function loadView (name) {
  return defineAsyncComponent(() => import(`./views/${name}.vue`))
}

export default [
  { path: '/', name: 'index', component: loadView('Bots') },
  { path: '/bots', name: 'bots', component: loadView('Bots') },
  { path: '/bots/:id', name: 'bot', component: loadView('Bot') },
  { path: '/bots/:id/:iid', name: 'instance', component: loadView('Instance') },
  { path: '/projects', name: 'projects', component: loadView('Projects') },
  { path: '/:path(.*)*', name: 'not-found', component: loadView('NotFound') }
]
