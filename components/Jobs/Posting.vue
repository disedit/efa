<script setup>
const props = defineProps({
  job: { type: Object, required: true }
})

const canApply = !props.job.fields.deadline || new Date(props.job.fields.deadline) >= new Date()
</script>

<template>
  <ElementsTab label-size="base" rises>
    <template #label>
      {{ job.fields.type }}
    </template>
    <template #extra>
      <span class="text-base text-primary flex gap-6 items-center">
        <div v-if="job.fields.status" class="hidden md:block">
          <strong>Status:</strong> {{ job.fields.status }}
        </div>
        <div v-if="job.fields.deadline">
          <strong>Deadline:</strong> {{ job.fields.deadline }}
        </div>
      </span>
    </template>
    <div class="text-primary w-full flex flex-col gap-2 md:gap-4">
      <NuxtLink :to="`/jobs/${job.slug}`" class="underlined-on-hover">
        <h2 class="text-lg leading-none font-extrabold">
          {{ job.title }}
        </h2>
      </NuxtLink>
      <div v-if="job.fields.status" class="block md:hidden text-base text-primary">
        <strong>Status:</strong> {{ job.fields.status }}
      </div>
      <div v-html="job.short_description" class="text-base prose w-full" />
      <div v-if="canApply">
        <UtilsButton
          :to="job.fields.apply_url"
          class="text-base inline-flex"
          target="_blank"
          rel="noopener"
        >
          Apply
        </UtilsButton>
      </div>
    </div>
  </ElementsTab>
</template>

<style>

</style>