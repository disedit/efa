<script setup>
const props = defineProps({
  total: {
    type: Number,
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
    <NuxtLink
      v-if="page > 1"
      :to="`/news/page/${page - 1}/?categories=${categories || ''}&tags=${tags || ''}`"
    >
      Previous Page
    </NuxtLink>
    <span v-else />
    <NuxtLink
      v-if="total >= perPage"
      :to="`/news/page/${page + 1}/?categories=${categories || ''}&tags=${tags || ''}`"
    >
      Next Page
    </NuxtLink>
    <span v-else />
  </div>
</template>
