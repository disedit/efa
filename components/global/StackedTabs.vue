<script setup>
defineProps({ block: Object, context: Object })

const tabs = ref(null)
const selectedTab = ref(null)
const transitioning = ref(false)
const vertical = ref(false)

const scrollIntoView = (index) => {
  selectedTab.value = (selectedTab.value) ? null : index
  nextTick(() => {
    const selectedTab = tabs.value.querySelector(`.tab-${index}`)
    tabs.value.scrollLeft = selectedTab.offsetLeft - (tabs.value.offsetWidth / 2) + (selectedTab.offsetWidth / 2)
  })
}

const selectTab = (index) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || prefersReducedMotion) {
    vertical.value = true
    scrollIntoView(index)
    return
  }

  transitioning.value = true

  nextTick(() => {
    document.startViewTransition(() => {
      scrollIntoView(index)

      setTimeout(() => {
        transitioning.value = false
      }, 500)
    })
  })  
}
</script>

<template>
  <section>
    <div ref="tabs" :class="['tab stacked-tabs', { stacked: !selectedTab, open: !!selectedTab, vertical }]">
      <ElementsStackedTab
        v-for="(tab, i) in block.tabs"
        :key="i"
        @selected="selectTab(i + 1)"
        :class="[`tab-${i + 1}`, { selected: selectedTab === i + 1 }]"
        :style="transitioning ? {
          'view-transition-name': `tab-${i + 1}`
        } : null"
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
.stacked-tabs {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 6);
  padding-block: calc(var(--spacing-inner) / 2);
  padding-inline: calc(((100vw - var(--breakpoint-3xl)) / 2) + var(--spacing-inner));
  --tab-height: 35rem;
  scroll-behavior: smooth;

  .tab {
    transition: .5s ease;
    height: var(--tab-height);
    flex-shrink: 0;

    &-content {
      display: flex;
      align-items: center;
    }
  }

  &.stacked {
    .tab:has(.tab-label:hover):not(:last-child) {
      margin-bottom: calc(var(--tab-height) / 4);
    }

    .tab:not(:first-child) {
      margin-top: calc(var(--tab-height) * -1);
    }

    .tab-label:hover,
    .tab.selected .tab-label {
      padding-bottom: calc(var(--spacing) * 4);
      margin-top: calc(var(--spacing) * -2);
    }

    .tab.tab-2 {
    .tab-label {
        margin-left: 39%;
      }
    }

    .tab.tab-3 {
      .tab-label {
        margin-left: 75%;
      }
    }

    .tab.tab-4 {
      .tab-label {
        margin-left: 20%;
      }
    }

    .tab.tab-5 {
      .tab-label {
        margin-left: 57%;
      }
    }
  }

  &.open {
    overflow: auto;

    &:not(.vertical) {
      flex-direction: row;
    }
  }
}

@media (max-width: 46rem) {
  .stacked-tabs {
    --tab-height: 28rem;

    &.stacked {
      padding: var(--spacing-site);
      
      .tab-label:hover,
      .tab.selected .tab-label {
        padding-bottom: calc(var(--spacing) * 2);
        margin-top: 0;
      }

      .tab:not(:first-child) {
        margin-top: calc(var(--tab-height) * -0.93);
      }

      .tab:has(.tab-label:hover):not(:last-child) {
        margin-bottom: 0;
      }

      .tab.tab-3 {
        .tab-label {
          margin-left: 37%;
        }
      }

      .tab.tab-5 {
        .tab-label {
          margin-left: 47%;
        }
      }
    }

    &.open {
      padding-inline: var(--spacing-inner);

      .tab {
        width: 80vw;
      }
    }
  }
}

.stacked-tabs {
  .prose ol {
    padding-left: 0;
    margin-left: 0;
    counter-reset: step-counter;

    li {
      display: flex;
      margin-bottom: 1em;
      gap: .5em;
      align-items: center;
      text-wrap: balance;
      counter-increment: step-counter;

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
}
</style>
