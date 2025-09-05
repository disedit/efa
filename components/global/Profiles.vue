<script setup>
const props = defineProps({ block: Object, context: Object })

const { $wp } = useNuxtApp()

const key = props.block.populate_with ? 'populate' : 'ids'
const value = props.block.populate_with ? props.block.populate_with.join(',') : props.block.profiles.join(',')
const { data: profiles } = await useAsyncData(
  `profiles-${value}`, () => $wp.profiles().param(key, value)
)
</script>

<template>
  <section class="page-container profiles grid gap-site md:gap-10">
    <ElementsProfile
      v-for="profile in profiles"
      :key="profile.id"
      :profile="profile"
    />
  </section>
</template>

<style lang="scss" scoped>
.profiles {
  grid-template-columns: repeat(auto-fill, minmax(var(--min-card-width, 10rem), 1fr));
}

@media (min-width: 12rem) {
  .profiles {
    --min-card-width: 16rem;
  }
}

@media (min-width: 42rem) {
  .profiles {
    --min-card-width: 20rem;
  }
}

@media (min-width: 100rem) {
  .profiles {
    --min-card-width: 24rem;
  }
}
</style>