<template>
  <main class="grid h-screen" style="grid-template-columns: auto 1fr">
    <aside class="w-64 border-r border-gray-900 text-lg overflow-auto bg-gray-800 text-white">
      <nav>
        <router-link to="/" class="border-b border-gray-900 block py-4 px-4 text-sm hover:bg-gray-700">Bots</router-link>
        <hr class="border-t border-gray-700" />
        <router-link to="/projects" class="border-b border-gray-900 block py-4 px-4 text-sm hover:bg-gray-700">Projects</router-link>
        <hr class="border-t border-gray-700" />
      </nav>
    </aside>
    <div class="w-full p-4 bg-gray-100">
      <router-view v-slot="{ Component }">
        <suspense :timeout="0">
          <template #default>
            <component :is="Component" />
          </template>
          <template #fallback>
            <Loading />
          </template>
        </suspense>
      </router-view>
    </div>
  </main>
</template>

<script>
import Loading from './components/Loading.vue'

export default {
  name: 'App',

  components: {
    Loading
  },

  setup () {

  }
}
</script>
