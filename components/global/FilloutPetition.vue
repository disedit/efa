<script setup>
const props = defineProps({ block: Object })

// Get signature count from API
const { $wp } = useNuxtApp()
const { data: signatures, refresh } = await useLazyAsyncData(
  `signatures-${props.block.fillout_form_id}`, () => $wp.signatures().param('form_id', props.block.fillout_form_id)
)
let interval

onMounted(() => {
  interval = setInterval(() => {
    refresh()
  }, 3000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>


<template>
  <section ref="container" class="page-container grid lg:grid-cols-[1.5fr_1fr] gap-inner text-blackish">
    <div class="lg:hidden">
      <PetitionsSignatures
        id="signatureCountMobile"
        v-if="signatures && signatures.count && signatures.count > block.signature_threshold"
        :count="signatures.count"
        :block="block"
      />
      <a href="#form" class="flex bg-primary text-white font-extrabold p-5 text-lg mt-4 rounded-md gap-2 justify-center items-center max-w-[34rem] mx-auto">
        <Icon name="ri:pencil-ai-2-fill" />
        Sign the petition!
      </a>
    </div>
    <div>
      <div
        v-html="block.petition_text"
        :class="['prose hyphens-auto text-pretty', {
          'text-purple': block.text_color === 'purple',
          'text-base': block.text_size === 'base',
          'text-md': block.text_size === 'large'
        }]"
      />
      <div class="hidden lg:block mt-8">
        <ClientOnly>
          <PetitionsShare :share-text="block.share_text" />
        </ClientOnly>
      </div>
    </div>
    <div id="form">
      <div v-if="signatures && signatures.count" class="hidden lg:block">
        <PetitionsSignatures
          id="signatureCountDesktop"
          v-if="signatures.count > block.signature_threshold"
          :count="signatures.count"
          :block="block"
        />
      </div>
      <FilloutForm :block="{ fillout_form_id: block.fillout_form_id, embed_type: 'standard' }" />
    </div>
    <div class="lg:hidden">
      <ClientOnly>
        <PetitionsShare :share-text="block.share_text" />
      </ClientOnly>
    </div>
  </section>
</template>
