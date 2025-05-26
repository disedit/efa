<script setup>
defineProps({ block: Object })

const currentPage = '#'
</script>

<template>
  <header class="page-container pt-inner">
    <nav aria-label="Breadcrumb" class="breadcrumb relative z-1 font-bold text-base">
      <ol class="flex items-center">
        <li v-for="page in block.breadcrumbs" :key="page.ID" class="flex items-center text-purple">
          <NuxtLink
            :to="`/${page.post_name}`"
            class="underlined-on-hover"
          >
            {{ page.post_title }}
          </NuxtLink>
          <Icon name="ri:arrow-right-s-line" class="relative top-[.1em]" />
        </li>
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