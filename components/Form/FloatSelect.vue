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
  options: {
    type: Array,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  wrapperClass: {
    type: String,
    default: '',
  }
})

const modelValue = defineModel()
const focused = ref(false)
const floating = computed(() => {
  return !!modelValue.value || focused.value
})
</script>

<template>
  <div :class="['field relative', { floating }, wrapperClass]">
    <label :for="name" class="label flex justify-between w-full items-center px-3 md:px-4">
      {{ label }}
      <span v-if="!required" class="text-xs opacity-60">Optional</span>
    </label>
    <select
      :id="name"
      :name="name"
      v-model="modelValue"
      v-bind="$attrs"
      :required="required"
      class="appearance-none w-full px-3 md:px-4 pt-6 md:pt-8 pb-2 md:pb-3 text-md md:text-base font-medium"
      @focus="focused = true"
      @blur="focused = false"
    >
      <option v-for="(option, index) in options" :key="index" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <Icon name="ri:arrow-down-s-line" class="icon" />
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

.icon {
  position: absolute;
  pointer-events: none;
  top: 50%;
  right: 1rem;
  font-size: 2rem;
  transform: translateY(-50%);
}

.floating {
  .label {
    top: .5rem;
    transform: translateY(0);
    font-size: var(--text-xs);
  }
}
</style>