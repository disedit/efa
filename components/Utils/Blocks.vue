<script setup>
defineProps({
  blocks: {
    type: Array,
    required: true,
  },
})

const { componentName } = useUtils()
</script>

<template>
  <Component
    v-for="(block, i) in blocks"
    :key="i"
    :is="componentName(block.acf_fc_layout)"
    :block="block"
  />
</template>
