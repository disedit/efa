<script setup>
defineProps({
  open: {
    type: Boolean,
    default: false
  },
  menu: {
    type: Array,
    required: true
  },
  socials: {
    type: Array,
    required: true
  },
  cta: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['hide'])

const { link } = useUtils()

/* Menu animations */
const { $gsap } = useNuxtApp()
let timeline

function beforeEnter(el) {
  $gsap.set(el, { y: '-100%' })
}

function onEnter(el, done) {
  $gsap.set('.mobile-menu .animate', { y: '100%' })
  $gsap.set('.decoration', { y: '150%' })
  timeline = $gsap.timeline()

  timeline.to(el, {
    y: 0,
    duration: .5,
    ease: 'power4.out',
  }).to('.mobile-menu .animate', {
    y: 0,
    duration: .25,
    ease: 'power4.out',
    stagger: .1
  }).to('.decoration', {
    y: 0,
    duration: 2,
    ease: 'power4.out',
    onComplete: done
  }, "-=1")
}

function onLeave (el, done) {
  timeline = $gsap.timeline()
  timeline.to('.mobile-menu .animate', {
    y: '100%',
    duration: .25,
    stagger: {
      amount: .25,
      from: 'end'
    },
  }).to(el, {
    y: '-100%',
    duration: .5,
    ease: 'power4.in'
  }).to('.decoration', {
    y: '100%',
    duration: .5,
    ease: 'power4.in',
    onComplete: done
  }, '<')
}

function onEnterCancelled() {
  timeline && timeline.kill()
}

function onLeaveCancelled() {
  timeline && timeline.kill()
}
</script>

<template>
  <Transition
    @before-enter="beforeEnter"
    @enter="onEnter"
    @enter-cancelled="onEnterCancelled"
    @leave="onLeave"
    @leave-cancelled="onLeaveCancelled">
    <nav
      id="mainNav"
      v-if="open"
      class="mobile-menu"
      aria-label="Main navigation"
    >
      <NuxtLink
        v-for="(item, i) in menu"
        :key="item.to"
        :to="link(item)"
        :data-hover="item.label"
        @click="emit('hide', i)">
        <div class="animate">{{ item.label }}</div>
      </NuxtLink>
      <a :href="link(cta)" target="_blank">
        <div class="animate">
          {{ cta.label }}
        </div>
      </a>
      <div class="menu-socials">
        <div class="animate">
          <SiteNavSocials :items="socials" class="text-white" />
        </div>
      </div>
      <div class="decoration-wrapper">
        <SiteLogoForAll class="decoration" />
      </div>
    </nav>
  </Transition>
</template>

<style lang="scss" scoped>
.mobile-menu {
  --color-focus: var(--color-orange);
  position: fixed;
  inset: 0;
  background: var(--color-primary);
  z-index: 2000;
  padding: var(--spacing-site);
  padding-top: calc(var(--spacing-navbar) + var(--spacing-site));
  flex-direction: column;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  a {
    position: relative;
    color: var(--color-white);
    text-decoration: none;
    font-size: var(--text-3xl);
    overflow: hidden;
    font-weight: 800;
    z-index: 5;

    &:active {
      color: var(--color-white);
    }
  }

  .decoration {
    position: absolute;
    bottom: 5%;
    right: -10%;
    color: var(--color-secondary);
    width: 80vw;
    height: 80vw;
    width: auto;
    transform: rotate(-5deg);
    z-index: 1;

    &-wrapper {
      position: absolute;
      inset: 0;
      overflow: hidden;
    }
  }

  .menu-socials {
    position: relative;
    margin: auto 0 0;
    z-index: 5;
    overflow: hidden;
    color: var(--color-beige);
    font-size: 1.75rem;

    .social-networks {
      gap: 1em;
    }

    :deep(a) {
      &:hover {
        color: var(--color-beige);
      }
    }
  }
}

.menu-socials {
  :deep(a) {
    color: var(--color-white);
    font-size: var(--text-md);
  }
}

@media (max-width: 46rem) {
  .mobile-menu {
    display: flex;
  }

  .menu-open {
    .nav {
      --text-color: var(--color-white);
      --border-color: transparent;
      background: transparent,
    }

    .logo-for-all {
      color: var(--color-white);
    }
  }

  .logo-for-all {
    height: 2rem;
    color: var(--color-primary);
  }
}
</style>