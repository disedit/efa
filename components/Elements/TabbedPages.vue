<script setup>
defineProps({ menu: Array })
const { page, isActive } = useUtils()
</script>

<template>
  <div class="grid tabbed-pages">
    <nav>
      <ul class="flex flex-col nav-top-level sticky top-navbar">
        <li v-for="item in menu" :key="item.id">
          <NuxtLink :to="page(item.url)" :class="['underlined-on-hover', { 'active': isActive(item, 1) }]">
            {{ item.title }}
          </NuxtLink>
          <ul v-if="item.children && item.children.length && isActive(item, 1)" class="nav-second-level flex flex-col gap-2">
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
        </li>
      </ul>
    </nav>
    <div class="flex flex-col gap-site">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabbed-pages {
  grid-template-columns: 18rem 1fr;
}

.nav-top-level {
  & > li > a {
    display: block;
    font-size: var(--text-base);
    font-weight: 600;
    padding: .25em 0;

    &.active {
      font-weight: 900;
    }
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
</style>