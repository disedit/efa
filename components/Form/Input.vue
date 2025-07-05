<script setup>
defineProps({
  size: { 
    type: String,
    default: 'base',
  },
})
</script>

<template>
  <input
    v-bind="$attrs"
    :class="[
      'bg-true-white bordered w-full py-[.25em] px-[.5em] focus:outline-none',
      {
        'text-md md:text-base': size === 'base',
      }
    ]"
  />
</template>
