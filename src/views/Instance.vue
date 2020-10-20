<template>
  <div class="grid grid-cols-3 -m-4 h-screen">
    <div class="col-span-2 p-4">
      <h1 class="text-2xl pb-4 flex items-center text-gray-600">
        <router-link to="/">Bots</router-link>
        <minus-icon size="2x" class="-rotate-45 transform stroke-1 -ml-1 -mr-2" />
        <router-link :to="`/bots/${bot.id}`">{{ bot.name }}</router-link>
        <minus-icon size="2x" class="-rotate-45 transform stroke-1 -ml-1 -mr-2" />
        <span class="text-black">
          {{ instance.id }}
        </span>
      </h1>

      <div class="w-full relative" style="padding-bottom: 56.25%">
        <img src="https://prismarine.js.org/prismarine-viewer/test_1.16.1.png" alt="p-viewer preview" class="w-full rounded shadow absolute h-full">

        <div v-if="pviewerMode === 'free'" class="absolute top-0 left-0 w-full text-sm flex justify-center overflow-hidden pb-1">
          <div class="rounded-b-lg py-3 px-8 bg-gray-100 shadow">
            Press
            <kbd class="bg-gray-300 rounded text-gray-600 font-normal py-1 px-2 text-xs mx-1 shadow">Esc</kbd>
            to exit Free Cam mode
          </div>
        </div>

        <div class="absolute text-white text-2xl flex right-0 bottom-0" style="filter: drop-shadow(2px 2px 2px #000)">
          <div @click="pviewerSetMode('free')" class="p-2 cursor-pointer" :class="pviewerMode === 'free' ? 'pointer-events-none' : 'opacity-50'">
            <camera-icon size="1x" />
          </div>
          <div @click="pviewerSetMode('user')" class="p-2 cursor-pointer" :class="pviewerMode !== 'free' ? '' : 'opacity-50'">
            <user-icon size="1x" />
          </div>
        </div>
      </div>

      <h2 class="text-xl px-4 py-2">Console</h2>
      <div class="rounded bg-gray-900 text-xs grid font-mono h-48" style="grid-template-rows: 1fr auto">
        <pre class="text-gray-100 p-4">[STATE] findEntity<br>[STATE] followEntity<br>[STATE] killEntity<br>[STATE] idle</pre>
        <div class="relative">
          <div class="absolute left-0 top-0 w-full h-8 text-white text-lg pointer-events-none">
            <chevron-right-icon size="1x" class="mt-2 ml-1" />
          </div>
          <input type="text" placeholder="Type a command" class="bg-transparent border-t border-gray-700 text-white outline-none block w-full p-2 pl-6 font-mono">
        </div>
      </div>


    </div>
    <div class="border-l border-gray-300 grid max-h-screen" style="grid-template-rows: auto auto auto 1fr auto">
      <div class="px-4 pt-4 pb-2 flex items-center text-xl">
        <img :src="`https://minotar.net/helm/${instance.name}/64`" :alt="`${instance.name}'s avatar`" class="rounded mr-4">
        <div>
          {{ instance.name }}
          <div class="text-gray-800 text-sm">{{ instance.server }} @ {{ instance.version }}</div>
        </div>
      </div>

      <h2 class="text-xl pb-2 px-4">Inventory</h2>
      <div class="mx-4">
        <img src="/src/assets/inventory.png" alt="Inventory background" class="w-full mb-2" style="image-rendering: crisp-edges;">
      </div>

      <div class="px-4 text-xs relative max-h-full overflow-y-hidden">
        <div class="absolute top-0 left-0 w-full h-8" style="background: linear-gradient(180deg, #f7fafc 10%, transparent 90%)"></div>
        <div class="overflow-y-auto flex h-full">
          <div class="grid max-h-full w-full mt-auto" style="grid-template-columns: auto 1fr;">
            <template v-for="{ user, msg } of chat">
              <div class="w-auto">
                <div class="flex items-center pr-2">
                  <img :src="`https://minotar.net/helm/${user}/16`" alt="`${user}'s avatar`" class="rounded mr-2">
                  {{ user }}:
                </div>
              </div>
              <div>
                {{ msg }}
              </div>
            </template>
          </div>
          <table class="mt-auto">
            <tbody>
              <tr class="pb-2">
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="relative">
        <input type="text" placeholder="Type a message to chat" class="block border-t border-gray-300 bg-white w-full outline-none p-2">
        <div class="cursor-pointer flex justify-center items-center h-full top-0 right-0 w-16 pt-2 absolute">
          <send-icon size="1x" class="text-xl text-orange-400" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SendIcon, MinusIcon, ChevronRightIcon, UserIcon, CameraIcon } from '@zhuowenli/vue-feather-icons'
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Instance',

  components: {
    SendIcon,
    MinusIcon,
    ChevronRightIcon,
    UserIcon,
    CameraIcon
  },

  methods: {
    pviewerSetMode (mode) {
      this.pviewerMode = mode
    }
  },

  async setup () {
    const botFromAPI = {
      name: 'my-bot',
      id: 'aaaabbbb',
      cpu: 0,
      memory: 0,
      instances: [
        { enabled: false, name: 'digger', errors: 2, state: 'CRASHED', autoRestart: false, id: 'bbbbcccc', server: 'prismarine.js.org', version: '1.16.3' },
        { enabled: false, name: 'digger-2', errors: 0, state: 'STOPPED', autoRestart: true, id: 'bbbbdddd' },
        { enabled: true, name: 'digger-3', errors: 4, state: 'RUNNING', autoRestart: true, id: 'bbbbeeee' }
      ]
    }

    const { params: { iid } } = useRoute()
    const instance = botFromAPI.instances.find(({ id }) => id === iid)

    const chatFromAPI = reactive([
      { user: instance.name, msg: 'test' },
      { user: 'TheDudeFromCI', msg: 'test2' },
      { user: 'wvffle', msg: 'it works!' },
      { user: 'TheDudeFromCI', msg: 'No, it\'s just hardcoded.' }
    ])

    const pviewerMode = ref('user')

    return { bot: botFromAPI, chat: chatFromAPI, instance, pviewerMode }
  }
}
</script>
