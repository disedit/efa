<script setup>
defineProps({ block: { type: Object, required: true }, context: { type: Object, default: null } })
</script>

<template>
  <section :class="[{ 'page-container': block.container }]" v-html="block.code" />
</template>
