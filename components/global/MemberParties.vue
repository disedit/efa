<script setup>
defineProps({ block: Object })
const { $wp } = useNuxtApp()
const { data: members } = await useAsyncData(
  `memberParties`,
  () => $wp.parties()
)

const memberParties = members.value.filter(party => !party.is_individual_member)
const individualMembers = members.value.filter(party => party.is_individual_member)

function hover(svgArea) {
  const svgElement = document.querySelector(`#${svgArea}`)
  if (svgElement) {
    svgElement.classList.add('hover')
  }
}

function unhover(svgArea) {
  const svgElement = document.querySelector(`#${svgArea}`)
  if (svgElement) {
    svgElement.classList.remove('hover')
  }
}

const hovering = ref(false)
onMounted(() => {
  // Regions
  const regions = document.querySelectorAll('#Regions g')
  regions.forEach(region => {
    region.addEventListener('mouseenter', () => {
      hovering.value = region.id
    })
    region.addEventListener('mouseleave', () => {
      hovering.value = false
    })
    region.addEventListener('click', () => {
      openArea(region.id)
    })
  })
})

const modalParty = ref(null)
const selectedParty = ref(null)
function openMember (member) {
  selectedParty.value = member
  nextTick(() => {
    modalParty.value.open()
  })
}

const modalRegion = ref(null)
const selectedRegion = ref(null)
function openArea (area) {
  const parties = members.value.filter(party => party.svg_area === area)
  selectedRegion.value = {
    name: parties[0].region,
    parties: parties
  }
  nextTick(() => {
    modalRegion.value.open()
  })
}
</script>

<template>
  <section class="member-parties page-container pt-inner grid md:grid-cols-2">
    <div>
      <ul class="members">
        <li v-for="member in memberParties" :key="member.id">
          <a
            href="#"
            class="member"
            @mouseenter="hover(member.svg_area)"
            @mouseleave="unhover(member.svg_area)"
            @click.prevent="openMember(member)"
            :class="{ hover: hovering === member.svg_area }"
          >
            <span class="member-acronym">
              {{ member.acronym }}
            </span>
            <span class="member-name">{{ member.name }}</span>
          </a>
        </li>
      </ul>

      <template v-if="individualMembers.length > 0">
        <h2 class="font-bold mt-8 text-md text-primary">Individual members</h2>
        <ul class="members">
          <li v-for="member in individualMembers" :key="member.id">
            <a
              href="#"
              class="member"
              @mouseenter="hover(member.svg_area)"
              @mouseleave="unhover(member.svg_area)"
              @click.prevent="openMember(member)"
              :class="{ hover: hovering === member.svg_area }"
            >
              <span class="member-picture">
                <NuxtImg :src="member.logo" />
              </span>
              <span class="member-name">{{ member.name }}</span>
            </a>
          </li>
        </ul>
      </template>
    </div>
    <div class="hidden md:block">
      <div v-html="block.svg" class="map sticky top-navbar flex justify-end" />
    </div>
  </section>
  <UtilsModal
    v-if="selectedParty"
    ref="modalParty"
    :label="selectedParty.is_individual_member ? 'Individual Member' : 'Member Party'"
  >
    <ElementsMemberParty :party="selectedParty" />
  </UtilsModal>
  <UtilsModal
    v-if="selectedRegion"
    ref="modalRegion"
    :label="selectedRegion.name"
  >
    <ul class="flex flex-col gap-12">
      <li v-for="party in selectedRegion.parties" :key="party.id">
        <ElementsMemberParty :party="party" />
      </li>
    </ul>
  </UtilsModal>
</template>

<style lang="scss">
.member-parties {
  .members {
    display: flex;
    flex-direction: column;
    font-size: var(--text-base);
  }

  .member {
    display: flex;
    align-items: center;
    gap: .5em;
    padding: .25em 0;

    &-acronym {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--color-primary);
      color: var(--color-white);
      font-weight: 700;
      width: 3.5em;
      height: 1.75em;
      transition: .25s ease;
      font-size: .9em;
    }

    &-picture img {
      width: 3.5em;
      height: 3.5em;
      object-fit: cover;
    }

    &-name {
      transition: .25s ease;
      color: var(--color-black);
    }

    &:hover,
    &.hover {
      .member-acronym {
        background-color: var(--color-secondary);
      }
    
      .member-name {
        font-weight: 700;
      }
    }
  }

  .map {
    svg {
      max-height: calc(100svh - var(--spacing-navbar) - (var(--spacing) * 4));
    }

    #Regions path {
      stroke-width: 1px;
      transition: .25s ease;
    }

    #Regions g:hover path,
    #Regions g.hover path {
      stroke-width: 3.5px;
      cursor: pointer;
    }
  }
}
</style>
