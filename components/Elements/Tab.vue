<script setup>
defineProps({
  rises: {
    type: Boolean,
    default: false
  },
  labelSize: {
    type: String,
    default: 'md'
  }
})
</script>

<template>
  <article :class="['tab flex flex-col', { rises }]">
    <div :class="[
      'tab-label relative flex gap-site items-center z-10',
      {
        'text-md': labelSize === 'md',
        'text-base': labelSize === 'base',
      }
    ]">
      <div :class="[
        'flex items-center gap-2 bg-true-white w-fit border-3 border-b-0 text-primary font-bold tracking-tight',
        {
          'py-2 px-site': labelSize === 'md',
          'py-1 px-site': labelSize === 'base',
        }
      ]">
        <slot name="label" />
      </div>
      <div class="ms-auto font-medium">
        <slot name="extra" />
      </div>
    </div>
    <div class="relative h-full flex">
      <div class="tab-content bg-true-white border-3 border-primary p-site relative z-1 h-full">
        <slot />
      </div>
      <div class="tab-shadow tab-shadow-1" />
      <div class="tab-shadow tab-shadow-2" />
    </div>
  </article>
</template>

<style lang="scss" scoped>
.tab {
  --shift-by: 1.5rem;
  --label-offset: 3px;

  &.rises:hover {
    .tab-label {
      transform: translate(calc(var(--shift-by) * -1), calc(var(--shift-by) * -1));
    }

    .tab-content {
      transform: translate(calc(var(--shift-by) * -1), calc((var(--shift-by) + var(--label-offset)) * -1));
    }

    .tab-shadow-1 {
      transform: translate(calc(var(--shift-by) / 2 * -1), calc((var(--shift-by) + var(--label-offset)) / 2 * -1));
      opacity: 1;
    }

    .tab-shadow-2 {
      opacity: 1;
    }
  }

  &.rises:active {
    .tab-label {
      transform: translate(calc(var(--shift-by) / 2 * -1), calc(var(--shift-by) / 2 * -1));
    }

    .tab-content {
      transform: translate(calc(var(--shift-by) / 2 * -1), calc((var(--shift-by) + (var(--label-offset) * 2)) / 2 * -1));
    }

    .tab-shadow-1 {
      transform: translate(calc(var(--shift-by) / 4 * -1), calc((var(--shift-by) + (var(--label-offset) * 4)) / 4 * -1));
    }
  }

  .tab-label {
    transition: .25s ease;
  }

  .tab-content {
    position: relative;
    z-index: 5;
    transition: .25s ease;
    transform: translateY(calc(var(--label-offset) * -1));
    margin-bottom: calc(var(--label-offset) * -1);
  }

  .tab-shadow {
    position: absolute;
    inset: 0;
    border: 3px solid var(--color-primary);
    background: var(--color-true-white);
    transition: .25s ease;
    transform: translateY(calc(var(--label-offset) * -1));
    opacity: 0;

    &-1 {
      z-index: 2;
    }

    &-2 {
      z-index: 1;
    }
  }
}
</style>