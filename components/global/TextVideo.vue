<script setup>
defineProps({ block: { type: Object, required: true }, context: { type: Object, default: null } })
</script>

<template>
  <section class="page-container grid lg:grid-cols-3 gap-site text-blackish">
    <div :class="['prose hyphens-auto text-pretty text-md lg:col-span-2 pe-inner', { 'text-purple': block.text_color === 'purple' }]" v-html="block.text" />
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
