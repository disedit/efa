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
  <article>
    <NuxtLink
      :to="`/news/${post.slug}`"
      class="flex group gap-site"
    >
      <NuxtPicture
        v-if="post.thumbnail"
        :src="post.thumbnail"
        :alt="post.title"
        :img-attrs="{ class: 'aspect-square w-[20rem] object-cover' }"
        class="shrink-0"
      />
      <div class="flex flex-col gap-site">
        <div class="flex gap-site items-center justify-between text-sm font-medium">
          <NewsCategory :category="postCategory" />
          {{ humanDate(post.date) }}
        </div>
        <h2 class="font-extrabold leading-[1] group-hover:underline text-lg">
          {{ post.title }}
        </h2>
        <div class="text-sm mt-auto" v-html="post.excerpt" />
      </div>
      
    </NuxtLink>
  </article>
</template>
