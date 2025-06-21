<script setup>
defineProps({
  loading: { type: Boolean, default: false },
  value: { type: String, required: true },
  loadingValue: { type: String, default: 'Loading...' },
  icon: { type: String, default: '' }
})
</script>

<template>
  <button
    v-bind="$attrs"
    class="flex gap-2 items-center bg-primary font-bold text-white py-[.25em] px-[.75em] transition-all cursor-pointer text-base"
  >
    <Icon v-if="icon && !loading" :name="icon" />
    <Icon v-else-if="loading" name="eos-icons:loading" />
    {{ loading ? loadingValue : value }}
  </button>
</template>
