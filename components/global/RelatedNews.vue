<script setup>
const props = defineProps({ block: Object })

const { $wp } = useNuxtApp()

const { data: posts } = await useAsyncData(
  `news-tags-${props.block.tags.join('-')}`, () => $wp.news()
    .param('tags', props.block.tags.join(','))
    .param('per_page', 2)
)
</script>

<template>
  <section class="page-container">
    <h2>Related News</h2>
    <NuxtLink
      :to="`/news/page/1/?tags=${props.block.tags.join(',')}`"
    >
      More
    </NuxtLink>
    <NewsHighlightedPosts :posts="posts.posts" />
  </section>
</template>
