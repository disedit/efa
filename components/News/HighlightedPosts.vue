<script setup>
defineProps({
  posts: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div>
    <NewsHighlightedPost
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>

