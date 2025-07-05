<script setup>
defineProps({
  event: { type: Object, required: true}
})

const { humanDate, time } = useDate()
</script>

<template>
  <article class="event gap-site md:gap-x-12 text-primary text-base border-b-2 pb-10 mb-2 md:pb-0 md:mb-0 md:border-0">
    <time :datetime="event.fields.date" class="event-date text-lg font-medium leading-[1]">
      <div class="sticky flex md:flex-col gap-3 justify-between">
        <div>
          {{ event.fields.has_manual_date ? event.fields.manual_date : humanDate(event.fields.date, 'short') }}
        </div>
        <div v-if="!event.fields.full_day">
          {{ event.fields.has_manual_date ? event.fields.manual_time : time(event.fields.date) }}
        </div>
      </div>
    </time>
    <div class="event-picture">
      <NuxtPicture
        v-if="event.thumbnail?.url"
        :src="event.thumbnail.url"
        :alt="event.thumbnail.title"
        class="block w-full border-2 border-primary"
        :img-attrs="{ class: 'w-full' }"
        sizes="800px"
      />
    </div>
    <NuxtLink 
      :to="`/events/${event.slug}`"
      class="event-title underlined-on-hover"
    >
      <h3 class="font-extrabold text-xl md:text-lg leading-[1]">
        {{ event.title }}
      </h3>
    </NuxtLink>
    <div class="event-info flex flex-col gap-site">

      <address class="not-italic">
        <strong class="block">
          {{ event.fields.city_region }}
        </strong>
        {{ event.fields.venue }}
        {{ event.fields.address }}
      </address>
      <div v-html="event.fields.details" />
      <div v-if="event.fields.button_label" class="mt-auto">
        <UtilsButton
          :to="event.fields.button_link"
          class="text-base"
          target="_blank"
        >
          {{ event.fields.button_label }}
        </UtilsButton>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.event {
  display: grid;
  grid-template-columns: 18rem 1fr 3fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "date picture title"
    "date picture info";

  &-date {
    grid-area: date;

    .sticky {
      top: calc(var(--spacing-navbar) + 4.5rem);
    }
  }

  &-picture {
    grid-area: picture;
  }

  &-title {
    grid-area: title;
  }

  &-info {
    grid-area: info;
  }
}

@media (max-width: 46rem) {
  .event {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto 1fr;
    grid-template-areas:
      "date"
      "title"
      "info"
      "picture";
  }
}
</style>