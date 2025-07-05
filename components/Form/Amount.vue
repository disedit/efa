<script setup>
const props = defineProps({
  amounts: {
    type: Array,
    required: true
  },
  modelValue: {
    type: Number,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const selectedAmount = ref(props.amounts[0].amount)
const otherAmount = ref(5)

watch(selectedAmount, (newValue) => {
  if (newValue === 'Other') {
    emit('update:modelValue', otherAmount.value)
  } else {
    emit('update:modelValue', parseInt(newValue))
  }
})

watch(otherAmount, (newValue) => {
  selectedAmount.value = 'Other'
  emit('update:modelValue', newValue)
})
</script>

<template>
  <fieldset>
    <legend class="sr-only">Select an amount</legend>
    
    <div class="flex gap-site flex-wrap">
      <label
        v-for="amount in amounts"
        :key="amount.amount"
        :class="[
          'flex flex-col justify-center items-center md:min-w-[12ch] min-h-[8rem] md:min-h-[11rem] bordered text-md p-site cursor-pointer focus-within:ring-purple focus-within:ring-3 focus-within:ring-offset-2',
          {
            'bg-primary text-white hover:bg-primary': selectedAmount === amount.amount,
            'bg-true-white hover:bg-cream': selectedAmount !== amount.amount
          }
        ]"
      >
        <input type="radio" name="amount" :value="amount.amount" v-model="selectedAmount" class="sr-only" />
        <span class="text-2xl leading-none">{{ amount.amount }} &euro;</span>
      </label>

      <div :class="[
        'bordered flex flex-col text-lg text-md p-site cursor-pointer justify-center min-w-[12ch] min-h-[8rem] md:min-h-[11rem] focus-within:ring-purple focus-within:ring-3 focus-within:ring-offset-2',
        {
          'bg-primary text-white hover:bg-primary': selectedAmount === 'Other',
          'bg-true-white hover:bg-cream': selectedAmount !== 'Other'
        }
      ]"
      @click="selectedAmount = 'Other'">
        <div class="flex items-center gap-1 text-2xl leading-none">
          <input type="radio" name="amount" value="Other" v-model="selectedAmount" class="sr-only" />
          <input
            type="number"
            min="5"
            placeholder="5"
            v-model="otherAmount"
            class="focus:outline-0 field-sizing-content min-w-[3ch] max-w-[5ch] p-0 leading-none selection-orange border-b-2 border-purple/50 focus:border-white/50"
          />
          &euro;
        </div>
        <label for="otherAmount">
          Other
        </label>
      </div>
    </div>
  </fieldset>
</template>

<style>

</style>