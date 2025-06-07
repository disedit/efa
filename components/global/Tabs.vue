<script setup>
defineProps({ block: Object })

const selectedTab = ref(null)

const selectTab = (index) => {
  selectedTab.value = (selectedTab.value === index) ? null : index
}
</script>

<template>
  <section class="page-container">
    <div class="stacked tabs">
      <ElementsStackedTab
        v-for="(tab, i) in block.tabs"
        :key="i"
        @selected="selectTab(i)"
        :class="[`tab-${i + 1}`, { selected: selectedTab === i }]"
      >
        <template #label>
          <h2>{{ tab.label }}</h2>
        </template>
        <div v-html="tab.content" class="prose text-base max-w-[70ch] mx-auto" />
      </ElementsStackedTab>
    </div>
  </section>
</template>

<style lang="scss">
.stacked.tabs {
  position: relative;
  height: 550px;

  .tab {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transition: .5s ease;

    &.selected {
      margin-bottom: 1rem !important;
    }

    &-label:hover,
    &.selected .tab-label {
      padding-bottom: calc(var(--spacing) * 4);
      margin-top: calc(var(--spacing) * -2);
    }

    &:has(.tab-label:hover) {
      
    }

    &-content {
      height: 400px;
    }
  }

  .tab.tab-2 {
    top: 1.5rem;
    z-index: 20;

    .tab-label {
      margin-left: 39%;
    }
  }

  .tab.tab-3 {
    top: 3rem;
    z-index: 30;

    .tab-label {
      margin-left: 75%;
    }
  }

  .tab.tab-4 {
    top: 4.5rem;
    z-index: 40;

    .tab-label {
      margin-left: 20%;
    }
  }

  .tab.tab-5 {
    top: 6rem;
    z-index: 50;

    .tab-label {
      margin-left: 57%;
    }
  }

  .prose ol li {
    display: flex;
    margin-bottom: 1em;
    gap: .5em;
    align-items: center;

    &::before {
      content: counter(step-counter);
      display: block;
      background: var(--color-secondary);
      color: var(--color-white);
      align-self: flex-start;
      font-size: var(--text-lg);
      font-weight: 600;
      height: 2em;
      width: 2em;
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
  }
}
</style>
