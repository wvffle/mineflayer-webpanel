<template>
  <div class="grid grid-cols-3 -m-4 h-screen">
  </div>
</template>

<script>
import { SendIcon, MinusIcon } from '@zhuowenli/vue-feather-icons'
import { reactive } from 'vue'

export default {
  name: 'Bot',

  components: {
    SendIcon,
    MinusIcon
  },

  async setup () {
    const botFromAPI = {
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

    const chatFromAPI = reactive([
      { user: 'wvffle', msg: 'test' },
      { user: 'TheDudeFromCI', msg: 'test2' },
      { user: 'wvffle', msg: 'it works!' },
      { user: 'TheDudeFromCI', msg: 'No, it\'s just hardcoded.' },
    ])

    return { bot: botFromAPI, chat: chatFromAPI }
  }
}
</script>
