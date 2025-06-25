<script setup>
defineProps({ block: Object, context: Object })
</script>

<template>
  <div v-html="block.content" :class="['prose hyphens-auto text-pretty text-md', { 'text-purple': block.text_color === 'purple', 'text-blackish': block.text_color === 'black' }]" />
</template>
