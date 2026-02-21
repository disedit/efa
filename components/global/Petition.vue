<script setup>
const props = defineProps({ block: Object })

// Get signature count from API
const { $wp } = useNuxtApp()
const { data: signatures, refresh } = await useLazyAsyncData(
  `signatures-${props.block.form_id}`, () => $wp.signatures().param('form_id', props.block.form_id).param('provider', props.block.form_provider)
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
  <section ref="container" class="page-container grid lg:grid-cols-[2fr_1fr] gap-inner text-blackish">
    <div class="lg:hidden">
      <PetitionsSignatures
        id="signatureCountMobile"
        v-if="signatures && signatures.count && signatures.count > block.signature_threshold"
        :count="signatures.count"
        :block="block"
        class="bordered"
      />
      <a href="#form" class="flex bg-primary text-white font-extrabold p-5 text-lg gap-2 justify-center items-center">
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
          <UtilsShare title="Share this petition!" :share-text="block.share_text" />
        </ClientOnly>
      </div>
    </div>
    <div id="form" class="flex flex-col gap-8">
      <ElementsTab label-size="base">
        <template #label>
          <Icon name="ri:pencil-ai-2-fill" /> Sign
        </template>
        <div v-if="signatures && signatures.count" class="hidden lg:block border-b-2 border-primary mb-2 -mx-site -mt-4 px-4 pb-2">
          <PetitionsSignatures
            id="signatureCountDesktop"
            v-if="signatures.count > block.signature_threshold"
            :count="signatures.count"
            :block="block"
          />
        </div>
        <FilloutForm
          v-if="block.form_provider === 'fillout'"
          :block="{ fillout_form_id: block.form_id, embed_type: 'standard' }"
          edge
        />
        <TallyForm
          v-else-if="block.form_provider === 'tally'"
          :block="{ tally_form_id: block.form_id }"
          edge
          class="p-5"
        />
      </ElementsTab>
    </div>
    <div class="lg:hidden">
      <ClientOnly>
        <UtilsShare title="Share this petition!" :share-text="block.share_text" />
      </ClientOnly>
    </div>
  </section>
</template>
