<script setup>
defineProps({ block: Object })
const hasOneFile = (document) => {
  return document.files && document.files.length < 2
}
</script>

<template>
  <div>
    <ul class="flex flex-col gap-site">
      <li v-for="document in block.documents" :key="document.id">
        <Component
          :is="hasOneFile(document) ? 'a' : 'article'"
          :class="['document bg-true-white text-purple bordered p-site gap-site', {
            'single-file': hasOneFile(document),
            'has-cover': !!document.cover
          }]"
          :href="hasOneFile(document) && document.files[0] ? document.files[0].file.url : null"
          target="_blank"
        >
          <NuxtImg
            v-if="document.cover"
            :src="document.cover"
            :alt="`Cover for ${document.title}`"
          />
          <Icon
            v-else
            name="ri:file-text-line"
            class="text-purple text-xl"
          />
          <div>
            <h3 class="document-title">
              {{ document.title }}
            </h3>
            <ul v-if="!hasOneFile(document)" class="document-files flex gap-2">
              <li v-for="file in document.files" :key="file.id">
                <NuxtLink :to="file.file.url" class="flex items-center gap-1">
                  <Icon name="ri:file-download-line" />
                  {{ file.tag }}
                </NuxtLink>
              </li>
            </ul>
            <div v-if="document.description" class="document-description">
              {{ document.description }}
            </div>
          </div>
        </Component>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.document {
  display: grid;
  grid-template-columns: auto 1fr;

  &-title {
    font-size: var(--text-base);
    font-weight: 600;
    transition: .25s ease;
  }

  &-files {
    display: flex;
    font-size: var(--text-sm);
    margin-left: -.25em;
    margin-bottom: .5em;

    a {
      width: fit-content;
      font-weight: 500;
      padding: .25em .5em;
      transition: .25s ease;

      &:hover {
        background-color: var(--color-cream);
      }
    }
  }

  &-description {
    font-size: var(--text-sm);
  }

  &.single-file {
    align-items: center;

    &:hover {
      .document-title {
        font-weight: 800;
        letter-spacing: -0.02em;
      }
    }
  }

  &.has-cover {
    grid-template-columns: 14rem 1fr;

    .document-title {
      font-size: var(--text-lg);
      font-weight: 600;
    }

    .document-files {
      width: fit-content;
      display: block;
      columns: 2;
      gap: 4rem;
    }
  }
}
</style>