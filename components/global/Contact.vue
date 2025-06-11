<script setup>
defineProps({ block: Object })
const settings = await useSettings()
const form = reactive({
  name: '',
  email: '',
  organisation: '',
  message: '',
})
</script>

<template>
  <section class="page-container grid md:grid-cols-2 gap-site md:gap-12 text-primary">
    <div class="flex flex-col gap-site">
      <div>
        <div class="flex items-center gap-2">
          <LogoEFAMark class="h-[1.5rem]" />
          <span class="text-[2rem] font-medium -translate-y-[1px]">European Free Alliance</span>
        </div>

        <div v-html="settings.footer.address" class="prose text-base leading-tight" />
      </div>

      <UtilsSocials :socials="settings.socials" class="text-md" />

      <div class="mt-12">
        <div class="w-fit py-2 px-site bg-primary font-bold text-white text-base">Map</div>
        <div v-html="block.map" class="map bordered" />
      </div>
    </div>
    <div>
      <ElementsTab label-size="base" edge>
        <template #label>
          Contact Form
        </template>
        <form class="">
          <div class="divide-y-(--border-width)">
            <FormFloatInput
              name="name"
              label="Full name"
              v-model="form.name"
              required
            />
            <FormFloatInput
              type="email"
              name="email"
              label="Email address"
              v-model="form.email"
              required
            />
            <FormFloatInput
              name="organisation"
              label="Organisation"
              v-model="form.organisation"
            />
            <FormFloatInput
              type="textarea"
              name="message"
              label="Message"
              v-model="form.message"
              required
            />
          </div>
          <div class="flex gap-site p-4 items-center justify-between">
            <label class="flex text-sm gap-2 font-medium">
              <FormCheckbox
                name="privacy"
                value="I have read and agree to the Terms and Conditions."
                required
              />
              <span>
                I have read and agree to the
                <a href="https://efaparty.eu/privacy-policy/" target="_blank" class="underline hover:font-bold hover:-tracking-[0.0225em]">
                  Privacy Policy
                </a>
              </span>
            </label>
            <div>
              <FormButton
                type="submit"
                name="subscribe"
                id="mc-embedded-subscribe"
                value="Submit"
                class="text-md"
              />
            </div>
          </div>
        </form>
      </ElementsTab>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.map {
  :deep(iframe) {
    width: 100%;
    height: 24.5rem;
  }
}
</style>