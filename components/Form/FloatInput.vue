<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text',
  },
  required: {
    type: Boolean,
    default: false,
  }
})

const modelValue = defineModel()
const focused = ref(false)
const floating = computed(() => {
  return !!modelValue.value || focused.value
})
</script>

<template>
  <div :class="['field relative', `type-${type}`, { floating }]">
    <label :for="name" class="label flex justify-between w-full items-center px-4">
      {{ label }}
      <span v-if="!required" class="text-xs opacity-60">Optional</span>
    </label>
    <textarea
      v-if="type === 'textarea'"
      :id="name"
      :name="name"
      v-model="modelValue"
      v-bind="$attrs"
      :required="required"
      class="w-full focus:outline-none px-4 pt-8 pb-3 text-base font-medium field-sizing-content min-h-[20rem]"
      @focus="focused = true"
      @blur="focused = false"
    />
    <input
      v-else
      :type="type"
      :id="name"
      :name="name"
      v-model="modelValue"
      v-bind="$attrs"
      :required="required"
      class="w-full focus:outline-none px-4 pt-8 pb-3 text-base font-medium"
      @focus="focused = true"
      @blur="focused = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.label {
  position: absolute;
  pointer-events: none;
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--text-base);
  font-weight: 500;
  transition: 0.15s ease-in-out;
}

.type-textarea {
  .label {
    top: 1rem;
    transform: translateY(0);
  }
}

.floating {
  .label {
    top: .5rem;
    transform: translateY(0);
    font-size: var(--text-xs);
  }
}
</style>