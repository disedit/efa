<script setup>
const props = defineProps({
  error: Object
})
</script>

<template>
  <div class="p-site h-viewport flex flex-col text-base md:text-md gap-site text-purple">
    <NuxtLink to="/" label="European Free Alliance">
      <LogoEFA class="h-[2rem] md:h-[2.5rem]" />
    </NuxtLink>
    <div class="font-extrabold text-4xl leading-[1] uppercase">
      <div>{{ error.statusCode }}</div>
      <h1>{{ error.message }}</h1>
    </div>

    <div class="mt-auto font-medium">
      <NuxtLink to="/" class="underlined-on-hover">Go back</NuxtLink>
    </div>
  </div>
</template>