<template>
  <q-tabs
    v-model="tab"
    align="justify"
    class="bg-white text-gray-600 shadow-2"
    :breakpoint="0"
    switch-indicator
    indicator-color="primary"
  >
    <q-tab name="content" icon="layers" class="py-5" />
    <q-tab name="numpad" icon="calculate" class="py-5" />
  </q-tabs>
</template>

<script setup>
import { ref, watch } from "vue";

const tab = ref("content");

const emit = defineEmits(["changed"]);

watch(tab, () => emit("changed", tab.value));
</script>
