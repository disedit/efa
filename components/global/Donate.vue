<script setup>
defineProps({ block: Object, context: Object })

const config = useRuntimeConfig()

const submitting = ref(false)
const error = ref(false)

const form = reactive({
  amount: 10,
  amount_other: 5,
  first_name: '',
  last_name: '',
  email: '',
  address: '',
  postal_code: '',
  city: '',
  country: 'BE'
})

const submit = async () => {
  if (submitting.value) return
  submitting.value = true

  try {
    const formData = new FormData()
    formData.append('amount', form.amount)
    formData.append('first_name', form.first_name)
    formData.append('last_name', form.last_name)
    formData.append('email', form.email)
    formData.append('address', form.address)
    formData.append('postal_code', form.postal_code)
    formData.append('city', form.city)
    formData.append('country', form.country)
    
    const response = await fetch(config.public.wpApiEndpoint + '/efa/donate', {
        method: 'post',
        body: formData,
    })
    const data = await response.json()

    if (data.status === 'success') {
      window.location = data.payload?._links?.checkout?.href
    } else {
      error.value = true
    }
  } catch(e) {
    error.value = true
  }
}

const countries = [
  { value: "AT", label: "Austria" },
  { value: "BE", label: "Belgium" },
  { value: "BG", label: "Bulgaria" },
  { value: "HR", label: "Croatia" },
  { value: "CY", label: "Cyprus" },
  { value: "CZ", label: "Czech Republic" },
  { value: "DK", label: "Denmark" },
  { value: "EE", label: "Estonia" },
  { value: "FI", label: "Finland" },
  { value: "FR", label: "France" },
  { value: "DE", label: "Germany" },
  { value: "GR", label: "Greece" },
  { value: "HU", label: "Hungary" },
  { value: "IE", label: "Ireland" },
  { value: "IT", label: "Italy" },
  { value: "LV", label: "Latvia" },
  { value: "LT", label: "Lithuania" },
  { value: "LU", label: "Luxembourg" },
  { value: "MT", label: "Malta" },
  { value: "MD", label: "Moldova" },
  { value: "NL", label: "Netherlands" },
  { value: "PL", label: "Poland" },
  { value: "PT", label: "Portugal" },
  { value: "RO", label: "Romania" },
  { value: "SK", label: "Slovakia" },
  { value: "SI", label: "Slovenia" },
  { value: "ES", label: "Spain" },
  { value: "SE", label: "Sweden" },
  { value: "VA", label: "Vatican City" }
]

onMounted(async () => {
  await setCurrentCountry()
})

async function setCurrentCountry() {
  const ipInfo = await fetch('https://free.freeipapi.com/api/json')
  const data = await ipInfo.json()

  if (data && data.countryCode) {
    const country = countries.find(c => c.value === data.countryCode)
    if (country) {
      form.country = country.value
    }
  }
}
</script>

<template>
  <section class="page-container text-primary grid lg:grid-cols-3 gap-site md:gap-12 !pt-0">
    <form @submit.prevent="submit" class="lg:col-span-2">
      <div v-html="block.text" class="prose hyphens-auto text-pretty text-md mb-8" />

      <div v-if="error" class="bg-orange text-true-white p-2 font-bold text-base mb-4">
        An error happened while trying to process your donation. Try again later.
      </div>
      <FormAmount
        name="amount"
        :amounts="block.amounts"
        v-model="form.amount"
        class="my-6 md:my-12"
      />
      <ElementsTab label-size="base" edge>
        <template #label>
          Personal information
        </template>
        
        <div class="divide-y-(--border-width)">
          <div class="grid md:grid-cols-2">
            <FormFloatInput
              name="firstName"
              label="First Name"
              v-model="form.first_name"
              required
              autocomplete="given-name"
            />
            <FormFloatInput
              name="lastName"
              label="Last Name"
              v-model="form.last_name"
              required
              wrapper-class="md:border-l-[2.5px] border-t-[2.5px] md:border-t-0"
              autocomplete="family-name"
            />
          </div>
          <FormFloatInput
            type="email"
            name="email"
            label="Email address"
            v-model="form.email"
            required
            autocomplete="email"
          />
          <FormFloatInput
            name="adddress"
            label="Address"
            v-model="form.address"
            required
            autocomplete="street-address"
          />
          <div class="grid md:grid-cols-4">
            <FormFloatInput
              name="postalCode"
              label="Postal code"
              v-model="form.postal_code"
              required
              autocomplete="postal-code"
            />
            <FormFloatInput
              name="city"
              label="City"
              v-model="form.city"
              required
              wrapper-class="md:col-span-3 md:border-l-[2.5px] border-t-[2.5px] md:border-t-0"
              autocomplete="address-level2"
            />
          </div>
          <FormFloatSelect
            name="country"
            label="Country"
            v-model="form.country"
            :options="countries"
            required
          />
        </div>
      </ElementsTab>

      <div class="flex flex-col gap-site mt-4 md:mt-6">
        <label class="flex items-center text-sm gap-2 font-medium">
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
        <div class="mt-4 md:mt-6">
          <FormButton
            type="submit"
            name="submit"
            value="Continue to payment"
            class="text-lg md:text-md w-full md:w-auto"
            :loading="submitting"
            loading-value="Loading..."
            icon="ri:bank-card-line"
          />
        </div>
      </div>
      <div class="mt-4 text-balance text-sm">
        Payment will be handled by our partner Mollie. You will be redirected to their secure payment page to complete your donation. EFA does not store your payment information.
      </div>
    </form>
    <div class="flex">
      <NuxtImg 
        v-if="block.image"
        :src="block.image"
        class="w-full h-full object-cover"
        sizes="100vw md:800px"
      />
    </div>
  </section>
</template>
