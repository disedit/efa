<script setup>
const props = defineProps({ block: Object })

const { $wp } = useNuxtApp()

const { data: posts } = await useAsyncData(
  `news-${props.block.categories.join('-')}`, () => $wp.news()
    .param('categories', props.block.categories.join(','))
    .param('per_page', 10)
)

const firsTwoPosts = posts.value.posts.slice(0, 2)
const restOfPosts = posts.value.posts.slice(2)
</script>

<template>
  <section class="page-container">
    <NewsHighlightedPosts :posts="firsTwoPosts" class="mb-20" />
    <NewsPostsWithPressCorner
      :posts="restOfPosts"
      :per-page="8"
      :categories="props.block.categories.join(',')"
    />
  </section>
</template>
