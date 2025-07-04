<template>
  <form
    class="newsletter p-site md:p-7 validate bg-cream self-start ms-auto"
    action="https://e-f-a.us18.list-manage.com/subscribe/post?u=ac6d425391adfe5b91b4c11c5&amp;id=02445d05b4&amp;f_id=007e8ce6f0"
    method="post"
    id="mc-embedded-subscribe-form"
    name="mc-embedded-subscribe-form"
    target="_self"
  >
    <h3 class="newsletter-title font-extrabold text-lg leading-[1]">
      Become an insider
    </h3>
    <p class="text-base">Join our newsletter</p>

    <div class="flex flex-col gap-site mt-4 mt:my-6">
      <div class="flex gap-site">
        <label for="mce-FNAME" class="sr-only">First Name </label>
        <FormInput
          id="mce-FNAME"
          type="text"
          name="FNAME"
          placeholder="First Name"
        />

        <label for="newsletter_email" class="sr-only">Your e-mail</label>
        <FormInput
          id="newsletter_email"
          type="email"
          name="EMAIL"
          placeholder="Email *"
          required
        />

        <FormButton
          type="submit"
          name="subscribe"
          id="mc-embedded-subscribe"
          value="Subscribe"
        />
      </div>

      <label class="flex items-center text-sm gap-2">
        <FormCheckbox
          name="MMERGE3"
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

      <div aria-hidden="true" style="position: absolute; left: -5000px;">
          <input type="text" name="b_ac6d425391adfe5b91b4c11c5_02445d05b4" tabindex="-1" value="">
      </div>
    </div>
  </form>
</template>
