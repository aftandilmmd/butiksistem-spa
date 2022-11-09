<template>
  <q-page class="h-screen flex items-center bg-gray-900">
    <div class="w-1/2 pl-16 q-pa-md text-white">
      <q-list class="w-6/12">
        <q-item to="/terminal/sale" clickable>
          <q-item-section>Satış Ekranı</q-item-section>
        </q-item>

        <q-item to="/terminal/park" clickable>
          <q-item-section>Park</q-item-section>
        </q-item>

        <q-item to="/terminal/history" clickable>
          <q-item-section>İşlemler</q-item-section>
        </q-item>

        <q-item to="/terminal/return" clickable>
          <q-item-section>İade</q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section>Kasa İşlemleri</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>Ayarlar</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section>Yönetim Paneline Dön</q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="w-1/2 pl-16 text-white flex justify-end">
      <div class="w-6/12 border border-gray-500 border-solid p-5">
        <h1 class="m-0 p-0 text-lg font-medium text-gray-500 mb-5">
          Vardiya Satış Toplamları
        </h1>
        <div class="flex flex-col space-y-3">
          <p class="w-full flex justify-between m-0">
            <span class="text-gray-600">Nakit Satışlar</span>
            <span class="text-white font-semibold">844 TL</span>
          </p>
          <p class="w-full flex justify-between m-0">
            <span class="text-gray-600">Kredi Kartı Satışlar</span>
            <span class="text-white font-semibold">156 TL</span>
          </p>
          <q-separator color="grey-8" />
          <p class="w-full flex justify-between">
            <span class="text-gray-600">Toplam</span>
            <span class="text-white font-semibold">1000 TL</span>
          </p>
        </div>

        <div class="flex flex-col"></div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
</script>
