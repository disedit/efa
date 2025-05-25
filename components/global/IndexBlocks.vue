<script setup>
defineProps({ block: Object })
const { page } = useUtils()
</script>

<template>
  <section
    :class="[
      'page-container grid gap-site',
      {
        compact: block.compact,
        'md:grid-cols-2': block.max_columns == 2,
        'md:grid-cols-2 lg:grid-cols-3': block.max_columns == 3,
      }
    ]">
    <NuxtLink
      v-for="(card, i) in block.blocks"
      :key="i"
      :to="page(card.link)"
      :class="['card', `color-${card.color}`, { 'md:col-span-2': card.spans == 2, 'md:col-span-3': card.spans == 3 }]"
    >
      <Icon v-if="card.icon" :name="card.icon" class="card-icon" />
      <span class="leading-none">{{ card.label }}</span>
    </NuxtLink>
  </section>
</template>

<style scoped>
.card {
  --card-padding: 2rem;
  display: flex;
  position: relative;
  background-color: var(--bg-color);
  color: var(--text-color);
  padding: var(--card-padding);
  font-size: var(--text-lg);
  font-weight: 800;
  min-height: 8em;
  align-items: flex-end;

  &:hover {
    background-color: var(--bg-color-hover);
    color: var(--text-color-hover);

    .card-icon {
      color: var(--text-color-hover);
    }
  }
}

.card-icon {
  position: absolute;
  top: var(--card-padding);
  right: var(--card-padding);
  font-size: var(--text-3xl);
  color: var(--text-color-secondary)
}

.compact .card {
  min-height: 4em;
}
</style>