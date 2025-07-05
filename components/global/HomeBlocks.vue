<script setup>
defineProps({ block: Object, context: Object })

const { link } = useUtils()
</script>

<template>
  <section class="grid grid-cols-2 xl:grid-cols-4 p-site gap-site">
    <template v-for="(homeBlock, i) in block.blocks" :key="i">
      <NuxtLink
        v-if="!homeBlock.is_newsletter"
        :to="link(homeBlock.link)"
        :class="[
          'bg-(--bg-color) text-(--text-color-secondary) p-site md:p-7 leading-none',
          'text-2xl font-extrabold min-h-[4em] md:min-h-[2em] hover:text-(--text-color)',
          `color-${homeBlock.color}`
        ]"
      >
        <div class="max-w-[8ch] text-balance">{{ homeBlock.link?.title }}</div>
      </NuxtLink>
      <div v-else :class="['bg-(--bg-color) text-(--text-color-secondary) col-span-2', `color-${homeBlock.color}`]">
        <SiteNewsletter />
      </div>
    </template>
  </section>
</template>
