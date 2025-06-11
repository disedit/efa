<script setup>
const { params } = useRoute()
const settings = await useSettings()
const job = await useJob(params.slug)
const { humanDate } = useDate()
const canApply = !job.fields.deadline || new Date(job.fields.deadline) >= new Date()

/* SEO Metatags */
const siteName = settings.seo.site_name
const title = params.slug && params.slug.length > 0 ? `${job.title} - ${siteName}` : siteName
const ogTitle = title
const description = job.short_description || settings.seo?.default_description
const ogImage = settings.seo?.default_og_image?.url
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
    <PageHeader :block="{
      breadcrumbs: [
        { post_name: 'work-with-us', post_title: 'Work with us' },
      ],
      heading: job.title
    }" />
    <article class="page-container grid gap-site md:gap-12">
      <ElementsTab class="max-w-[75rem]">
        <template #label>
          <div class="leading-[1] py-2">{{ job.fields.type }}</div>
        </template>
        <template #extra>
          <span class="hidden md:flex text-base text-primary gap-6 items-center leading-tight">
            <div v-if="job.fields.status">
              <strong>Status:</strong> {{ job.fields.status }}
            </div>
            <div v-if="job.fields.deadline">
              <strong>Deadline:</strong> {{ humanDate(job.fields.deadline) }}
            </div>
            <div v-if="canApply" class="hidden md:block">
              <UtilsButton
                :to="job.fields.apply_url"
                target="_blank"
                rel="noopener"
              >
                Apply
              </UtilsButton>
            </div>
          </span>
        </template>

        <div class="divide-y divide-primary md:hidden text-primary mb-6">
          <div v-if="job.fields.status" class="flex justify-between py-1">
            <strong>Status:</strong> {{ job.fields.status }}
          </div>
          <div v-if="job.fields.deadline" class="flex justify-between py-1">
            <strong>Deadline:</strong> {{ humanDate(job.fields.deadline) }}
          </div>
          <div>
            <UtilsButton
              :to="job.fields.apply_url"
              class="block text-center font-bold text-md mt-6"
            >
              Apply
            </UtilsButton>
          </div>
        </div>

        <div v-html="job.content" class="text-base text-black prose" :style="{'--color-th-background': 'var(--color-cream)', '--color-th-foreground': 'var(--color-primary)' }" />

        <div class="mt-6" v-if="canApply">
          <UtilsButton
            :to="job.fields.apply_url"
            class="font-bold text-md inline-flex"
            target="_blank"
            rel="noopener"
          >
            Apply
          </UtilsButton>
        </div>
      </ElementsTab>
    </article>
  </main>
</template>