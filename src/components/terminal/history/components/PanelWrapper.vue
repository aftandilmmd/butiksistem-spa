<template>
  <div class="w-full rounded-md bg-white p-5 shadow-md mb-5">
    <span class="block font-medium text-gray-700 text-sm mb-4">
      <slot name="title"></slot>
    </span>
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>
