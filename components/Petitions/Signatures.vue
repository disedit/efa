<script setup>
const props = defineProps({
  id: { type: String, required: true },
  count: { type: Number, default: 0 },
  block: { type: Object, required: true },
})
const { $gsap } = useNuxtApp()

const container = ref(null)
const progressBar = ref(null)
let animateNumbers
let animateProgressBar

onMounted(() => {
  animate()
})

onUnmounted(() => {
  if (animateNumbers) animateNumbers.kill()
  if (animateProgressBar) animateProgressBar.kill()
})

function animate() {
  const counters = document.querySelectorAll(`#${props.id} .counter`)
  animateNumbers = $gsap.from(counters, {
    textContent: 0,
    duration: 1,
    ease: 'Power1.easeOut',
    snap: { textContent: 1 },
    stagger: .25,
    scrollTrigger: {
      trigger: container.value,
      start: 'top bottom',
    }
  })

  // Animate progress bar
  if (progressBar.value) {
    animateProgressBar = $gsap.from(progressBar.value, {
      width: '0%',
      duration: 1,
      ease: 'Power1.easeOut',
      scrollTrigger: {
        trigger: container.value,
        start: 'top bottom',
      }
    })
  }
}

const signatureGoal = computed(() => {
  if (props.block.signature_goal_type === 'none') return null
  if (props.block.signature_goal_type === 'manual') return props.block.manual_signature_goal

  // Set a dynamic goal, where the goal increases as more signatures are collected. The goal increases in increments of `dynamic_goal_step`, and is always at least `dynamic_goal_minimum`. The goal is always at least 10% higher than the current count, to ensure that the progress bar always shows some progress.
  const step = props.block.dynamic_goal_step || 100
  const minimum = props.block.dynamic_goal_minimum || 100
  let goal = Math.ceil(props.count / step) * step
  if (goal < minimum) goal = minimum
  if (goal < props.count * 1.1) goal = Math.ceil(props.count * 1.1 / step) * step

  return goal
})

const progressBarWidth = computed(() => {
   if (!props.block.signature_threshold) return 0
   const max = signatureGoal.value || props.block.signature_threshold
   const progress = (props.count / max) * 100
   return progress > 100 ? 100 : progress < 4 ? 4 : progress
})
</script>

<template>
  <div
    :id="id"
    ref="container"
    class="bg-true-white max-w-[34rem] mx-auto rounded-xl p-8 text-purple text-md flex flex-col items-center gap-6"
  >
    <div class="font-medium">
      <span class="text-xl counter">{{ count }}</span> signatures
    </div>
    <div v-if="block.signature_goal_type !== 'none'" class="w-full flex flex-col gap-4">
      <div class="bg-cream rounded-full overflow-clip">
        <div ref="progressBar" class="bg-orange rounded-full h-8" :style="{ width: `${progressBarWidth}%` }" />
      </div>
      <div class="text-center text-base font-medium">
        <template v-if="count < signatureGoal && (signatureGoal - count) <= (signatureGoal * 0.25)">
          Only {{ signatureGoal - count }} more until our goal of {{ signatureGoal }}!
        </template>
        <template v-else-if="count < signatureGoal">
          Help us reach our goal of {{ signatureGoal }} signatures!
        </template>
        <template v-else>
          We've reached our goal of {{ signatureGoal }} signatures!
        </template>
      </div>
    </div>
  </div>
</template>
