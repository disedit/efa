<script setup>
defineProps({ block: Object, context: Object })
</script>

<template>
  <section v-html="block.code" :class="[{ 'page-container': block.container }]" />
</template>
