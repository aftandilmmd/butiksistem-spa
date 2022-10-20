<template>
  <q-card class="flex flex-col w-full xl:w-6/12">
    <div class="w-full bg-[#002640] p-6" align="center">
      <h1 class="m-0 text-xl text-white mx-auto font-normal uppercase">
        SATIŞI PARK ET
      </h1>
    </div>

    <q-card-section
      class="px-8 py-16 w-full q-pt-none flex-1 flex flex-center mt-3"
    >
      <div class="relative w-full flex flex-row items-center gap-5">
        <q-input
          v-model="title"
          ref="parkInputRef"
          autogrow
          outlined
          class="flex-1 text-right text-xl leading-relaxed"
          placeholder="Park Notu"
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
        @click="parkCart"
        unelevated
        label="Park Et"
        color="dark"
        padding="8px 2rem"
        v-close-popup
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useParkStore } from 'src/stores/terminal/park-store';
import { useCartStore } from 'src/stores/terminal/cart-store';
import { ParkResource } from 'src/resources/ParkResource';

const emit = defineEmits(['parked']);

const $q = useQuasar();
const title = ref('');
const parkInputRef = ref(null);
const parkStore = useParkStore();
const cartStore = useCartStore();

function parkCart() {
  let park = ParkResource({
    title: title.value,
    cart: cartStore.parkState,
  });

  parkStore.addPark(park);

  emit('parked', park.hash_id);

  cartStore.reset();

  $q.notify({
    type: 'positive',
    icon: 'check',
    message: 'Sepetiniz park edildi.',
  });
}

onMounted(() => {
  setTimeout(() => parkInputRef.value.focus(), 100);
});
</script>
