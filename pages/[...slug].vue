<script setup>
const { params } = useRoute()
const page = await usePage(params.slug)
</script>

<template>
  <div>
    <pre>{{ page }}</pre>
  </div>
</template>

<style>

</style>