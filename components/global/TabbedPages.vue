<script setup>
const props = defineProps({ block: Object, context: Object })

const { page, subpages } = useUtils()
const children = subpages(props.context)

const router = useRouter()
onMounted(() => {
  if (!props.block.content && children.length > 0) {
    router.push(page(children[0].url))
  }
})
</script>

<template>
  <section class="page-container">
    <ElementsTabbedPages
      :menu="context.menu"
      :disable-top-level="block.disable_top_level"
    >
      <UtilsBlocks
        v-if="block.content"
        :blocks="block.content"
        :context="context"
      />
    </ElementsTabbedPages>
  </section>
</template>
