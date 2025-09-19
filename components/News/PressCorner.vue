<script lang="ts" setup>
const settings = await useSettings()
</script>

<template>
  <div class="bg-cream p-site md:p-6 text-primary self-start text-sm">
    <h2 class="text-lg font-extrabold leading-none mb-1">
      {{ settings.press_corner.title }}
    </h2>
    <p class="mb-24 text-base font-medium leading-tight">
      {{ settings.press_corner.text }}
    </p>
    <a
      :href="`mailto:${settings.press_corner.email}`"
      class="flex items-center gap-2 mb-2"
    >
      <Icon name="ri:mail-line" />
      <span class="underlined-to-bold">{{ settings.press_corner.email }}</span>
    </a>
    <a
      :href="`tel:${settings.press_corner.phone}`"
      class="flex items-center gap-2 mb-2"
    >
      <Icon name="ri:phone-fill" />
      <span class="underlined-to-bold">{{ settings.press_corner.phone }}</span>
    </a>
    <a
      v-if="settings.press_corner.file"
      :href="settings.press_corner.file.url"
      download
      class="flex items-center gap-2"
    >
      <Icon name="ri:download-cloud-2-line" />
      <span class="underlined-to-bold">Press kit</span>
    </a>
  </div>
</template>