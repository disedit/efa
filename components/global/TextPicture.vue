<script setup>
defineProps({ block: Object })
</script>

<template>
  <section class="page-container grid lg:grid-cols-[2fr_1fr] gap-inner">
    <div v-html="block.text" :class="['prose hyphens-auto text-pretty text-md', { 'text-purple': block.text_color === 'purple' }]" />
    <figure v-if="block.picture" class="w-[500px]">
      <NuxtPicture
        :src="block.picture.url"
        :alt="block.picture.alt"
        :img-attrs="{ class: 'w-full h-full object-cover' }"
      />
      <figcaption v-if="block.picture.caption">
        {{ block.picture.caption }}
      </figcaption>
    </figure>
  </section>
</template>
