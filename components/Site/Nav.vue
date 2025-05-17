<script setup>
import { breakpointsTailwind } from '@vueuse/core'
const settings = await useSettings()
const { link } = useUtils()

/* Hide/Show nav bar on scorll */
const breakpoints = useBreakpoints(breakpointsTailwind)
const isMobile = breakpoints.smaller('xl')
const { y } = useWindowScroll()
const showNavbar = ref(true)
const lastScrollPosition = ref(0)

watch(y, (currentScrollPosition) => {
  if (currentScrollPosition < 0 || Math.abs(currentScrollPosition - lastScrollPosition.value) < 60) {
    return
  }
  showNavbar.value = currentScrollPosition < lastScrollPosition.value
  lastScrollPosition.value = currentScrollPosition
})

/* Mobile menu */
const { setMenuOpen, unsetMenuOpen } = useColorMode()
const menuOpen = ref(false)
const showMenu = () => {
  menuOpen.value = true
  setMenuOpen()
}

const hideMenu = (index) => {
  menuOpen.value = false
  unsetMenuOpen()
}

function toggleMenu () {
  if (menuOpen.value) {
    hideMenu()
  } else {
    showMenu()
  }
}
</script>

<template>
  <nav
    :class="[
      'efa-nav fixed flex bg-white top-0 left-0 right-0 px-site py-site xl:py-2 justify-between items-center gap-site transition duration-[.5s] ease-out z-[5000]',
      { '-translate-y-[100%]': !showNavbar && !isMobile }
    ]"
  >
    <NuxtLink to="/" class="logo text-primary" aria-label="European Free Alliance">
      <LogoEFA class="h-[2rem]" />
    </NuxtLink>
    <SiteNavMenu :items="settings.menu" class="hidden xl:flex" />
    <div class="gap-site items-center hidden xl:flex">
      <SiteNavSocials :items="settings.socials" />
      <UtilsButton
        v-if="settings.menu_cta.label"
        :to="link(settings.menu_cta)"
        class="text-base"
      >
        {{ settings.menu_cta.label }}
      </UtilsButton>
    </div>
    <button
      @click="toggleMenu"
      :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
      aria-controls="mainNav"
      :aria-expanded="menuOpen ? 'true' : 'false'"
      class="flex xl:hidden text-primary p-2 -m-2"
    >
      <IconHamburger v-if="!menuOpen" class="h-[1.75rem] w-[1.75rem]" />
      <IconClose v-else class="h-[1.5rem] w-[1.5rem]" />
    </button>
  </nav>
  <SiteNavMobileMenu
    :open="menuOpen"
    :menu="settings.menu"
    :socials="settings.socials"
    :cta="settings.menu_cta"
    @hide="hideMenu"
  />
  <div class="h-navbar" />
</template>
