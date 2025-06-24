<script setup>
const props = defineProps({ block: Object, context: Object })

const { $wp } = useNuxtApp()

const { data: events } = await useAsyncData(
  `events`, () => $wp.events()
)
</script>

<template>
  <section class="page-container">
    <template v-if="events.upcoming.length > 0">
      <h2 class="text-primary font-extrabold text-md leading-[1] mb-4 md:mb-12 flex items-center gap-2 bg-white py-4 sticky top-navbar z-10 border-b-2 border-primary md:border-b-0">
        Upcoming events
        <Icon name="ri:arrow-right-up-line" />
      </h2>
      <div class="flex flex-col gap-site md:gap-24">
        <EventsEvent
          v-for="event in events.upcoming"
          :key="event.id"
          :event="event"
        />
      </div>

      <h2 class="text-primary font-extrabold text-md leading-[1] mb-4 md:mb-12 mt-12 md:mt-24 flex items-center gap-2 bg-white py-4 sticky top-navbar z-10 border-b-2 border-primary md:border-b-0">
        <Icon name="ri:arrow-left-down-line" />
        Past events
        
      </h2>
    </template>
    <EventsList
      :events="events.past"
      :per-page="10"
      :page="1"
    />
  </section>
</template>
