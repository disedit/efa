<script setup>
defineProps({ block: Object, edge: Boolean })

useHead({
  script: [
    {
      src: 'https://tally.so/widgets/embed.js',
      async: true,
    }
  ],
})

onMounted(() => {
  if (window.Tally) {
    window.Tally.loadEmbeds()
  }
})
</script>

<template>
  <section :class="['text-blackish', { 'page-container': !edge }]">
    <iframe
      :data-tally-src="`https://tally.so/embed/${block.tally_form_id}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&formEventsForwarding=1`"
      loading="lazy"
      width="100%"
      height="547"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
    />
  </section>
</template>
