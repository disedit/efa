<template>
  <input
    type="checkbox"
    v-bind="$attrs"
    class="checkbox-input"
  />
</template>

<style lang="scss" scoped>
.checkbox-input {
  appearance: none;
  background-color: var(--color-true-white);
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.5em;
  height: 1.5em;
  border: var(--border-width) solid var(--color-primary);
  border-radius: 0;
  display: grid;
  place-content: center;

  &::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: .25s transform ease-in-out;
    box-shadow: inset 1em 1em var(--color-primary);
    border-radius: 100%;
  }

  &:checked::before {
    transform: scale(1);
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 2px var(--color-primary);
  }
}

@media (max-width: 46rem) {
  .checkbox-input {
    width: 1.75em;
    height: 1.75em;
  }
}
</style>
