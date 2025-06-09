<script setup>
defineProps({
  links: {
    type: Array,
    required: true
  }
})

const { link } = useUtils()
</script>

<template>
  <ul class="flex gap-2">
    <li v-for="(item, i) in links" :key="i">
      <NuxtLink
        :to="link(item.link)"
        class="text-sm underlined-to-bold"
      >
        {{ item.link.title }}
      </NuxtLink>
    </li>
  </ul>
</template>
