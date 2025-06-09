<script setup>
const props = defineProps({
  events: {
    type: Array,
    required: true
  },
  page: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <PageHeader :block="{ heading: 'Events' }" />
  <EventsList
    :events="events"
    :page="page"
    :per-page="perPage"
    class="page-container"
  />
</template>
