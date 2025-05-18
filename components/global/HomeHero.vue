<script setup>
const props = defineProps({ block: Object })
const img = useImage()
const backgroundStyles = computed(() => {
  const imgUrl = img(props.block.background?.url, { width: 1200 })
  return { backgroundImage: `url('${imgUrl}')` }
})
</script>

<template>
  <header
    :class="[
      'min-h-safest-viewport flex flex-col bg-primary mx-site bg-cover p-site md:p-24',
      {
        'justify-start': block.position === 'top',
        'justify-center': block.position === 'center',
        'justify-end': block.position === 'end',
      }
    ]"
    :style="backgroundStyles"
  >
    <h1 class="font-extrabold text-4xl selection-orange md:max-w-[50%]">
      <span
        :class="[
          'px-[.35em] py-[.15em] box-decoration-clone leading-[1.1]',
          {
            'text-purple': block.text_pill === 'transparent',
            'text-purple bg-white': block.text_pill === 'white',
            'text-white bg-purple': block.text_pill === 'purple',
            'text-white bg-orange': block.text_pill === 'orange',
            'text-purple bg-cream': block.text_pill === 'cream',
          }
        ]"
      >
        {{ block.headline }}
      </span>
    </h1>
  </header>
</template>

<style>

</style>