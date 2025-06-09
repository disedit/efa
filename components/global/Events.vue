<script setup>
const props = defineProps({ block: Object })

const { $wp } = useNuxtApp()

const { data: events } = await useAsyncData(
  `events`, () => $wp.events()
)
</script>

<template>
  <section class="page-container">
    <pre>{{ events }}</pre>
  </section>
</template>

<style>

</style>