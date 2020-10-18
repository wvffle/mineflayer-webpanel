import { defineAsyncComponent } from 'vue'

function loadView (name) {
  return defineAsyncComponent(() => import(`./views/${name}.vue`))
}

export default [
  { path: '/', name: 'index', component: loadView('RunningInstances') },
  { path: '/projects', name: 'projects', component: loadView('Projects') },
  { path: '/:path(.*)*', name: 'not-found', component: loadView('NotFound') }
]
