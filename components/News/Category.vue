<script lang="ts" setup>
defineProps({
  category: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="flex gap-2 items-center">
    <span :class="['h-[1em] w-[1em] bg-[var(--bg-color,var(--color-primary))] rounded-full', `color-${category.color}`]" />
    <span>{{ category.name }}</span>
  </div>
</template>
