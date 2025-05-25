<script setup>
defineProps({ block: Object })
</script>

<template>
  <section
    :class="[
      'page-container flex flex-wrap gap-site md:pb-0 md:-mb-5',
    ]">
    <div
      v-for="(card, i) in block.blocks"
      :key="i"
      :class="['card basis-full md:basis-[30%]', `color-${card.color}`]"
    >
      <span class="font-medium text-3xl text-(--text-color-secondary) leading-none">
        {{ card.number }}
      </span>
      <span class="mt-auto text-balance leading-none">
        {{ card.text }}
      </span>
    </div>
  </section>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  color: var(--text-color);
  padding: .5em;
  font-size: var(--text-lg);
  font-weight: 800;
  min-height: 8em;
  flex-grow: 1;
}
</style>