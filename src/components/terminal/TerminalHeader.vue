<template>
  <header class="bg-white flex flex-row items-stretch border-0 border-b border-solid border-gray-200">

    <q-btn
      to="/terminal/menu"
      icon="menu"
      color="blue-grey-10"
      text-color="white"
      size="lg"
      unelevated
      class="rounded-none w-24"
    />

    <div class="flex-1 flex items-center">

      <q-icon
        name="search"
        size="lg"
        class="h-full px-6 text-gray-500"
        :class="{ 'opacity-30': isBarcodeMode }"
      />

      <input
        :disabled="isBarcodeMode"
        type="text"
        placeholder="Ürün adı, SKU veya Barkod ile ara"
        class="flex-1 text-2xl font-normal outline-none border-0 p-6 pl-5 placeholder:text-gray-300"
        :class="{ 'opacity-30': isBarcodeMode }"
      />

    </div>

    <q-btn
      @click="toggleSearchMode"
      icon="qr_code_scanner"
      size="xl"
      unelevated
      :class="[
        'relative rounded-none w-24 px-4',
        {
          'text-gray-300': !isBarcodeMode,
          'text-gray-800': isBarcodeMode,
        },
      ]"
    >

      <div v-if="props.searchMode == 'barcode'" class="barcode-animation"></div>

    </q-btn>

  </header>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  searchMode: {
    type: String,
    default: 'standard',
  },
});

const emit = defineEmits(['search-mode-changed']);

let isBarcodeMode = computed(() => props.searchMode == 'barcode');

function toggleSearchMode() {

  let mode = isBarcodeMode.value ? 'standard' : 'barcode';

  emit('search-mode-changed', mode);

}

</script>

<style scoped>
.barcode-animation {
  position: absolute;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  margin: auto;
  background-color: rgba(255, 35, 82, 0.2);
  border-bottom: 2px solid rgba(255, 35, 82, 0.5);
  -webkit-animation-name: barcode-animation;
  animation-name: barcode-animation;
  -webkit-animation-duration: 0.7s;
  animation-duration: 0.7s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
  animation-direction: alternate;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}

@-webkit-keyframes barcode-animation {
  0% {
    height: 0;
  }

  50% {
    height: 1rem;
  }

  to {
    height: 2rem;
  }
}

@keyframes barcode-animation {
  0% {
    height: 0;
  }

  50% {
    height: 1rem;
  }

  to {
    height: 2rem;
  }
}
</style>
