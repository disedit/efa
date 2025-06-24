<script setup>
const props = defineProps({ block: Object, context: Object })

const { $wp } = useNuxtApp()

const { data: jobs } = await useAsyncData(
  `jobs`, () => $wp.jobs()
)
</script>

<template>
  <section class="page-container">
    <div v-if="jobs.length" class="flex flex-col gap-site md:gap-12 max-w-[75rem]">
      <JobsPosting
        v-for="job in jobs"
        :key="job.id"
        :job="job"
      />
    </div>
    <div v-else class="prose text-primary text-md font-medium" v-html="block.fallback" />
  </section>
</template>
