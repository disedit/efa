<script setup>
const props = defineProps({ block: Object, context: Object })

const { $gsap } = useNuxtApp()
const { setDark, unsetDark } = useColorMode()

const sources = {
  desktop: props.block.video,
  mobile: props.block.video_mobile
}

const video = ref(null)
const videoIsVisible = useElementVisibility(video)
let mm = null

watch(videoIsVisible, (visible) => {
  if (!visible) {
    unsetDark()
  }
})

onMounted(() => {
  setTimeout(() => {
    mm = $gsap.matchMedia()
    mm.add("(min-width: 992px)", () => {
      $gsap.fromTo(video.value, {
        margin: 16
      }, {
        margin: 0,
        scrollTrigger: {
          trigger: video.value,
          start: 'top 200px',
          end: 'top start',
          scrub: 1,
          onLeave: setDark,
          onLeaveBack: unsetDark,
          onEnterBack: unsetDark,
          onEnter: unsetDark,
          invalidateOnRefresh: true,
        }
      })
    })
  }, 500)
})

onUnmounted(() => {
  mm && mm.kill()
  unsetDark()
})
</script>

<template>
  <section class="video" ref="video">
    <div class="video-wrapper">
      <UtilsVideo
        id="HomeVideo"
        :video="sources"
        autoplay
        show-time
        show-unmute-tooltip
        class="video-player">
        A Europe<br />For All
      </UtilsVideo>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.video {
  height: 250vh;
  background: var(--color-black);
  position: relative;
  margin-top: 0 !important;

  &-wrapper {
    position: sticky;
    top: var(--spacing-navbar);
    height: calc(100svh - var(--spacing-navbar));
    display: flex;
    align-items: center;
  }

  &-player {
    height: 100%;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
}

@media (max-width: 46rem) {
  .video {
    height: 100vh;
  }
}
</style>