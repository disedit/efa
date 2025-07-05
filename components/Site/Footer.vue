<script setup>
const settings = await useSettings()
</script>

<template>
  <footer class="text-primary font-medium p-site">
    <h2 class="sr-only">Footer</h2>
    <div class="grid md:grid-cols-2 gap-6 md:gap-10 footer-main">
      <SiteFooterDetails :address="settings.footer.address" :socials="settings.socials" class="area-details" />
      <SiteFooterNewsletter class="area-newsletter" />
    </div>
    <div class="grid footer-legal md:grid-cols-2 gap-6 md:gap-10 mt-10">
      <SiteFooterEPDisclaimer :disclaimer="settings.footer.ep_disclaimer" />
      <SiteFooterLinks :links="settings.footer.links" class="md:self-end md:justify-self-end" />
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  &-main {
    grid-template-areas: "details newsletter";
  }
}

.area {
  &-details {
    grid-area: details;
  }

  &-newsletter {
    grid-area: newsletter;
  }
}

@media (max-width: 46rem) {
  .footer {
    &-main {
      grid-template-areas: "newsletter" "details";
    }
  }
}
</style>