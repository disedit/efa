<template>
  <UtilsSocials :socials="items" aria-label="Social Media Links" class="text-base" />
</template>

<script lang="ts" setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>
