<template>
  <q-card class="flex flex-col w-full xl:w-6/12">

    <dialog-card-header>SATIŞI PARK ET</dialog-card-header>

    <q-card-section class="px-8 py-16 w-full q-pt-none flex-1 flex flex-center mt-3">
      <div class="relative w-full flex flex-row items-center gap-5">
        <q-input
          v-model="title"
          ref="parkInputRef"
          outlined
          class="flex-1 text-right text-xl leading-relaxed"
          placeholder="Park başlığı"
        />
      </div>
    </q-card-section>

    <dialog-card-actions @confirm="parkCart" />

  </q-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useCart } from 'src/core/composables/useCart';
import { positiveNotify } from 'src/utils/Notify';
import DialogCardActions from 'src/components/terminal/_shared/dialog/DialogCardActions.vue';
import DialogCardHeader from 'src/components/terminal/_shared/dialog/DialogCardHeader.vue';

const emit = defineEmits(['parked']);

const title = ref('');
const parkInputRef = ref(null);
const CartManager = useCart();

function parkCart() {

  const park = CartManager.parkCurrentCart(title.value);

  emit('parked', park.id);

  CartManager.clearItems();

  positiveNotify('Sepetiniz park edildi.');

}

onMounted(() => {
  setTimeout(() => parkInputRef.value.focus(), 100);
});
</script>
