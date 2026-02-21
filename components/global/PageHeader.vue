<script setup>
const props = defineProps({ block: Object, context: Object })

const currentPage = '#'
const { page } = useUtils()
</script>

<template>
  <div v-if="block.image">
    <NuxtPicture
      :src="block.image"
      :img-attrs="{ class: 'w-full h-[calc(5rem+25vh)] object-cover' }"
      sizes="100vw md:2000px"
    />
  </div>
  <header class="page-container pt-inner" :style="block.compact ? { '--breakpoint-3xl': '76rem' } : null">
    <nav v-if="!block.hide_breadcrumbs && context && context.breadcrumbs" aria-label="Breadcrumb" class="breadcrumb relative z-1 font-bold text-base">
      <ol class="flex items-center flex-wrap">
        <template v-for="item in context.breadcrumbs" :key="item.ID || item.id" >
          <li v-if="!item.hidden" class="flex items-center text-purple">
            <NuxtLink
              v-if="item.post_name || item.url"
              :to="page(item.post_name || item.url)"
              class="underlined-on-hover flex items-center gap-1"
            >
              <span
                v-if="item.color"  
                :class="['h-[1em] w-[1em] bg-[var(--bg-color,var(--color-primary))] rounded-full', `color-${item.color}`]"
              />
              {{ item.post_title || item.title }}
            </NuxtLink>
            <span v-else>
              {{ item.post_title || item.title }}
            </span>
            <Icon name="ri:arrow-right-s-line" class="relative top-[.1em]" />
          </li>
        </template>
        <li class="sr-only">
          <NuxtLink :to="currentPage">
            {{ block.heading || context.title }}
          </NuxtLink>
        </li>
      </ol>
    </nav>
    <h1
      class="font-extrabold text-balance text-4xl text-purple leading-none tracking-tight"
      :style="{
        'view-transition-name': block.headingViewTransitionName
      }"
    >
      {{ block.heading || context.title }}
    </h1>
    <p v-if="block.introduction" class="text-purple text-md leading-tighter max-w-[70ch] text-balance">
      {{ block.introduction }}
    </p>
  </header>
</template>

<style>

</style>