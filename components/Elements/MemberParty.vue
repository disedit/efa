<script setup>
const props = defineProps({
  party: { type: Object, required: true }
})

const { platforms } = useUtils()

const socials = props.party.links ? props.party.links.map(({ platform, url: link }) => {
  return {
    name: platforms[platform].name,
    link,
    icon: platforms[platform].icon,
  }
}) : null

// Remove protocol, trailing slash and www from URLs
const cleanUrl = (url) => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace(/^www\./, '') + urlObj.pathname.replace(/\/$/, '')
  } catch (e) {
    return url // Return original if URL parsing fails
  }
}

// Remove spaces and non-numeric characters from phone numbers
const cleanTel = (tel) => {
  return tel.replace(/\D/g, '')
}
</script>

<template>
  <article class="text-primary md:p-6">
    <div class="grid grid-cols-[1fr_75px] md:grid-cols-[1fr_200px]">
      <div class="flex flex-col gap-4 md:gap-6">
        <h3 class="font-extrabold text-xl leading-none text-balance">
          {{ party.name }}
        </h3>
        <address class="not-italic">
          <div>{{ party.address }}</div>
          <strong>{{ party.region }}</strong>
        </address>
        <div>
          <div v-if="party.phone" class="flex items-center gap-2">
            <Icon name="ri:phone-fill" />
            <a :href="`tel:${cleanTel(party.phone)}`" class="underlined-on-hover">
              {{ party.phone }}
            </a>
          </div>
          <div v-if="party.emal" class="flex items-center gap-2">
            <Icon name="ri:mail-line" />
            <a :href="`mailto:${party.email}`" class="underlined-on-hover">
              {{ party.email }}
            </a>
          </div>
          <div v-if="party.website" class="flex items-center gap-2">
            <Icon name="ri:global-line" />
            <a :href="party.website" class="underlined-on-hover">
              {{ cleanUrl(party.website) }}
            </a>
          </div>
        </div>
        <UtilsSocials v-if="socials" :socials="socials" />
      </div>
      <div>
        <NuxtImg
          :src="party.logo"
          alt="Party logo"
          class="float-right"
        />
      </div>
    </div>
  </article>
</template>

<style>

</style>