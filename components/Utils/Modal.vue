<script setup>
const props = defineProps({
  open: { type: Boolean, default: false },
  label: { type: String, default: null }
})

const dialog = ref(null)

const openModal = () => {
  dialog.value.showModal()
}

const closeModal = () => {
  dialog.value.close()
}

const closeFromEvent = (e) => {
  if (e.currentTarget === e.target) {
    closeModal()
  }
}

watch(() => props.open, (newVal) => {
  if (newVal) {
    openModal()
  } else {
    closeModal()
  }
})

defineExpose({
  open: openModal,
  close: closeModal
})
</script>

<template>
  <dialog ref="dialog" @click="closeFromEvent" class="modal bg-transparent relative backdrop:bg-cream/75">
    <div class="max-w-[900px] mx-auto">
      <div v-if="label" class="modal-tab flex items-center gap-8 relative bg-true-white text-primary text-base font-bold border-3 border-b-0 w-fit py-2 px-4">
        <h2>{{ label }}</h2>
        <button @click="closeModal" class="flex items-center cursor-pointer hover:text-orange" aria-label="Close modal">
          <Icon name="ri:close-large-fill" />
        </button>
      </div>
      <div class="relative -translate-y-[3px]">
        <div class="modal-content relative border-3 border-primary bg-true-white p-4 text-base">
          <slot />
        </div>
        <div class="shadow shadow-1" />
        <div class="shadow shadow-2" />
      </div>
    </div>
  </dialog>
</template>

<style lang="scss" scoped>
.modal {
  --shift-by: 1rem;
  position: fixed;
  inset: 0;
  transition: .25s ease;
  transition-behavior: allow-discrete;
  opacity: 1;
  padding: calc(var(--shift-by) * 2);
  overscroll-behavior: contain;
  margin: auto;
  max-height: 100%;
  max-width: 100%;
  width: 100%;
  

  &::backdrop {
    transition: .25s ease;
    opacity: 1;
  }

  &-tab {
    z-index: 10;
  }

  &-content {
    z-index: 5;
  }

  .shadow {
    position: absolute;
    inset: 0;
    border: 3px solid var(--color-primary);
    background: var(--color-true-white);
    transition: .5s ease;

    &-1 {
      z-index: 2;
      transform: translate(calc(var(--shift-by) / 2), calc(var(--shift-by) / 2));
    }

    &-2 {
      z-index: 1;
      transform: translate(var(--shift-by), var(--shift-by));
    }
  }
}

@starting-style {
  .modal {
    opacity: 0;
    transform: translateY(100px);

    &::backdrop {
      opacity: 0;
    }

    .shadow {
      &-1 {
        transform: translate(calc(var(--shift-by)), calc(var(--shift-by)));
      }

      &-2 {
        transform: translate(calc(var(--shift-by) * 2), calc(var(--shift-by) * 2));
      }
    }
  }
}

.modal:not([open]) {
  opacity: 0;
  transform: translateY(100px);

  &::backdrop {
    opacity: 0;
  }

  .shadow {
    &-1 {
      transform: translate(calc(var(--shift-by)), calc(var(--shift-by)));
    }

    &-2 {
      transform: translate(calc(var(--shift-by) * 2), calc(var(--shift-by) * 2));
    }
  }
}
</style>