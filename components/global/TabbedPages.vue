<script setup>
defineProps({ block: Object, context: Object })
</script>

<template>
  <section class="page-container">
    <ElementsTabbedPages
      :menu="context.menu"
    >
      <UtilsBlocks
        :blocks="block.content"
        :context="context"
      />
    </ElementsTabbedPages>
  </section>
</template>
