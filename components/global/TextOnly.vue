<script setup>
defineProps({ block: Object, context: Object })
</script>

<template>
  <section class="page-container text-blackish" :style="block.compact ? { '--breakpoint-3xl': '76rem' } : null">
    <div v-html="block.text" :class="['prose hyphens-auto text-pretty text-md', { 'text-purple': block.text_color === 'purple' }]" />
  </section>
</template>
