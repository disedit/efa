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
  <section class="grid gap-site md:gap-12 md:grid-cols-[1fr_28rem]">
    <NewsPosts
      :posts="posts"
      :page="page"
      :per-page="perPage"
      :categories="categories"
      :tags="tags"
    />
    <aside class="sticky top-navbar">
      <NewsPressCorner />
    </aside>
  </section>
</template>
