<script setup>
const props = defineProps({ block: Object })
</script>

<template>
  <section class="page-container google-forms text-blackish">
    <div v-html="block.embed" />
  </section>
</template>

<style>
.google-forms iframe {
  width: 100% !important;
}
</style>