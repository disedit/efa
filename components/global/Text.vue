<script setup>
defineProps({ block: { type: Object, required: true }, context: { type: Object, default: null } })
</script>

<template>
  <div :class="['prose hyphens-auto text-pretty text-md', { 'text-purple': block.text_color === 'purple', 'text-blackish': block.text_color === 'black' }]" v-html="block.content" />
</template>
