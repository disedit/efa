<script setup>
defineProps({ block: Object })
</script>

<template>
  <section class="page-container grid lg:grid-cols-[1fr_auto] gap-inner">
    <div v-html="block.text" class="prose text-md" />
    <div v-if="block.video">
      <UtilsVideo
        id="PageVideo"
        :video="block.video.url"
        autoplay
        show-time
        show-unmute-tooltip
        class="lg:h-[calc(20rem+45vh)]"
      />
    </div>
  </section>
</template>
