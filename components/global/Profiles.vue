<script setup>
const props = defineProps({ block: Object })

const { $wp } = useNuxtApp()

const key = props.block.populate_with ? 'populate' : 'ids'
const value = props.block.populate_with.join(',') || props.block.profiles.join(',')
const { data: profiles } = await useAsyncData(
  `profiles-${value}`, () => $wp.profiles().param(key, value)
)
</script>

<template>
  <section class="page-container profiles grid gap-10">
    <ElementsProfile
      v-for="profile in profiles"
      :key="profile.id"
      :profile="profile"
    />
  </section>
</template>

<style lang="scss" scoped>
.profiles {
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
}
</style>