<script setup>
defineProps({
  menu: {
    type: Array,
    required: true,
  },
  disableTopLevel: {
    type: Boolean,
    default: false
  }
})

const { page, isActive } = useUtils()
const showSubmenuOf = ref(null)

function toggleSubmenu(id) {
  if (showSubmenuOf.value === id) {
    showSubmenuOf.value = null
  } else {
    showSubmenuOf.value = id
  }
}
</script>

<template>
  <div class="grid md:grid-cols-[18rem_1fr] tabbed-pages">
    <nav>
      <ul :class="['flex flex-wrap md:flex-col gap-2 sticky top-navbar', { 'nav-top-level': disableTopLevel, 'nav-second-level': !disableTopLevel }]">
        <li v-for="item in menu" :key="item.id">
          <a
            v-if="disableTopLevel"
            :href="page(item.url)"
            :class="[
              'underlined-on-hover',
              { 'active': (isActive(item, 1) && showSubmenuOf === null) || showSubmenuOf === item.id },
              { 'hidden md:block': disableTopLevel }
            ]"
            @click.prevent="toggleSubmenu(item.id)"
          >
            {{ item.title }}
          </a>
          <NuxtLink
            v-else
            :to="page(item.url)"
            :class="{ 'active': isActive(item, 1) }"
          >
            {{ item.title }}
          </NuxtLink>
          <Transition name="submenu">
            <div v-if="item.children && item.children.length && ((isActive(item, 1) && showSubmenuOf === null) || showSubmenuOf === item.id)">
              <ul :class="['flex flex-wrap md:flex-col gap-2', { 'nav-second-level': disableTopLevel, 'nav-third-level': !disableTopLevel }]">
                <li v-for="child in item.children" :key="`${item.id}-${child.id}`">
                  <NuxtLink :to="page(child.url)" :class="{ 'active': isActive(child, 2) }">
                    {{ child.title }}
                  </NuxtLink>
                  <ul v-if="child.children && child.children.length && isActive(child, 2)" class="nav-third-level flex flex-wrap gap-1">
                    <li v-for="grandchild in child.children" :key="`${item.id}-${child.id}-${grandchild.id}`">
                      <NuxtLink :to="page(grandchild.url)" :class="{ 'active': isActive(grandchild, 3) }">
                        {{ grandchild.title }}
                      </NuxtLink>
                    </li>
                  </ul>
                </li>
              </ul>
          </div>
          </Transition>
        </li>
      </ul>
    </nav>
    <div class="flex flex-col gap-site md:gap-8">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-top-level {
  & > li > a {
    font-size: var(--text-base);
    font-weight: 600;
    padding: .25em 0;

    &.active {
      font-weight: 900;
    }
  }

  & > li:first-child > a {
    padding-top: 0;
  }
}

.nav-second-level {
  margin-bottom: 1.5rem;

  & > li {
    & > a {
      display: inline-block;
      background-color: var(--color-cream);
      padding: .25em .75em;
      font-weight: 600;
      font-size: var(--text-sm);
      border: 1.5px var(--color-cream) solid;
      transition: .25s ease;

      &:hover {
        background-color: var(--color-true-white);
        border-color: var(--color-primary);
      }

      &.active {
        font-weight: 800;
        background-color: var(--color-primary);
        color: var(--color-true-white);
        border-color: var(--color-primary);
      }
    }
  }
}

.nav-third-level {
  margin: .25rem 0 .75rem;

  & > li > a {
    display: inline-block;
    background-color: var(--color-true-white);
    padding: .25em .75em;
    font-weight: 500;
    font-size: var(--text-sm);
    border: 1.5px var(--color-true-white) solid;
    transition: .25s ease;

    &:hover {
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    
    &.active {
      font-weight: 800;
      border-color: var(--color-primary);
    }
  }
}

.submenu-enter-active,
.submenu-leave-active {
  transition: .5s ease;
  overflow: hidden;
  max-height: 400px;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}
</style>