<template>
  <span class="rounded bg-white text-gray-600 font-medium shadow border border-gray-200 border-t-gray-100 px-6 py-2">
    <template v-if="label">
      {{ label }}
    </template>
    <slot></slot>
  </span>
</template>

<script setup>

  const props = defineProps({
    label: {
      type: String,
      default: null,
    }
  });

</script>
