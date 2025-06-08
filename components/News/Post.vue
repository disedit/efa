<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article>
    <NuxtLink
      :to="`/news/${post.slug}`"
    >
      {{ post.title }}
    </NuxtLink>
  </article>
</template>
