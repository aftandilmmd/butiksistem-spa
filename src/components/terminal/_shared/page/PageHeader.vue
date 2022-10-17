<template>
  <header class="relative flex items-center border-0 border-b border-solid border-gray-200">
    <q-btn
      to="/terminal/menu"
      v-close-popup
      icon="menu"
      text-color="grey-9"
      size="lg"
      unelevated
      class="absolute left-0 rounded-none w-20 h-20"
    />

    <div class="h-20 mx-auto flex items-center">
      <h1 class="text-gray-900 font-normal text-2xl"><slot></slot></h1>
    </div>
  </header>
</template>

<script setup></script>
