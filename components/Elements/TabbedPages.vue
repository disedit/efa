<script setup>
defineProps({ menu: Array })
const { page } = useUtils()
</script>

<template>
  <div class="grid grid-cols-2">
    <nav>
      <ul class="flex space-x-4">
        <li v-for="item in menu" :key="item.id">
          <NuxtLink :to="page(item.url)">
            {{ item.title }}
          </NuxtLink>
          <ul v-if="item.children">
            <li v-for="child in item.children" :key="`${item.id}-${child.id}`">
              <NuxtLink :to="page(child.url)">
                {{ child.title }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <div>
      <slot />
    </div>
  </div>
</template>

<style>

</style>