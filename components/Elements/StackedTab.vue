<script setup>
defineEmits(['selected'])
</script>

<template>
  <article class="tab flex flex-col">
    <button
      class="
        tab-label relative bg-true-white w-fit bordered border-b-0 text-primary font-bold text-md
        py-2 px-site z-10 tracking-tight cursor-pointer transition-all text-nowrap
      "
      @click="$emit('selected')"
    >
      <slot name="label" />
    </button>
    <div class="tab-content bg-true-white bordered p-12 relative z-1 -translate-y-(--border-width) h-full -mb-(--border-width)">
      <slot />
    </div>
  </article>
</template>

<style lang="scss" scoped>

</style>