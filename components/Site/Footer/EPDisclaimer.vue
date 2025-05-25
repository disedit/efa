<script setup>
defineProps({
  disclaimer: { type: String, required: true }
})
</script>

<template>
  <div class="flex gap-2 items-end text-sm max-w-[90ch] leading-tighter">
    <img src="~/assets/images/EP.svg" alt="European Parliament" class="h-[3rem]" />
    <div>
      {{ disclaimer }}
    </div>
  </div>
</template>
