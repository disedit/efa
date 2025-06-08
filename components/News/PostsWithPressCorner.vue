<script setup>
defineProps({
  posts: {
    type: Array,
    required: true
  },
  page: {
    type: Number,
    default: 1
  },
  perPage: {
    type: Number,
    default: 6
  },
  categories: {
    type: String,
    default: null
  },
  tags: {
    type: String,
    default: null
  }
})
</script>

<template>
  <section class="page-container grid grid-cols-2">
    <NewsPosts
      :posts="posts"
      :page="page"
      :per-page="perPage"
      :categories="categories"
      :tags="tags"
    />
    <NewsPressCorner />
  </section>
</template>

