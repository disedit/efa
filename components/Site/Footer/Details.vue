<script setup>
defineProps({
  address: { type: String, required: true },
  socials: { type: Array, required: true }
})
</script>

<template>
  <div class="flex flex-col gap-10">
    <div>
      <LogoForAll class="h-[9rem]" />
    </div>
    
    <div>
      <div class="flex items-center gap-2">
        <LogoEFAMark class="h-[1.5rem]" />
        <span class="text-[2rem] font-bold">EFA</span>
      </div>

      <div v-html="address" class="prose text-base leading-tight" />
    </div>

    <UtilsSocials :socials="socials" class="text-md" />
  </div>
</template>

<style>

</style>