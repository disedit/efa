<script setup>
defineProps({ block: Object, context: Object })
</script>

<template>
  <section class="page-container grid gap-site md:gap-12 md:grid-cols-2">
    <a
      v-for="(card, i) in block.blocks"
      :key="i"
      :href="card.link"
      target="_blank"
      class="card"
    >
      <NuxtImg
        v-if="card.image"
        :src="card.image"
        :alt="card.label"
        class="card-image w-full bordered"
      />
      <div class="card-shadow shadow-1 bordered bg-white overflow-clip" aria-hidden="true">
        <NuxtImg
          v-if="card.image"
          :src="card.image"
          alt=""
          class="w-full"
        />
      </div>
      <div class="card-shadow shadow-2 bordered bg-white overflow-clip" aria-hidden="true">
        <NuxtImg
          v-if="card.image"
          :src="card.image"
          alt=""
          class="w-full"
        />
      </div>
    </a>
  </section>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  --shift-by: 1.5rem;

  &-image {
    aspect-ratio: 1.91;
    position: relative;
    z-index: 10;
    transition: .25s ease;
  }

  &:hover {
    .card-image {
      transform: translate(calc(-1 * var(--shift-by)), calc(-1 * var(--shift-by)));
    }

    .card-shadow {
      opacity: 1;

      &.shadow-2 {
        transform: translate(calc(-1 * var(--shift-by) / 2), calc(-1 * var(--shift-by) / 2));
      }
    }
  }

  &:active {
    .card-image {
      transform: translate(calc(-1 * (var(--shift-by) / 2)), calc(-1 * (var(--shift-by) / 2)));
    }

    .card-shadow {
      opacity: 1;

      &.shadow-2 {
        transform: translate(calc(-1 * var(--shift-by) / 4), calc(-1 * var(--shift-by) / 4));
      }
    }
  }

  &-shadow {
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0;
    transition: .25s ease;
    overflow: clip;

    img {
      aspect-ratio: 1.91;
      opacity: .25;
    }
  }

  .shadow-2 {
    z-index: 2;

    img {
      opacity: .5;
    }
  }
}
</style>