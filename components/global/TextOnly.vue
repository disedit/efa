<script setup>
defineProps({ block: { type: Object, required: true }, context: { type: Object, default: null } })
</script>

<template>
  <section class="page-container text-blackish" :style="block.compact ? { '--breakpoint-3xl': '76rem' } : null">
    <div :class="['prose hyphens-auto text-pretty text-md', { 'text-purple': block.text_color === 'purple' }]" v-html="block.text" />
  </section>
</template>
