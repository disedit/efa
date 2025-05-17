<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})

const { link, isActive } = useUtils()

// Handle submeus
const hovering = ref(null)
const gracePeriod = ref(false)

function toggleHover (id) {
  if (hovering.value === id) {
    hovering.value = null
  } else {
    hovering.value = id
  }
}

function hover(id) {
  if (!gracePeriod.value) {
    hovering.value = id
  }
}

function unhover() {
  hovering.value = null
  gracePeriod.value = true
  setTimeout(() => {
    gracePeriod.value = false
  }, 1000)
}
</script>

<template>
  <ul class="menu flex text-base font-medium" aria-label="Main navigation">
    <li
      v-for="(item, i) in items"
      :key="i"
      :class="['menu-item', { open: hovering === i}]"
      @mouseenter="hover(i)"
      @mouseleave="hovering = null"
    >
      <NuxtLink
        v-if="item.acf_fc_layout === 'submenu'"
        :to="link(item)"
        :aria-expanded="hovering === i ? 'true' : 'false'"
        @click.prevent="toggleHover(i)"
        :class="['menu-link has-submenu', { active: isActive(item) }]"
      >
        {{ item.label }}
      </NuxtLink>
      <NuxtLink
        v-else
        :to="link(item)"
        class="menu-link"
      >
        {{ item.label }}
      </NuxtLink>
      <ul v-if="item.acf_fc_layout === 'submenu'" class="submenu">
        <li v-for="(subitem, s) in item.pages" :key="s">
          <NuxtLink
            :to="link(subitem)"
            @click="unhover"
            class="submenu-link"
          >
            {{ subitem.label }}
          </NuxtLink>
        </li>
      </ul>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.submenu {
  position: absolute;
  visibility: hidden;
  transition: visibility 0s linear .2s, transform .2s ease;
  transform: translateY(-3px) scaleY(0);
  transform-origin: 0 0;
  will-change: visibility, opacity, transform;
  background-color: var(--color-white);
  border: 3px solid var(--color-primary);
  min-width: 250px;

  &-link {
    display: block;
    padding: .5em .5em;
    line-height: 1.1;
    font-size: 0.9em;

    &:hover {
      background-color: var(--color-primary);
      color: var(--color-white);
      font-weight: 700;
      letter-spacing: -.0225em;
    }
  }

  &:has(li:first-child .submenu-link:hover) {
    z-index: 1200;
  }
}

.menu {
  &-item {
    position: relative;
    display: block;

    &.open {
      .submenu {
        visibility: visible;
        transition-delay: 0s;
        transform: translateY(-3px) scaleY(1);
        z-index: 1000;
      }

      .menu-link {
        font-weight: 700;
        letter-spacing: -.0225em;
        z-index: 1100;

        &.has-submenu {
          border-color: var(--color-primary);
        }
      }
    }
  }

  &-link {
    display: block;
    position: relative;
    transition: .25s ease;
    padding: .25em .5em;
    border: 3px solid transparent;
    border-bottom: 0;
    background: var(--color-white);

    &:hover:not(.has-submenu) {
      text-decoration: underline;
      text-underline-offset: 0.2em;
      text-decoration-thickness: 3px;
    }

    &:hover,
    &.router-link-active,
    &.active {
      font-weight: 700;
      letter-spacing: -.0225em;
    }
  }
}
</style>