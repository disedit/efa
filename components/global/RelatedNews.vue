<script setup>
const props = defineProps({ block: Object, context: Object })

const { $wp } = useNuxtApp()

const { data: posts } = await useAsyncData(
  `news-tags-${props.block.tags.join('-')}`, () => $wp.news()
    .param('tags', props.block.tags.join(','))
    .param('per_page', 2)
)
</script>

<template>
  <section class="page-container">
    <div class="flex items-center justify-between gap-site text-primary mb-6">
      <h2 class="text-md font-bold">
        Related News
      </h2>
      <NuxtLink
        :to="`/news/page/1/?tags=${props.block.tags.join(',')}`"
        class="flex items-center gap-1 font-medium text-base underlined-on-hover"
      >
        More
        <Icon name="ri:arrow-right-line" />
      </NuxtLink>
    </div>
    <NewsHighlightedPosts :posts="posts.posts" />
  </section>
</template>
