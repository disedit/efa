<script setup>
defineProps({
  posts: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section class="grid lg:grid-cols-2 gap-site lg:gap-12">
    <NewsHighlightedPost
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </section>
</template>

