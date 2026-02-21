<script setup>
defineProps({ block: Object })

useHead({
  script: [
    {
      src: 'https://server.fillout.com/embed/v1/',
      async: true,
    },
  ],
})
</script>

<template>
  <section class="page-container google-forms text-blackish">
    <div
      v-if="block.embed_type === 'popup'"
      :data-fillout-id="block.fillout_form_id"
      data-fillout-embed-type="popup"
      :data-fillout-button-text="block.button_text || 'Open Form'"
      data-fillout-dynamic-resize
      data-fillout-button-color="#773E90"
      data-fillout-button-size="large"
      data-fillout-inherit-parameters
      data-fillout-popup-size="medium"
    />
    <div
      v-else-if="block.embed_type === 'fullscreen'"
      style="position:fixed; top:0px; left:0px; right:0px; bottom:0px;">
      <div
        :data-fillout-id="block.fillout_form_id"
        data-fillout-embed-type="fullscreen"
        style="width:100%; height:100%;"
        data-fillout-inherit-parameters
      />
    </div>
    <div
      v-else-if="block.embed_type === 'slider'"
      :data-fillout-id="block.fillout_form_id"
      data-fillout-embed-type="slider"
      :data-fillout-button-text="block.button_text || 'Open form'"
      data-fillout-button-color="#773E90"
      data-fillout-button-size="large"
      data-fillout-slider-direction="right"
      data-fillout-inherit-parameters
      data-fillout-popup-size="medium"
    />
    <div
      v-else
      style="width:100%; height:500px;"
      :data-fillout-id="block.fillout_form_id"
      data-fillout-embed-type="standard"
      data-fillout-inherit-parameters
      data-fillout-dynamic-resize
    />
  </section>
</template>
