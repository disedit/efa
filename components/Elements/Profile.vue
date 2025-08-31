<script lang="ts" setup>
defineProps({
  profile: { type: Object, required: true }
})

const showModal = ref(false)
const modalProfile = ref(null)
function openProfile (e) {
  e.stopPropagation()
  showModal.value = true
  nextTick(() => {
    modalProfile.value && modalProfile.value.open()
  })
}
</script>

<template>
  <article class="profile" @click.capture="openProfile">
    <div class="profile-card bordered gap-3 bg-true-white p-3 md:p-site">
      <ElementsProfileDetails :profile="profile" />
    </div>
    <div class="profile-shadow shadow-1 bordered bg-true-white" />
    <div class="profile-shadow shadow-2 bordered bg-true-white" />
  </article>
  <UtilsModal
    v-if="showModal"
    ref="modalProfile"
    :label="profile.name"
  >
    <div class="full-profile">
      <ElementsProfileDetails :profile="profile" with-summary />
    </div>
  </UtilsModal>
</template>

<style lang="scss" scoped>
.profile {
  position: relative;
  --shift-by: 1.5rem;
  cursor: pointer;
  display: flex;

  &-card {
    position: relative;
    display: flex;
    flex-direction: column;
    z-index: 10;
    transition: .25s ease;
    height: 100%;
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

.full-profile {
  display: grid;
  grid-template-columns: 17rem 1fr;
  grid-template-areas:
    "picture details"
    "picture contact"
    "picture socials"
    "summary summary";
  gap: 1rem;
}

@media (max-width: 46rem) {
  .profile-card {
    --shift-by: .5rem;
  }

  .full-profile {
    grid-template-columns: 1fr;
    grid-template-areas:
      "picture"
      "details"
      "contact"
      "socials"
      "summary";
  }
}
</style>