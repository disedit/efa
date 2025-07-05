<script setup>
const { index } = defineProps({
  index: {
    type: Number,
    required: true
  },
  chapter: {
    type: Object,
    required: true
  }
})

const { $gsap } = useNuxtApp()
const { page } = useUtils()

function animateOut() {
  $gsap.to('.scroller-chapter .item-title', {
    y: '120%',
    duration: .25,
    ease: 'power4.in',
    stagger: {
      each: .1,
      from: index
    }
  })

  $gsap.to('.scroller-chapter .item-text', {
    y: '120%',
    duration: .25,
    ease: 'power4.in',
    stagger: {
      each: .1,
      from: index
    },
    delay: .1
  })

  $gsap.to('.scroller-chapter .item-more', {
    y: '120%',
    duration: .25,
    ease: 'power4.in',
    stagger: {
      each: .1,
      from: index
    },
    delay: .2
  })
}
</script>

<template>
  <nuxt-link :to="page(chapter.page)" class="scroller-chapter item selection-orange" @click="animateOut">
    <div class="overflow-hidden">
      <h3 class="item-title">
        {{ chapter.title }}
      </h3>
    </div>
    <div class="overflow-hidden">
      <p class="item-text">
        <span>{{ chapter.summary }}</span>
      </p>
    </div>
    <div class="overflow-hidden">
      <div class="item-more">Read more</div>
    </div>
    <NuxtPicture
      v-if="chapter.picture"
      :src="chapter.picture.url"
      :alt="chapter.picture.alt"
      class="item-image"
      sizes="100vw md:1000px"
    />
  </nuxt-link>
</template>

<style lang="scss" scoped>
.item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: var(--color-white);
  text-decoration: none;
  margin: 7vw 0;
  padding: 0 7vw;
  transition: .25s ease;
  scroll-snap-align: center;
  max-width: 100vw;

  &-title {
    font-size: var(--text-5xl);
    line-height: .85;
    margin-bottom: .2em;
    font-weight: 800;
    transition: .25s ease;
    max-width: 10ch;
    text-wrap: balance;
    position: relative;
    z-index: 10;
    margin-right: 5vw;
    hyphens: auto;
  }

  &-text {
    max-width: 40ch;
    font-size: var(--text-md);
    margin: 0;
    position: relative;
    line-height: 1.25;
    padding-left: .5em;
    position: relative;
    z-index: 10;
    max-width: 30ch;
    text-wrap: balance;
  }

  &-more {
    font-size: var(--text-md);
    text-decoration: underline;
    text-underline-offset: 0.2em;
    text-decoration-thickness: var(--border-width);
    margin-top: 1em;
    padding-left: .5em;
    position: relative;
    z-index: 10;
    transition: .25s ease;
  }
  
  &-image {
    position: absolute;
    top: 5rem;
    right: 0;
    z-index: 1;
    opacity: .5;
    transition: .25s ease;

    :deep(img) {
      height: 40vh;
    }
  }

  &:hover {
    z-index: 10;

    .item-title {
      color: var(--color-secondary);
    }

    .item-image {
      opacity: 1;
    }

    .item-more {
      font-weight: 800;
      letter-spacing: -.04em;
    }
  }
}

@media(max-width: 991px) {
  .item {
    justify-content: flex-end;
    padding-bottom: 10svh;

    &-title {
      color: var(--color-secondary);
    }

    &-image {
      top: 2vh;
      right: 4vw;
      left: 20vw;
      z-index: 1;
      opacity: .5;
      transition: .25s ease;

      :deep(img) {
        height: 27vh;
        object-fit: cover;
      }
    }
  }
}
</style>