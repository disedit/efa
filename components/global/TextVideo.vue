<script setup>
defineProps({ block: Object })
</script>

<template>
  <section class="page-container grid lg:grid-cols-3 gap-site">
    <div v-html="block.text" :class="['prose hyphens-auto text-pretty text-md lg:col-span-2 pe-inner', { 'text-purple': block.text_color === 'purple' }]" />
    <div v-if="block.video">
      <UtilsVideo
        id="PageVideo"
        :video="block.video.url"
        autoplay
        show-time
        show-unmute-tooltip
      />
    </div>
  </section>
</template>
