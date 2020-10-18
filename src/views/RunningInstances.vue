<template>
  <div>
    <h1 class="text-2xl pb-4">Running Instances</h1>
    <div class="grid grid-cols-4 p-4 rounded-lg shadow-sm mb-4 bg-white select-none">
      <div @click="toggle('name')" class="cursor-pointer flex items-center hover:underline">
        Name
        <ChevronUpIcon class="ml-2" v-if="sortedMode === 'nameASC'" />
        <ChevronDownIcon class="ml-2" v-if="sortedMode === 'nameDESC'" />
      </div>
      <div @click="toggle('cpu')" class="cursor-pointer flex items-center hover:underline">
        CPU
        <ChevronUpIcon class="ml-2" v-if="sortedMode === 'cpuASC'" />
        <ChevronDownIcon class="ml-2" v-if="sortedMode === 'cpuDESC'" />
      </div>
      <div @click="toggle('mem')" class="cursor-pointer flex items-center hover:underline">
        Memory
        <ChevronUpIcon class="ml-2" v-if="sortedMode === 'memASC'" />
        <ChevronDownIcon class="ml-2" v-if="sortedMode === 'memDESC'" />
      </div>
      <div @click="toggle('errors')" class="cursor-pointer flex items-center hover:underline">
        Errors
        <ChevronUpIcon class="ml-2" v-if="sortedMode === 'errorsASC'" />
        <ChevronDownIcon class="ml-2" v-if="sortedMode === 'errorsDESC'" />
      </div>
    </div>
    <div class="grid grid-cols-4 p-4 rounded-lg shadow-sm mb-4 bg-white cursor-pointer select-none">
      <div>
        <h1 class="text-lg text-orange-400 font-bold pb-2">Name:</h1>
        my-bot
      </div>
      <div>
        <h1 class="text-lg text-orange-400 font-bold pb-2">CPU:</h1>
        0 %
      </div>
      <div>
        <h1 class="text-lg text-orange-400 font-bold pb-2">Memory:</h1>
        0 MB
      </div>
      <div>
        <h1 class="text-lg text-orange-400 font-bold pb-2">Errors:</h1>
        0
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon, ChevronUpIcon } from '@zhuowenli/vue-feather-icons'
import { ref } from 'vue'

export default {
  name: 'RunningInstances',

  components: {
    ChevronUpIcon,
    ChevronDownIcon
  },

  async setup () {
    await new Promise(f => setTimeout(f, 1000))

    const sortedMode = ref('nameDESC')

    function toggle (name) {
      const [_, type, dir] = sortedMode.value.match(/([a-z]+)([A-Z]+)/)

      if (type === name) {
        sortedMode.value = `${type}${dir === 'ASC' ? 'DESC' : 'ASC'}`
        return
      }

      sortedMode.value = `${name}DESC`
    }

    return { sortedMode, toggle }
  }
}
</script>
