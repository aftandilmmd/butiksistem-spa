<template>
  <q-card class="flex flex-col w-full xl:w-6/12">

    <dialog-card-header>SEPET İNDİRİMİ YAP</dialog-card-header>

    <q-card-section class="px-8 py-16 w-full q-pt-none flex-1 flex flex-center mt-3">
      <div class="relative w-full flex flex-row items-center gap-5">
        <q-input
          v-model="pricing.amount"
          ref="input_ref"
          outlined
          class="flex-1 text-right text-xl"
          :placeholder="discount_placeholder"
        />

        <q-btn-group unelevated class="absolute right-0 mr-2">
          <q-btn
            @click="setDiscountType('percent')"
            :class="`text-xs ${ getDiscountButtonClassname('percent') }`"
            padding="0.7rem 1rem"
            icon="percent"
          />
          <q-btn
            @click="setDiscountType('fixed')"
            :class="`text-xs ${ getDiscountButtonClassname('fixed') }`"
            padding="0.7rem 1rem"
            icon="currency_lira"
          />
        </q-btn-group>
      </div>
    </q-card-section>

    <dialog-card-actions @confirm="applyDiscount" />
  </q-card>
</template>

<script setup lang="ts">
import { QCard, QCardSection, QInput, QBtnGroup, QBtn } from 'quasar';
import DialogCardActions from 'src/components/terminal/_shared/dialog/DialogCardActions.vue';
import DialogCardHeader from 'src/components/terminal/_shared/dialog/DialogCardHeader.vue';
import { PricingType } from 'src/core/types/cart-types';
import { onMounted, ref, computed } from 'vue';
import{ DiscountType } from 'src/core/types/model.d'

const input_ref = ref();

const pricing = ref<PricingType>({
  pricing_type: 'discount',
  discount_type: 'percent',
  amount: null
});

onMounted(() => {
  setTimeout(() => input_ref.value.focus(), 100);
});

const discount_placeholder = computed(() => pricing.value.discount_type === 'percent' ? 'Yüzde indirim miktarı' : 'Sabit indirim miktarı')

function setDiscountType(type: DiscountType){
  pricing.value.discount_type = type;
}

function getDiscountButtonClassname(type: DiscountType){
  return pricing.value.discount_type === type ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600';
}

function applyDiscount(){
  //
}
</script>
