<template>
  <main class="grid h-screen" style="grid-template-columns: auto 1fr">
    <aside class="w-64 border-r border-gray-900 text-lg overflow-auto bg-gray-800 text-white">
      <nav>
        <router-link to="/" class="border-b border-gray-900 block py-4 px-4 text-sm hover:bg-gray-700">Running intances</router-link>
        <hr class="border-t border-gray-700" />
        <router-link to="/projects" class="border-b border-gray-900 block py-4 px-4 text-sm hover:bg-gray-700">Projects</router-link>
        <hr class="border-t border-gray-700" />
      </nav>
    </aside>
    <div class="w-full p-4">
      <suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <Loading />
        </template>
      </suspense>
    </div>
  </main>
</template>

<script>
import Loading from './components/Loading'

export default {
  name: 'App',

  components: {
    Loading
  }
}
</script>
