<script setup>
const { params } = useRoute()
const settings = await useSettings()
const event = await useEvent(params.slug)
const { humanDate, time } = useDate()

/* SEO Metatags */
const siteName = settings.seo.site_name
const title = params.slug && params.slug.length > 0 ? `${event.title} - ${siteName}` : siteName
const ogTitle = title
const description = event.details || settings.seo?.default_description
const ogImage = event.thumbnail?.url || settings.seo?.default_og_image?.url
const keywords = settings.seo?.default_keywords
const twitterSite = settings.seo?.xtwitter_user
useServerSeoMeta({
  title,
  ogTitle,
  description,
  ogDescription: description,
  ogImage,
  twitterCard: 'summary_large_image',
  keywords,
  ogSiteName: siteName,
  twitterSite,
  ogType: 'article'
})
useHead({ title })
</script>

<template>
  <main class="min-h-page">
    <PageHeader
      :block="{
        heading: event.title
      }"
      :context="{
        breadcrumbs: [
          { post_name: '/events', post_title: 'Events' },
        ],
      }"
    />
    <article class="page-container grid md:grid-cols-3 gap-site md:gap-12">
      <div v-if="event.thumbnail?.url">
        <NuxtPicture
          :src="event.thumbnail.url"
          :alt="event.thumbnail.alt"
          :img-attrs="{ class: 'w-full' }"
          class="sticky top-navbar"
        />
      </div>
      <div :class="['flex flex-col gap-8 text-primary', { 'md:col-span-2' : event.thumbnail?.url }]">
        <time :datetime="event.fields.date" class="flex gap-12 text-lg font-medium leading-[1]">
          <div class="flex gap-2 items-center">
            <Icon name="ri:calendar-line" />
            {{ !event.fields.has_manual_date ? humanDate(event.fields.date) : event.fields.manual_date }}
          </div>
          <div v-if="!event.fields.full_day" class="flex gap-2 items-center">
            <Icon name="ri:time-line" />
            {{ !event.fields.has_manual_date ? time(event.fields.date) : event.fields.manual_time }}
          </div>
        </time>
        <address v-if="event.fields.city_region || event.fields.venue || event.fields.addres" class="not-italic flex gap-2 text-lg leading-[1]">
          <Icon name="ri:map-pin-2-line" />
          <div>
            <strong class="block mb-2">{{ event.fields.city_region }}</strong>
            <div class="mb-2">{{ event.fields.venue }}</div>
            <div class="text-md">{{ event.fields.address }}</div>
          </div>
        </address>
        <div v-if="event.fields.details" class="flex gap-2 text-lg leading-[1]">
          <Icon name="ri:information-2-line" />
          <div v-html="event.fields.details" class="text-md" />
        </div>
        <div v-if="event.fields.button_link">
          <UtilsButton
            :to="event.fields.button_link"
            class="text-md"
            target="_blank"
          >
            {{ event.fields.button_label || 'More details' }}
          </UtilsButton>
        </div>
        <div v-html="event.content" class="text-base text-blackish prose max-w-[85ch]" />
      </div>
    </article>
  </main>
</template>