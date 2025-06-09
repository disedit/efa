<script setup>
const { params } = useRoute()
const settings = await useSettings()
const post = await usePost(params.slug)

/* Load related posts */
const { $wp } = useNuxtApp()
const tagIds = post.tags ? post.tags.map(tag => tag.id) : []
const categoyIds = !post.tags && post.categories ? post.categories.map(tag => tag.categories) : []
const { data: morePosts } = await useAsyncData(
  `news-${categoyIds.join('-')}-${tagIds.join('-')}`, () => $wp.news()
    .param('tags', tagIds.join(','))
    .param('categories', categoyIds.join(','))
    .param('per_page', 4)
)
const relatedPosts = morePosts.value.posts.filter(p => p.id !== post.id)

/* Post */
const { humanDate } = useDate()
const { category } = useUtils()
const mainCategory = category(post)

/* SEO Metatags */
const siteName = settings.seo.site_name
const title = params.slug && params.slug.length > 0 ? `${post.title} - ${siteName}` : siteName
const ogTitle = title
const description = post.excerpt || settings.seo?.default_description
const ogImage = post.thumbnail?.url || settings.seo?.default_og_image?.url
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
  <main class="min-h-safe-viewport">
    <div v-if="post.fields?.layout === 'image_header' && post.thumbnail?.url" class="-mb-[calc(2.5rem+7vh)]">
      <NuxtPicture
        :src="post.thumbnail.url"
        :alt="post.thumbnail.alt"
        :img-attrs="{ class: 'w-full h-[calc(10rem+25vh)] object-cover' }"
      />
    </div>
    <div class="bg-white relative z-1 page-container p-0">
      <PageHeader :block="{
        breadcrumbs: [
          { post_name: 'news', post_title: 'News' },
          { post_name: 'news/page/1/?tags=' + mainCategory.id, post_title: mainCategory.name, color: mainCategory.color || 'purple', hidden: mainCategory.name === 'News' },
          { post_name: null, post_title: humanDate(post.date) }
        ],
        heading: post.title
      }" class="md:!pt-12" />
      <article class="page-container grid md:grid-cols-[1fr_28rem] gap-site md:gap-18">
        <div>
          <NuxtPicture
            v-if="post.thumbnail?.url && post.fields?.layout !== 'image_header'"
            :src="post.thumbnail.url"
            :alt="post.thumbnail.alt"
            :img-attrs="{ class: 'w-full mb-6' }"
          />
          <div v-html="post.content" class="text-base text-black prose max-w-[85ch]" />

          <div v-if="post.tags || post.categories" class="flex gap-2 text-sm text-primary mt-8 font-medium">
            <Icon name="ri:price-tag-3-line" class="text-base relative translate-y-(--border-width)" />
            <ul class="flex flex-wrap gap-2">
              <li v-for="category in post.categories" :key="category.id">
                <NuxtLink :to="`/news/page/1/?categories=${category.id}`" class="hover:underline">
                  <NewsCategory :category="category" />
                </NuxtLink>
              </li>
              <li v-for="tag in post.tags" :key="tag.id">
                <NuxtLink :to="`/news/page/1/?tags=${tag.id}`" class="hover:underline">
                  <NewsCategory :category="tag" />
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
        <aside>
          <div class="sticky top-navbar flex flex-col gap-site">
            <NewsMore v-if="relatedPosts && relatedPosts.length" :posts="relatedPosts" />
            <NewsPressCorner />
          </div>
        </aside>
      </article>
    </div>
  </main>
</template>