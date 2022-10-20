<template>
  <q-card class="flex flex-col w-full xl:w-6/12">
    <div class="w-full bg-[#002640] p-6" align="center">
      <h1 class="m-0 text-xl text-white mx-auto font-normal uppercase">
        NOT EKLE
      </h1>
    </div>

    <q-card-section
      class="px-8 py-16 w-full q-pt-none flex-1 flex flex-center mt-3"
    >
      <div class="relative w-full flex flex-row items-center gap-5">
        <q-input
          ref="noteInputRef"
          autogrow
          outlined
          class="flex-1 text-right text-xl leading-relaxed"
          placeholder="Sepeti Notu"
        />
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
        label="Kaydet"
        color="dark"
        padding="8px 2rem"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const noteInputRef = ref(null);

const detail = ref({
  transaction_type: 'discount', // discount, custom
  variant: {
    quantity: 1,
  },
  meta: {
    discountType: 'percent', // percent, fixed
    amount: 0,
  },
});

onMounted(() => {
  setTimeout(() => noteInputRef.value.focus(), 100);
});
</script>
