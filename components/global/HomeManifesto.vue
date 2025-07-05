<script setup>
defineProps({ block: Object, context: Object })

const { $gsap, $ScrollTrigger, $emitter } = useNuxtApp()
const { setDark, unsetDark } = useColorMode()
const hover = ref(false)
const items = ref(null)
const wrapper = ref(null)
let animations
let scroller

function getScrollAmount() {
  const width = items.value.scrollWidth
  return -(width - window.innerWidth)
}

function getNavbarHeight() {
  const navbar = document.querySelector('.nav')
  return navbar.offsetHeight
}

onMounted(() => {
  setTimeout(() => {
    animations = $gsap.matchMedia()
    animations.add("(min-width: 992px)", () => {
      /* Horizontal scroll effect */
      const animation = $gsap.to(items.value, {
        x: getScrollAmount,
        duration: 3,
        ease: "none"
      })

      scroller = $ScrollTrigger.create({
        trigger: wrapper.value,
        start: `top ${getNavbarHeight()}`,
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation,
        scrub: 1,
        invalidateOnRefresh: true,
        onEnter: () => {
          unsetDark()
          $emitter.emit('video:pause', 'HomeVideo')
        },
        onLeaveBack: setDark,
        onEnterBack: unsetDark,
        onLeave: unsetDark
      })

      /* Reveal animations */
      const scrollTrigger = {
        trigger: wrapper.value,
        start: 'top 35%',
        end: 'top top'
      }

      $gsap.fromTo('.scroller-chapter .item-title', {
        y: '120%'
      }, {
        y: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: .1,
        scrollTrigger
      })

      $gsap.fromTo('.scroller-chapter .item-text', {
        y: '120%'
      }, {
        y: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: .1,
        delay: .25,
        scrollTrigger
      })

      $gsap.fromTo('.scroller-chapter .item-more', {
        y: '120%'
      }, {
        y: 0,
        duration: 1,
        delay: .5,
        ease: 'power4.out',
        stagger: .1,
        scrollTrigger
      })
    })
  }, 250)
})

onUnmounted(() => {
  scroller && scroller.kill()
  animations && animations.kill()
})
</script>

<template>
  <section :class="['home-scroller', { hover }]" ref="wrapper">
    <div class="items" ref="items">
      <div class="filler" />
      <HomeManifestoChapter
        v-for="(chapter, i) in block.sections"
        :key="i"
        :chapter="chapter"
        :index="i"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
      />
      <div class="filler" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .home-scroller {
    position: relative;
    background-color: var(--color-primary);
    min-height: calc(100svh - var(--spacing-navbar));
    overflow: hidden;
    color: var(--color-white);
    margin-top: -100svh;
    display: flex;
    align-items: center;
  }

  .items {
    display: flex;
    flex-wrap: none;
  }

  .filler {
    width: 5vw;
    flex-shrink: 0;

    &:last-child {
      width: 25vw;
    }
  }

  @media(max-width: 991px) {
    .home-scroller {
      margin-top: 0;

      .items {
        overflow: auto;
        scroll-snap-type: x mandatory;
        min-height: calc(100svh - var(--spacing-navbar));
      }
    }
  }
</style>