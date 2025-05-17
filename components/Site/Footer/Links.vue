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
        :to="link(item)"
        class="text-sm underline hover:font-bold hover:-tracking-[0.0225em]"
      >
        {{ item.label }}
      </NuxtLink>
    </li>
  </ul>
</template>
