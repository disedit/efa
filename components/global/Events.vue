<script setup>
const props = defineProps({ block: Object })

const { $wp } = useNuxtApp()

const { data: events } = await useAsyncData(
  `events`, () => $wp.events()
)
</script>

<template>
  <section class="page-container">
    <template v-if="events.upcoming.length > 0">
      <h2>Upcoming events</h2>
      <div class="flex flex-col gap-site md:gap-10">
        <EventsEvent
          v-for="event in events.upcoming"
          :key="event.id"
          :event="event"
        />
      </div>

      <h2>Past events</h2>
    </template>
    <EventsList
      :events="events.past"
      :per-page="10"
      :page="1"
    />
  </section>
</template>

<style>

</style>