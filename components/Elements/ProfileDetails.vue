
<script setup>
const props = defineProps({
  profile: {
    type: Object,
    required: true
  },
  withSummary: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['openProfile'])

const { platforms } = useUtils()
const socials = props.profile.socials ? props.profile.socials.map(({ platform, url: link }) => {
  return {
    name: platforms[platform].name,
    link,
    icon: platforms[platform].icon,
  }
}) : null
</script>

<template>
  <div class="profile-picture">
    <NuxtImg
      :src="profile.picture"
      :alt="profile.name"
      class="profile-picture-img"
      sizes="800px"
    />
  </div>
  <div class="profile-details flex flex-col gap-1">
    <h2 :class="['profile-name font-extrabold text-primary leading-tighter', { 'text-md': !withSummary, 'text-lg': withSummary }]">
      <a :href="`#${profile.id}`" @click.prevent="emit('openProfile')">
        {{ profile.name }}
      </a>
    </h2>
    <p class="text-sm font-medium mb-1">
      {{ profile.description }}
    </p>
    <a
      v-if="profile.member_party"
      :href="profile.member_party.website"
      target="_blank"
      class="group flex gap-2 items-center text-sm font-medium leading-none"
    >
      <span v-if="profile.member_party.acronym" class="bg-primary text-white py-1 px-2 font-bold whitespace-nowrap">{{ profile.member_party.acronym }}</span>
      <span class="group-hover:bg-primary/15 group-hover:px-2 py-1 transition-all text-blackish group-hover:text-primary">{{ profile.member_party.name }}</span>
    </a>
  </div>
  <div v-if="profile.email" class="profile-contact text-sm font-medium">
    <div v-if="profile.email || profile.phone">
      <a
        :href="`mailto:${profile.email}`"
        class="flex items-center gap-2 transition-all text-blackish hover:text-primary"
      >
        <Icon name="ri:mail-line" class="text-primary text-[1.5rem] shrink-0" />
        {{ profile.email }}
      </a>
    </div>
    <div v-if="profile.phone">
      <a
        :href="`tel:${profile.phone.replaceAll(' ', '')}`"
        class="flex items-center gap-2 transition-all text-blackish hover:text-primary"
      >
        <Icon name="ri:phone-line" class="text-primary text-[1.5rem] shrink-0" />
        {{ profile.phone }}
      </a>
    </div>
  </div>
  <UtilsSocials
    v-if="socials"
    :socials="socials"
    class="profile-socials mt-auto text-base"
  />
  <div
    v-if="withSummary && profile.summary"
    class="profile-summary text-base"
    v-html="profile.summary"
  />
</template>

<style lang="scss" scoped>
.profile {
  &-picture {
    grid-area: picture;
    position: relative;

    &-img {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
    }

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--color-primary);
      opacity: .5;
      mix-blend-mode: lighten;
      transition: .25s ease;
    }
  }

  &-details {
    grid-area: details;
  }

  &-contact {
    grid-area: contact;
  }

  &-socials {
    grid-area: socials;
  }

  &-summary {
    grid-area: summary;
    border-top: 1.5px solid var(--color-primary);
    padding-top: 1rem;

    :deep(p) {
      margin-bottom: .75em;
    }
  }
}
</style>