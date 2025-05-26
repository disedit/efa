<template>
  <article class="flex flex-col">
    <div class="relative bg-true-white w-fit border-3 border-b-0 text-primary font-bold text-md py-2 px-site z-10 tracking-tight">
      <slot name="label" />
    </div>
    <div class="bg-true-white border-3 border-primary p-site relative z-1 -translate-y-[3px] h-full -mb-[3px]">
      <slot />
    </div>
  </article>
</template>

<style lang="scss" scoped>

</style>