<script setup>
const props = defineProps({ block: Object, context: Object })
const { $gsap, $ScrollTrigger } = useNuxtApp()
const { link } = useUtils()
const hero = ref(null)
const imageLoaded = ref(false)
const canAnimate = ref(false)
const animated = ref(false)
const hasVideo = computed(() => !!props.block.background_video)

watch(imageLoaded, (loaded) => {
  if (loaded && props.block.animate && canAnimate.value) {
    animate()
  }
})

onMounted(() => {
  setTimeout(() => {
    canAnimate.value = true

    if ((props.block.animate && imageLoaded.value && !animated.value) || hasVideo.value) {
      animate()
    }
  }, 500)
})

function animate() {
  animated.value = true

  $gsap.to(hero.value, {
    delay: .25,
    duration: 2,
    ease: 'power4.inOut',
    minHeight: '77vh',
    onComplete () {
      $ScrollTrigger.refresh()
    } 
  })

  $gsap.fromTo('.hero .word', {
    opacity: 0,
    y: '20%',
  }, {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: .1,
    ease: 'power4.out',
  })
}

const bgColors = {
  transparent: '',
  purple: 'bg-purple',
  orange: 'bg-orange',
  cream: 'bg-cream',
  white: 'bg-white',
}

const textColors = {
  purple: 'text-purple',
  orange: 'text-orange',
  cream: 'text-cream',
  white: 'text-white',
}

const tag = props.block.link?.url ? resolveComponent('NuxtLink') : 'div'
</script>

<template>
  <header
    ref="hero"
    :class="['hero relative min-h-safest-viewport flex bg-cream mx-site bg-cover', { animated: block.animate }]"
  >
    <Component
      :is="tag"
      :to="link(block.link)"
      :class="[
        'relative flex flex-col gap-site w-full p-site md:p-24 z-[10]',
        {
          'justify-start': block.position === 'top',
          'justify-center': block.position === 'center',
          'justify-end': block.position === 'end',
          'items-start text-left': block.alignment === 'left',
          'items-center text-center': block.alignment === 'center',
          'items-end text-right': block.alignment === 'right',
        }
      ]">
      <h1 class="font-extrabold text-4xl selection-orange md:max-w-[50%] text-balance leading-[1]">
        <span
          :class="[
            { 'px-[.25em] box-decoration-clone leading-[1.6]': block.text_pill !== 'transparent' },
            bgColors[block.text_pill],
            textColors[block.text_color],
          ]"
        >
          <span v-for="(word, w) in block.headline.split(' ')" :key="w" class="word inline-block me-[.25em]">
           {{ word + ' ' }}
          </span>
        </span>
      </h1>
      <p v-if="block.text" :class="['text-md', block.text_pill === 'transparent' ? textColors[block.text_color] : 'text-white']">
        {{ block.text }}
      </p>

      <p v-if="block.cta" class="cta relative w-fit">
        <span class="inline-block text-base bg-white text-purple font-bold p-2 px-4 bordered transition">
          {{ block.cta }}
        </span>
      </p>
    </Component>
    <div class="absolute inset-0 z-[1] flex">
      <video
        v-if="hasVideo"
        :src="block.background_video"
        class="w-full h-full object-cover"
        muted
        autoplay
        loop
      />
      <NuxtPicture
        v-else-if="block.background_image?.url"
        :src="block.background_image.url"
        :alt="block.background_image.alt"
        sizes="100vw md:600px lg:800px xxl:1300px"
        preload
        @load="imageLoaded = true"
        :img-attrs="{ class: 'h-full w-full object-cover' }"
        class="w-full"
      />
    </div>
    <div v-if="block.overlay" class="absolute inset-0 z-[2] bg-black/40"></div>
  </header>
</template>

<style lang="scss" scoped>
.animated .word {
  opacity: 0;
}

.cta {
  &:after {
    content: '';
    position: absolute;
    inset: 0;
    border: var(--border-width) solid var(--color-primary);
    background: var(--color-white);
    z-index: -1;
    transition: .25s ease;
  }

  &:hover span {
    transform: translate(-.4rem, -.4rem);

    &:after {
      transform: translate(.4rem, .4rem);
    }
  }

  &:active {
    span {
      transform: translate(-.2rem, -.2rem);
    }
  }
}
</style>