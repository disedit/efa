<script setup>
const settings = await useSettings()
</script>

<template>
  <footer class="text-primary font-medium p-site">
    <div class="grid grid-cols-2">
      <SiteFooterDetails :address="settings.footer.address" :socials="settings.socials" />
      <SiteFooterNewsletter />
    </div>
    <div class="grid grid-cols-2 mt-10">
      <SiteFooterEPDisclaimer :disclaimer="settings.footer.ep_disclaimer" />
      <SiteFooterLinks :links="settings.footer.links" class="self-end justify-self-end" />
    </div>
  </footer>
</template>

<style>

</style>