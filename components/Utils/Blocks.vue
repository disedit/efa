<script setup>
defineProps({
  blocks: {
    type: Array,
    required: true
  },
  context: {
    type: Object,
    default: () => null
  },
})

const { componentName } = useUtils()
</script>

<template>
  <Component
    :is="componentName(block.acf_fc_layout)"
    v-for="(block, i) in blocks"
    :key="i"
    :block="block"
    :context="context"
  />
</template>
