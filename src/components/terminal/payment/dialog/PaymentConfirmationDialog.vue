<template>
  <q-card flat class="bg-transparent">
    <q-card-section class="flex flex-col items-center text-center">
      <h1 class="text-white text-3xl font-normal drop-shadow-lg mb-12">
        Ödeme Yöntemi Seçiniz
      </h1>
      <div class="flex flex-row justify-center gap-6">
        <q-btn
          label="Nakit"
          no-caps
          class="rounded-md w-44 h-44 text-xl text-gray-800 bg-white"
        />

        <q-btn
          label="Kredi Kartı"
          no-caps
          class="rounded-md w-44 h-44 text-xl text-gray-800 bg-white"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useCartStore } from "src/stores/terminal/cart-store";
</script>

<style>
.q-dialog__backdrop {
  background: rgba(0, 38, 64, 0.6);
}
</style>
