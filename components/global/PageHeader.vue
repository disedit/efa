<script setup>
defineProps({ block: Object })

const currentPage = '#'
</script>

<template>
  <header class="page-container pt-inner">
    <nav aria-label="Breadcrumb" class="breadcrumb relative z-1 font-bold text-base">
      <ol class="flex items-center">
        <template v-for="page in block.breadcrumbs" :key="page.ID" >
          <li v-if="!page.hidden" class="flex items-center text-purple">
            <NuxtLink
              v-if="page.post_name"
              :to="`/${page.post_name}`"
              class="underlined-on-hover flex items-center gap-1"
            >
              <span
                v-if="page.color"  
                :class="['h-[1em] w-[1em] bg-[var(--bg-color,var(--color-primary))] rounded-full', `color-${page.color}`]"
              />
              {{ page.post_title }}
            </NuxtLink>
            <span v-else>
              {{ page.post_title }}
            </span>
            <Icon name="ri:arrow-right-s-line" class="relative top-[.1em]" />
          </li>
        </template>
        <li class="sr-only">
          <NuxtLink :to="currentPage">
            {{ block.heading }}
          </NuxtLink>
        </li>
      </ol>
    </nav>
    <h1 class="font-extrabold text-balance text-4xl text-purple leading-none tracking-tight">
      {{ block.heading }}
    </h1>
    <p v-if="block.introduction" class="text-purple text-md leading-tighter max-w-[70ch] text-balance">
      {{ block.introduction }}
    </p>
  </header>
</template>

<style>

</style>