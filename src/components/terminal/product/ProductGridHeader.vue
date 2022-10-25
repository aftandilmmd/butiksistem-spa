<template>
  <div class="flex items-center px-6">
    <h1 class="text-2xl mr-auto">Favoriler</h1>

    <span class="mr-4 text-gray-600">Gösterim:</span>
    <q-btn-group unelevated>
      <q-btn
        @click="setGridColCount(4)"
        :class="`${
          gridColCount == 4
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`"
        padding="0.35rem 1.2rem"
        >4</q-btn
      >
      <q-btn
        @click="setGridColCount(5)"
        :class="`${
          gridColCount == 5
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`"
        padding="0.35rem 1.2rem"
        >5</q-btn
      >
      <q-btn
        @click="setGridColCount(6)"
        :class="`${
          gridColCount == 6
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`"
        padding="0.35rem 1.2rem"
        >6</q-btn
      >
      <q-btn
        @click="setGridColCount(7)"
        :class="`${
          gridColCount == 7
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        }`"
        padding="0.35rem 1.2rem"
        >7</q-btn
      >
    </q-btn-group>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const gridColCount = ref(5);

const emit  = defineEmits<{ (e: 'set-grid-count', value: number): void }>()

function setGridColCount(count: number) {
  gridColCount.value = count;
  emit('set-grid-count', count);
}
</script>
