<script setup>
defineProps({ block: Object, context: Object })
</script>

<template>
  <section class="page-container grid lg:grid-cols-[2fr_1fr] gap-inner text-blackish">
    <div v-html="block.text" :class="['prose hyphens-auto text-pretty text-md', { 'text-purple': block.text_color === 'purple' }]" />
    <figure v-if="block.picture" class="md:w-[500px]">
      <NuxtPicture
        :src="block.picture.url"
        :alt="block.picture.alt"
        :img-attrs="{ class: 'w-full h-full object-cover' }"
        sizes="100vw md:1200px"
      />
      <figcaption v-if="block.picture.caption">
        {{ block.picture.caption }}
      </figcaption>
    </figure>
  </section>
</template>
