<script setup>
defineProps({ block: Object })
</script>

<template>
  <header class="min-h-safest-viewport bg-primary mx-site">
    <pre>{{ block }}</pre>
    <h1>
      {{ block.headline }}
    </h1>
  </header>
</template>

<style>

</style>