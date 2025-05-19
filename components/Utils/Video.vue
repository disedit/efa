<script setup>
const props = defineProps({
  id: { type: String, default: null },
  video: { type: [String, Object], required: true },
  poster: { type: [String, Object],  default: null },
  showTime: { type: Boolean, default: false },
  fit: { type: String, default: null },
  objectPosition: { type: String, default: 'center' },
  autoplay: { type: Boolean, default: false },
  autoplayMuted: { type: Boolean, default: false },
  showUnmuteTooltip: { type: Boolean, default: false },
  controlsHaveShadow: { type: Boolean, default: false }
})

const { $emitter } = useNuxtApp()

const breakpoint = ref('desktop')
const player = ref(null)
const playing = ref(false)
const muted = ref(true)
const time = ref(0) // Updated every second
const lastCurrentTime = ref(0) // Updated on breakpoint changes
const duration = ref(0)
const showControls = ref(false)
const dismissAutoplay = ref(true)
const mutedFromAutoplay = ref(true)

onMounted(() => {
  updateBreakpoint()
  window.addEventListener('resize', updateBreakpoint)

  // Set playing state if autoplay
  if (props.autoplay || props.autoplayMuted) {
    playing.value = true
    dismissAutoplay.value = !props.autoplayMuted
  }

  $emitter.on('video:play', (id) => {
    if (id === props.id) {
      playVideo()
    }
  })

  $emitter.on('video:autoplay', (id) => {
    if (id === props.id) {
      autoplayVideo()
    }
  })

  $emitter.on('video:pause', (id) => {
    if (id === props.id) {
      pauseVideo()
    }
  })

  $emitter.on('video:pause-all', (id) => {
    if (id !== props.id) {
      pauseVideo()
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateBreakpoint)
})

/* Breakpoint control */
watch(breakpoint, () => {
  lastCurrentTime.value = player.value.currentTime
  duration.value = player.value.duration
  player.value.load()
})

function updateBreakpoint ()  {
  breakpoint.value = window.innerWidth < 768 ? 'mobile' : 'desktop'
}

/* Video controls */
async function playVideo () {
  muted.value = false
  try {
    await player.value.play()
    playing.value = true
    $emitter.emit('video:pause-all', props.id)
  } catch(e) {
    playing.value = false
  }
}

async function autoplayVideo() {
  try {
    await player.value.play()
  } catch(e) {
    muted.value = true
    nextTick(() => { player.value.play() })
  } finally {
    $emitter.emit('video:pause-all', props.id)
    playing.value = true
  }
}

async function pauseVideo () {
  if (!player.value) return
  await player.value.pause()
  playing.value = false
}

function togglePlay () {
  if (playing.value) {
    pauseVideo()
  } else {
    playVideo()
  }
}

function replayWithSound () {
  muted.value = false
  dismissAutoplay.value = true
  nextTick(() => {
    player.value.currentTime = 0
  })
}

function toggleMute () {
  muted.value = !muted.value
  mutedFromAutoplay.value = false
}

function onLoadedMetadata() {
  if (!player.value) return
  player.value.currentTime = lastCurrentTime.value
  if (playing.value) {
    player.value.play()
  }
}

function onTimeUpdate (event) {
  time.value = event.target.currentTime
  duration.value = event.target.duration
}

function seek(seconds) {
  if (player.value) {
    player.value.currentTime = seconds
  }

  if (mutedFromAutoplay.value) {
    muted.value = false
  }
}

/* Sources */
const videoSources = computed(() => {
  if (typeof props.video !== 'object') {
    return { mobile: props.video, desktop: props.video }
  }

  return props.video
})

const videoPosters = computed(() => {
  if (!props.poster) {
    return { mobile: null, desktop: null}
  }

  if (typeof props.poster !== 'object') {
    return { mobile: props.poster, desktop: props.poster }
  }

  return props.poster
})

const objectFit = computed(() => {
  if (props.fit) return props.fit
  return breakpoint.value === 'mobile' ? 'cover' : 'contain'
})
</script>

<template>
  <div class="video-player" :id="id">
    <Transition name="slide">
      <div v-if="!playing" class="video-title">
        <slot />
      </div>
    </Transition>
    <video
      ref="player"
      :src="videoSources[breakpoint]"
      :poster="videoPosters[breakpoint]"
      :muted="muted"
      :autoplay="autoplay || autoplayMuted"
      playsinline
      :controls="showControls"
      @timeupdate="onTimeUpdate"
      @click="!showControls ?  pauseVideo() : null"
      @loadedmetadata="onLoadedMetadata"
      @pause="playing = false"
      @play="playing = true"
      class="video"
      :style="{ objectFit, objectPosition }">
    </video>
    <Transition name="video">
      <button
        v-if="!playing"
        class="video-button"
        aria-label="Play video"
        @click="playVideo">
        <IconPlay class="icon" />
      </button>
    </Transition>
    <Transition name="video">
      <button
        v-if="autoplayMuted && playing && muted && !dismissAutoplay"
        class="video-button"
        @click="replayWithSound">
        <div class="muted">
          <IconPlay class="muted-icon" />
          <div class="mt-1">Play with sound</div>
        </div>
      </button>
    </Transition>
    <Transition name="slide">
      <UtilsVideoControls
        v-if="playing && !showControls && dismissAutoplay"
        :time="time"
        :duration="duration"
        :show-time="showTime"
        :muted="muted"
        :show-unmute-tooltip="showUnmuteTooltip"
        :controls-have-shadow="controlsHaveShadow"
        @toggle-play="togglePlay"
        @toggle-mute="toggleMute"
        @show-controls="showControls = true"
        @seek="seek" />
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
  .video-player {
    position: relative;
    overflow: hidden;
  }

  .video {
    display: block;
    height: 100%;
    width: 100%;
    position: relative;

    &-title {
      color: var(--color-white);
      font-family: var(--font-sans);
      font-size: var(--text-md);
      text-transform: unset;
      font-weight: 600;
      position: absolute;
      top: 0;
      left: 0;
      padding: calc(var(--spacing) * 6);
      z-index: 10;
      line-height: 1;
    }
  }

  .video-button {
    position: absolute;
    inset: 0;
    appearance: none;
    border: 0;
    background: rgba(0, 0, 0, .5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-white);
    width: 100%;
    cursor: pointer;

    .icon {
      width: calc(2rem + 4vw);
      height: calc(2rem + 4vw);
      max-width: 7rem;
      max-height: 7rem;
      transition: .25s ease;

      &:hover {
        transform: scale(1.2);
      }
    }

    .muted {
      transition: .25s ease;
      font-size: var(--text-lg);
      font-weight: bold;

      .muted-icon {
        width: calc(2rem + 4vw);
        height: calc(2rem + 4vw);
        max-width: 7rem;
        max-height: 7rem;
      }

      &:hover {
        transform: scale(1.2);
      }
    }
  }

  .video-enter-active,
  .video-leave-active {
    transition: all 0.25s;

    .icon {
      transition: all 0.25s;
    }
  }
  .video-enter-from,
  .video-leave-to {
    opacity: 0;

    .icon {
      opacity: 0;
      transform: translateY(20%);
    }
  }

  @media (max-with: 46rem) {
    .video-button .icon {
      width: 20vw;
      height: 20vw;
    }
  }
</style>