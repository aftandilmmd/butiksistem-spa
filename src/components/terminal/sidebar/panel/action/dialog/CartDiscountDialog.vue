<template>
  <q-card class="flex flex-col w-full xl:w-6/12">
    <div class="w-full bg-[#002640] p-6" align="center">
      <h1 class="m-0 text-xl text-white mx-auto font-normal uppercase">
        SEPET İNDİRİMİ YAP
      </h1>
    </div>

    <q-card-section
      class="px-8 py-16 w-full q-pt-none flex-1 flex flex-center mt-3"
    >
      <div class="relative w-full flex flex-row items-center gap-5">
        <q-input
          ref="discountInputRef"
          outlined
          class="flex-1 text-right text-xl"
          placeholder="İndirim Miktarı"
        />

        <q-btn-group unelevated class="absolute right-0 mr-2">
          <q-btn
            :class="`text-xs ${
              detail.meta.discountType == 'percent'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`"
            padding="0.7rem 1rem"
            icon="percent"
          />
          <q-btn
            :class="`text-xs ${
              detail == 'fixed'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`"
            padding="0.7rem 1rem"
            icon="currency_lira"
          />
        </q-btn-group>
      </div>
    </q-card-section>

    <q-card-actions align="right" class="p-8 py-5 bg-gray-100">
      <q-btn
        flat
        label="İptal"
        color="grey-7"
        padding="8px 2rem"
        v-close-popup
      />
      <q-btn
        unelevated
        label="Uygula"
        color="dark"
        padding="8px 2rem"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { onMounted, ref } from "vue";

const discountInputRef = ref(null);

const detail = ref({
  transactionType: "discount", // discount, custom
  variant: {
    quantity: 1,
  },
  meta: {
    discountType: "percent", // percent, fixed
    amount: 0,
  },
});

onMounted(() => {
  setTimeout(() => discountInputRef.value.focus(), 100);
});
</script>
