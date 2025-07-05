<script setup>
defineProps({
  posts: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="bg-true-white bordered divide-primary divide-y-(--border-width)">
    <NuxtLink
      v-for="post in posts"
      :key="post.id"
      :to="`/news/${post.slug}`"
      class="flex gap-3 p-3 hover:bg-primary hover:text-true-white transition-colors duration-200 items-center min-h-[6em]"
    >
      <NuxtPicture
        v-if="post.thumbnail?.url"
        :src="post.thumbnail.url"
        :alt="post.thumbnail.alt"
        sizes="200px"
        :img-attrs="{ class: 'aspect-square w-[4rem] object-cover' }"
        class="shrink-0"
      />
      <span class="font-bold text-base leading-none">{{ post.title }}</span>
    </NuxtLink>
  </div>
</template>
