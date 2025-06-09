<template>
  <div>
    {{ event }}
  </div>
</template>

<script setup>
defineProps({
  event: { type: Object, required: true}
})
</script>
