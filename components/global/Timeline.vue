<script setup>
defineProps({ block: Object })
</script>

<template>
  <section class="page-container">
    <h2 class="text-lg font-extrabold text-primary tracking-tight mb-8 leading-none">{{ block.heading }}</h2>
    <div class="timeline grid gap-8">
      <div
        v-for="(milestone, i) in block.milestones"
        :key="i"
        class="timeline-item grid grid-cols-[1fr_1fr_4fr] gap-8"
      >
        <h3 class="text-primary text-3xl tracking-tight">
          <div class="sticky top-navbar">{{ milestone.year }}</div>
        </h3>
        <div>
          <NuxtPicture
            v-if="milestone.image"
            :src="milestone.image.url"
            :alt="milestone.image.alt"
            class="w-full"
            :img-attrs="{ class: 'aspect-square w-full object-cover' }"
          />
        </div>
        <p class="text-base">{{ milestone.description }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>

</style>