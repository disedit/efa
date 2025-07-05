<script setup>
defineProps({ block: Object, context: Object })
</script>

<template>
  <section class="timeline page-container">
    <h2 class="text-lg font-extrabold text-primary tracking-tight mb-4 leading-none bg-white sticky top-navbar h-(--heading-height) flex items-center z-10">
      {{ block.heading }}
    </h2>
    <div class="grid gap-site md:gap-8">
      <div
        v-for="(milestone, i) in block.milestones"
        :key="i"
        class="timeline-item grid gap-site md:gap-8 mb-10 md:mb-0"
      >
        <h3 class="timeline-item-year text-primary text-3xl tracking-tight">
          <div class="sticky top-[calc(var(--spacing-navbar)+var(--heading-height)))] z-1">{{ milestone.year }}</div>
        </h3>
        <div class="timeline-item-picture">
          <NuxtPicture
            v-if="milestone.image"
            :src="milestone.image.url"
            :alt="milestone.image.alt"
            class="w-full"
            :img-attrs="{ class: 'aspect-[16/9] md:aspect-square w-full object-cover' }"
          />
        </div>
        <p class="text-base timeline-item-text">{{ milestone.description }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.timeline {
  --heading-height: 4rem;

  &-item {
    grid-template-columns: 1fr 1fr 4fr;
  }
}

@media (max-width: 46rem) {
  .timeline {
    --heading-height: 2.5rem;

    &-item {
      grid-template-columns: 7rem 1fr;
      grid-template-areas:
        "year picture"
        "year text";

      &-year {
        grid-area: year;
      }

      &-picture {
        grid-area: picture;
      }
      
      &-text {
        grid-area: text;
      }
    }
  }
}
</style>