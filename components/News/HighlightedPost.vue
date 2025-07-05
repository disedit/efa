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
  <NuxtLink
    :to="`/news/${post.slug}`"
    class="flex"
  >
    <ElementsTab rises label-size="base" class="w-full">
      <template #label>
        <NewsCategory :category="postCategory" />
      </template>
      <template #extra>
        {{ humanDate(post.date) }}
      </template>
      <div class="flex flex-col gap-site h-full">
        <NuxtPicture
          v-if="post.thumbnail?.url"
          :src="post.thumbnail.url"
          :alt="post.thumbnail.alt"
          :img-attrs="{ class: 'aspect-[16/7] w-full object-cover' }"
          sizes="100vw md:1200px"
        />
        <h2
          :class="[
            'font-extrabold leading-[1]',
            { 'text-lg': !!post.thumbnail?.url, 'text-2xl': !post.thumbnail?.url }
          ]"
        >
          {{ post.title }}
        </h2>
        <p class="text-sm mt-auto">
          <span v-html="post.excerpt" />
          {{ ' ' }}
          <u>Read more</u>
        </p>
      </div>
    </ElementsTab>
  </NuxtLink>
</template>
