<script setup>
defineProps({ block: { type: Object, required: true } })
</script>

<template>
  <section class="bento-tabs page-container grid md:grid-cols-2 lg:grid-cols-3 gap-10">
    <ElementsTab
      v-for="(tab, i) in block.tabs"
      :key="i"
      :class="{
        'lg:col-span-2': tab.col_span == 2,
        'md:col-span-2 lg:col-span-3': tab.col_span == 3,
      }"
    >
      <template #label>
        <h2>{{ tab.label }}</h2>
      </template>

      <div class="text-base flex gap-site">
        <div v-if="tab.picture" class="basis-[50%] shrink-0">
          <NuxtImg
            :src="tab.picture"
            alt=""
            sizes="800px"
          />
        </div>
        <div class="prose" v-html="tab.content" />
      </div>
    </ElementsTab>
  </section>
</template>
