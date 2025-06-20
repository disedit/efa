<script setup>
const props = defineProps({ block: Object, context: Object })
const { page, subpages } = useUtils()
const children = subpages(props.context)
</script>

<template>
  <ul :class="[
    'grid gap-site',
    {
      'grid-cols-2 md:grid-cols-4 lg:grid-cols-5': block.max_columns == 5,
      'grid-cols-2 md:grid-cols-3 lg:grid-cols-4': block.max_columns == 4,
      'md:grid-cols-3': block.max_columns == 3,
      'md:grid-cols-2': block.max_columns == 2,
      'page-container': !block.compact
    }
  ]">
    <li v-for="subpage in children" :key="subpage.id">
      <NuxtLink
        :to="page(subpage.url)"
        :class="[
          'flex bg-(--bg-color) text-(--text-color) hover:bg-(--bg-color-hover) p-site text-lg font-bold leading-[1.1]',
          `color-${block.color}`,
          {
            'pt-42': !block.compact && !subpage.children,
            'pt-24': !block.compact && subpage.children,
            'pt-12': block.compact,
          }
        ]"
      >
        {{ subpage.title }}
      </NuxtLink>
      <div v-if="subpage.children">
        <ul class="flex flex-wrap gap-site mt-site">
          <li v-for="child in subpage.children" :key="child.id">
            <NuxtLink
              :to="page(child.url)"
              :class="['flex bg-cream hover:bg-true-white text-primary p-site text-md font-semibold border-width border-cream hover:border-primary pt-12 leading-[1.1]', `color-${block.color}`]"
            >
              {{ child.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>
