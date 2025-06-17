<script setup>
const props = defineProps({ block: Object, context: Object })

const currentPage = '#'
const { page } = useUtils()
</script>

<template>
  <header class="page-container pt-inner">
    <nav v-if="!block.hide_breadcrumbs" aria-label="Breadcrumb" class="breadcrumb relative z-1 font-bold text-base">
      <ol class="flex items-center">
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
    <h1 class="font-extrabold text-balance text-4xl text-purple leading-none tracking-tight">
      {{ block.heading || context.title }}
    </h1>
    <p v-if="block.introduction" class="text-purple text-md leading-tighter max-w-[70ch] text-balance">
      {{ block.introduction }}
    </p>
  </header>
</template>

<style>

</style>