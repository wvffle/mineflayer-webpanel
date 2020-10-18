<template>
  <div class="inline-block" :class="disabled ? 'opacity-50 pointer-events-none' : ''">
    <input :checked="modelValue" @change="change" type="checkbox" :name="id" :id="id" class="hidden" />

    <label :for="id" class="inline-block align-middle cursor-pointer rounded-full w-12 h-8 p-1 transition duration-75 relative" :class="on ? 'bg-orange-400' : 'bg-gray-400'">
      <div class="absolute bg-white rounded-full w-6 h-6 transition-left duration-75" :style="{ top: '.25rem', left: on ? `1.25rem` : '.25rem' }"></div>
    </label>
    <label v-if="label" class="ml-2 text-xs text-gray-700" :for="id">{{ label }}</label>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'Toggle',

  props: {
    label: String,
    modelValue: {
      type: Boolean,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    change ($event) {
      this.$emit('update:modelValue', this.on = $event.target.checked)
    }
  },

  setup (props) {
    const id = Math.random().toString(36).slice(2, 9)
    const on = ref(props.modelValue)

    return {
      label: props.label,
      modelValue: props.modelValue,
      id,
      on
    }
  }
}
</script>