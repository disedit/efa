<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const { humanDate } = useDate()
const { category } = useUtils()
const postCategory = category(props.post)
</script>

<template>
  <article class="post">
    <NuxtLink
      :to="`/news/${post.slug}`"
      class="flex flex-col md:flex-row group gap-site border-b-2 pb-8 md:pb-0 mb-4 md:mb-0 md:border-b-0"
    >
      <NuxtPicture
        v-if="post.thumbnail?.url"
        :src="post.thumbnail.url"
        :alt="post.thumbnail.alt"
        :img-attrs="{ class: 'aspect-[16/7] md:aspect-square w-full md:w-[20rem] object-cover' }"
        class="shrink-0"
        sizes="100vw md:1200px"
      />
      <div class="flex flex-col gap-site">
        <div class="flex gap-site items-center justify-between text-base md:text-sm font-medium">
          <NewsCategory :category="postCategory" />
          {{ humanDate(post.date) }}
        </div>
        <h2 class="font-extrabold leading-[1] group-hover:underline text-xl md:text-lg">
          {{ post.title }}
        </h2>
        <div class="text-base md:text-sm mt-auto" v-html="post.excerpt" />
      </div>
    </NuxtLink>
  </article>
</template>

<style lang="scss" scoped>
.post {
  animation: fly-in ease both;
  animation-timeline: view();
  animation-range: 0% 35%;
}

@keyframes fly-in {
  from {
    transform: translateY(15%);
  }
  to {
    transform: translateY(0);
  }
}
</style>