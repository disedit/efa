<script setup>
defineProps({ block: Object, context: Object })

const { $wp, $gsap } = useNuxtApp()
const { data: stats } = await useAsyncData(
  `stats`, () => $wp.stats()
)
const blocks = ref(null)

onMounted(() => {
  const counters = document.querySelectorAll('.counter')
  $gsap.from(counters, {
    textContent: 0,
    duration: 1,
    ease: 'Power1.easeOut',
    snap: { textContent: 1 },
    stagger: .25,
    scrollTrigger: {
      trigger: blocks.value,
      start: 'top bottom',
    }
  })
})
</script>

<template>
  <section
    :class="[
      'page-container flex flex-wrap gap-site md:gap-8 md:pb-0',
    ]"
    ref="blocks"
  >
    <div
      v-for="(card, i) in block.blocks"
      :key="i"
      :class="['card basis-full md:basis-[30%]', `color-${card.color}`]"
    >
      <span class="counter font-medium text-5xl md:text-3xl text-(--text-color-secondary) leading-none">
        {{ card.dynamic ? stats[card.dynamic] : card.number }}
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
  font-size: var(--text-lg);
  font-weight: 800;
  min-height: 8em;
  flex-grow: 1;
  padding: var(--card-padding);
}
</style>