<script setup>
const props = defineProps({ block: Object, edge: Boolean })
</script>

<template>
  <section :class="['google-forms text-blackish', { 'page-container': !edge }]">
    <div v-html="block.embed" />
  </section>
</template>

<style>
.google-forms iframe {
  width: 100% !important;
}
</style>