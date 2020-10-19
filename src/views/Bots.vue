<template>
  <div>
    <h1 class="text-2xl pb-4">Bots</h1>
    <div class="grid grid-cols-6 px-4 rounded-lg shadow-sm mb-4 bg-white select-none">
      <div @click="toggle('name')" class="py-4 cursor-pointer flex items-center hover:underline">
        Name
        <ChevronUpIcon class="ml-2" v-if="sortedMode === 'nameASC'" />
        <ChevronDownIcon class="ml-2" v-if="sortedMode === 'nameDESC'" />
      </div>
      <div @click="toggle('cpu')" class="py-4 cursor-pointer flex items-center hover:underline">
        CPU
        <ChevronUpIcon class="ml-2" v-if="sortedMode === 'cpuASC'" />
        <ChevronDownIcon class="ml-2" v-if="sortedMode === 'cpuDESC'" />
      </div>
      <div @click="toggle('mem')" class="py-4 cursor-pointer flex items-center hover:underline">
        Memory
        <ChevronUpIcon class="ml-2" v-if="sortedMode === 'memASC'" />
        <ChevronDownIcon class="ml-2" v-if="sortedMode === 'memDESC'" />
      </div>
      <div @click="toggle('errors')" class="py-4 cursor-pointer flex items-center hover:underline">
        Errors
        <ChevronUpIcon class="ml-2" v-if="sortedMode === 'errorsASC'" />
        <ChevronDownIcon class="ml-2" v-if="sortedMode === 'errorsDESC'" />
      </div>
      <div @click="toggle('instances')" class="py-4 cursor-pointer flex items-center hover:underline">
        Instances
        <ChevronUpIcon class="ml-2" v-if="sortedMode === 'instancesASC'" />
        <ChevronDownIcon class="ml-2" v-if="sortedMode === 'instancesDESC'" />
      </div>
      <div class="py-4">
        Actions
      </div>
    </div>

    <router-link :to="`/bots/${bot.id}`" tag="div" v-for="bot of bots" class="grid grid-cols-6 p-4 rounded-lg shadow-sm mb-4 bg-white cursor-pointer select-none">
      <div>
        <h1 class="text-lg text-orange-400 font-bold pb-2">Name:</h1>
        {{ bot.name }}
      </div>
      <div>
        <h1 class="text-lg text-orange-400 font-bold pb-2">CPU:</h1>
        {{ bot.cpu }} %
      </div>
      <div>
        <h1 class="text-lg text-orange-400 font-bold pb-2">Memory:</h1>
        {{ bot.memory }} MB
      </div>
      <div>
        <h1 class="text-lg text-orange-400 font-bold pb-2">Errors:</h1>
        {{ bot.errors }}
      </div>
      <div>
        <h1 class="text-lg text-orange-400 font-bold pb-2">Instances:</h1>
        {{ bot.runningInstances }} / {{ bot.instances.length }}
      </div>
      <div class="flex items-center text-2xl">
        <div @click.stop.prevent="bot.actions.showInstances = !bot.actions.showInstances" class="cursor-pointer hover:text-orange-400 py-2 px-2">
          <more-horizontal-icon size="1x" />
        </div>
      </div>
      <div v-if="bot.actions.showInstances" class="col-span-6 pt-4">
        <table class="w-full text-xs">
          <thead>
            <tr class="text-orange-400 font-bold">
              <td class="p-2">Instance No.</td>
              <td class="p-2">Bot name</td>
              <td class="p-2">Errors</td>
              <td class="p-2">State</td>
              <td class="p-2">
                <abbr title="Should the instance restart automatically when crashed?">
                  Auto restart
                </abbr>
              </td>
              <td class="p-2">Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(instance, i) of bot.instances" class="border-t border-gray-200 pt-4">
              <td class="p-2">
                Instance #{{ i }}
              </td>
              <td class="p-2">{{ instance.name }}</td>
              <td class="p-2">{{ instance.errors }}</td>
              <td class="p-2">
                <Toggle @update:model-value="toggleState(instance, $event)" :disabled="instance.stateDisabled" class="mr-2" v-model="instance.enabled" />
                <span>
                  {{ instance.state }}
                </span>
              </td>
              <td class="p-2">
                <Toggle class="mr-2" v-model="instance.autoRestart" />
              </td>
              <td class="p-2">
                <router-link tag="div" :to="`/bots/${bot.id}/${instance.id}`" class="cursor-pointer hover:text-orange-400 py-2 px-2 text-base">
                  <edit-icon size="1x" />
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </router-link>
  </div>
</template>

<script>
import { ChevronDownIcon, ChevronUpIcon, MoreHorizontalIcon, EditIcon } from '@zhuowenli/vue-feather-icons'
import { ref, reactive, computed, watch } from 'vue'
import Toggle from '../components/Toggle.vue'

export default {
  name: 'RunningInstances',

  components: {
    ChevronUpIcon,
    ChevronDownIcon,
    MoreHorizontalIcon,
    EditIcon,
    Toggle
  },

  methods: {
    async toggleState (instance, $event) {
      instance.stateDisabled = true

      // API call...
      await new Promise(f => setTimeout(f, 500))
      instance.state = $event ? 'RUNNING' : 'STOPPED'

      instance.stateDisabled = false
    }
  },

  async setup () {
    const sortedMode = ref('nameDESC')

    function toggle (name) {
      const [_, type, dir] = sortedMode.value.match(/([a-z]+)([A-Z]+)/)

      if (type === name) {
        sortedMode.value = `${type}${dir === 'ASC' ? 'DESC' : 'ASC'}`
        return
      }

      sortedMode.value = `${name}DESC`
    }

    const botsFromAPI = [
      {
        name: 'my-bot',
        id: 'aaaabbbb',
        cpu: 0,
        memory: 0,
        instances: [
          { enabled: false, name: 'digger-1', errors: 2, state: 'CRASHED', autoRestart: false, id: 'bbbbcccc' },
          { enabled: false, name: 'digger-2', errors: 0, state: 'STOPPED', autoRestart: true, id: 'bbbbdddd' },
          { enabled: true, name: 'digger-3', errors: 4, state: 'RUNNING', autoRestart: true, id: 'bbbbeeee' }
        ]
      }
    ]

    const bots = reactive(botsFromAPI.map((bot, i) => {
      bot.actions = { showInstances: false }
      bot.runningInstances = computed(() => bots[i].instances.reduce((a, { enabled }) => a + enabled, 0))
      bot.errors = computed(() => bots[i].instances.reduce((a, { errors }) => a + errors, 0))
      bot.instances = bot.instances.map(instance => {
        instance.stateDisabled = false
        return instance
      })

      return bot
    }))

    return { sortedMode, toggle, bots }
  }
}
</script>