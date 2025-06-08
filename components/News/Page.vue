<script setup>
const props = defineProps({
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

const categoryIds = props.categories.map(category => category.id).join(', ')
const tagIds = props.tags.map(tag => tag.id).join(', ')
const categoryNames = props.categories.map(category => category.name).join(', ')
const tagNames = props.tags.map(tag => tag.name).join(', ')
</script>

<template>
  <PageHeader :block="{ heading: 'News', introduction: categoryNames + ' ' + tagNames }" />
  <NewsPostsWithPressCorner
    :posts="posts"
    :page="page"
    :per-page="perPage"
    :categories="categoryIds"
    :tags="tagIds"
  />
</template>
