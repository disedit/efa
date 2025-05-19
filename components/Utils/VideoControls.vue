<script setup>
const props = defineProps({
  time: { type: Number, required: true },
  duration: { type: Number, default: 0 },
  showTime: { type: Boolean, default: false },
  muted: { type: Boolean, default: true },
  showUnmuteTooltip: { type: Boolean, default: false },
  controlsHaveShadow: { type: Boolean, default: false }
})

const emit = defineEmits(['showControls', 'toggleMute', 'togglePlay', 'seek'])

const progress = ref(null)
const seeking = ref(false)
const seekPosition = ref(0)
const dismissUnmuteTooltip = ref(false)

function human(seconds) {
  return [parseInt((seconds / 60) % 60, 10), parseInt(seconds  % 60, 10)]
    .join(":")
    .replace(/\b(\d)\b/g, "0$1");
}

function width(seconds) {
  return (seconds * 100 / props.duration) + '%'
}

function setSeekPosition(e) {
  const rect = progress.value.getBoundingClientRect()
  const x = e.pageX - rect.left
  seekPosition.value = (x * 100 / rect.width)
}

function seek() {
  const seconds = (seekPosition.value * props.duration) / 100
  emit('seek', seconds)
}

function unmute() {
  emit('toggleMute')
  dismissUnmuteTooltip.value = true
}
</script>

<template>
   <div :class="['video-controls', { seeking, shadow: controlsHaveShadow }]">
      <button @click="$emit('togglePlay')" title="Pause Video">
        <IconPause class="icon" />
      </button>
      <span class="time" v-if="showTime">
        {{ human(time) }}
        <span class="total-time">/ {{ human(duration) }}</span>
      </span>
      <button @click="unmute" :title="muted ? 'Unmute volume' : 'Mute volume'" class="mute">
        <IconUnmute v-if="muted" class="icon" />
        <IconMute v-else class="icon" />
        <Transition name="slide">
          <span class="mute-tooltip" v-if="showUnmuteTooltip && !dismissUnmuteTooltip && muted">
            Unmute video
          </span>
        </Transition>
      </button>
      <button @click="$emit('showControls')" title="Show more controls" class="controls">
        <IconSlider class="icon" />
      </button>
      <div
        class="progress"
        v-if="duration > 0"
        @mouseenter="seeking = true"
        @mousemove="setSeekPosition"
        @mouseleave="seeking = false"
        @click="seek"
        ref="progress">
        <div class="progress-bar" :style="{ width: width(time) }" />
        <div class="progress-track">
          <div class="progress-track-thumb" :style="{ width: seekPosition + '%' }" />
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.video-controls {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: var(--spacing-site);
  display: flex;
  align-items: center;
  gap: var(--spacing-site);
  color: var(--color-white);
  transition: .5s ease;

  button {
    appearance: none;
    border: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    transition: .25s ease;

    .icon {
      width: 1.75em;
      height: 1.75em;
    }

    &:hover {
      transform: scale(1.1);
    }
  }

  .time {
    font-variant-numeric: tabular-nums;
    transform: translateY(-.1em);
    
    .total-time {
      opacity: .5;
    }
  }

  &.seeking {
    padding-bottom: 2rem;
  }

  &.shadow {
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);

    .icon {
      filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.8));
    }

    .mute-tooltip,
    .mute-tooltip::before {
      background: var(--color-black);
      color: var(--color-white);
    }
  }
}

.mute {
  margin-left: auto;
  position: relative;

  &-tooltip {
    position: absolute;
    bottom: 1.25rem;
    right: 0;
    background: var(--color-white);
    color: var(--color-black);
    white-space: nowrap;
    transform: translateY(-100%);
    padding: .4rem .5rem;
    font-weight: 600;

    &::before {
      content: '';
      position: absolute;
      right: 1rem;
      bottom: -.25rem;
      width: .751rem;
      height: .75rem;
      background: var(--color-white);
      transform: rotate(45deg);
      z-index: -1;
    }
  }
}

.progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  --track-full-height: 1.5rem;
  --track-min-height: .25rem;

  &-bar {
    height: var(--track-min-height);
    background: var(--color-primary);
    transition: width 1s linear, height .5s ease;
  }

  &-track {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--track-full-height);
    cursor: pointer;

    &-thumb {
      background: var(--color-primary);
      transform: translateY(100%);
      transition: transform .5s ease;
    }
  }

  &:hover {
    .progress-track-thumb {
      transform: translateY(0);
    }
  }
}
</style>