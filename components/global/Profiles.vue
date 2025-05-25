<script setup>
const props = defineProps({ block: Object })

const { $wp } = useNuxtApp()

const { data: profiles } = await useAsyncData(
  `profiles`,
  () => $wp.profiles()
    .param('ids', props.block.profiles.join(','))
)

const platforms = {
  instagram: { name: 'Instagram', icon: 'fa6-brands:instagram' },
  facebook: { name: 'Facebook', icon: 'fa6-brands:facebook' },
  x: { name: 'X', icon: 'fa6-brands:x-twitter' },
  tiktok: { name: 'TikTok', icon: 'fa6-brands:tiktok' },
  email: { name: 'Email', icon: 'ri:mail-line' },
  youtube: { name: 'YouTube', icon: 'fa6-brands:youtube' },
  bluesky: { name: 'Bluesky', icon: 'ri:bluesky-line' },
  linkedin: { name: 'LinkedIn', icon: 'fa6-brands:linkedin' },
}

const socials = (links) => {
  return links.map(({ platform, url: link }) => {
    return {
      name: platforms[platform].name,
      link,
      icon: platforms[platform].icon,
    }
  })
}
</script>

<template>
  <section class="page-container profiles grid gap-10">
    <article
      v-for="profile in profiles"
      :key="profile.id"
      class="profile">
      <div class="profile-card border-3 gap-3 border-primary bg-true-white p-3 md:p-site">
        <div class="profile-picture">
          <NuxtImg
            :src="profile.picture"
            :alt="profile.name"
            class="profile-picture-img"
          />
        </div>
        <div class="flex flex-col gap-1">
          <h2 class="profile-name font-extrabold text-md text-primary leading-tighter">
            {{ profile.name }}
          </h2>
          <p class="text-sm font-medium mb-1">
            {{ profile.description }}
          </p>
          <a
            v-if="profile.member_party"
            :href="profile.member_party.website"
            target="_blank"
            class="group flex gap-2 items-center text-sm font-medium">
            <span v-if="profile.member_party.acronym" class="bg-primary text-white px-2 font-bold">{{ profile.member_party.acronym }}</span>
            <span class="group-hover:bg-primary/15 group-hover:px-2 transition-all text-black group-hover:text-primary">{{ profile.member_party.name }}</span>
          </a>
        </div>
        <UtilsSocials
          :socials="socials(profile.socials)"
          class="mt-auto text-base"
        />
      </div>
      <div class="profile-shadow shadow-1 border-3 bg-true-white border-primary" />
      <div class="profile-shadow shadow-2 border-3 bg-true-white border-primary" />
    </article>
  </section>
</template>

<style lang="scss" scoped>
.profiles {
  grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
}

.profile {
  position: relative;
  --shift-by: 1.5rem;

  &-card {
    position: relative;
    display: flex;
    flex-direction: column;
    aspect-ratio: 1 / 1.5;
    z-index: 10;
    transition: .25s ease;
  }

  &-picture {
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

  &:hover {
    .profile-card {
      transform: translate(calc(-1 * var(--shift-by)), calc(-1 * var(--shift-by)));
    }

    .profile-picture::before {
      opacity: 0;
    }

    .profile-shadow {
      opacity: 1;

      &.shadow-2 {
        transform: translate(calc(-1 * var(--shift-by) / 2), calc(-1 * var(--shift-by) / 2));
      }
    }
  }

  &-shadow {
    position: absolute;
    inset: 0;
    z-index: 1;
    opacity: 0;
    transition: .25s ease;
  }

  .shadow-2 {
    z-index: 2;
  }
}
</style>