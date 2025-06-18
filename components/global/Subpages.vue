<script setup>
defineProps({ block: Object, context: Object })
</script>

<template>
  <div>
    <pre>{{ block }}</pre>
    <pre>{{ context }}</pre>
  </div>
</template>
