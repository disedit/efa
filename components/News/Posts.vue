<script setup>
defineProps({
  posts: {
    type: Array,
    required: true
  },
  page: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
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
  <div>
    <NewsPost
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
    Pagination:
    <NewsPagination
      :total="posts.length"
      :page="page"
      :per-page="perPage"
      :categories="categories"
      :tags="tags"
    />
  </div>
</template>

