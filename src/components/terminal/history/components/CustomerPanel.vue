<template>
  <panel-wrapper>
    <template #title>Müşteri Bilgileri</template>

    <div class="space-y-3">

      <div class="flex items-center break-all">
        <q-icon name="person_outline" class="text-xl text-blue-500 mr-3" />
        <span class="font-normal text-gray-700">{{ customer.full_name }}</span>
      </div>

      <div class="flex items-center break-all">
        <q-icon name="mail_outline" class="text-xl text-blue-500 mr-3" />
        <span class="font-normal text-gray-700">{{ customer.email }}</span>
      </div>

      <div class="flex items-center break-all">
        <q-icon name="phone" class="text-xl text-blue-500 mr-3" />
        <span class="font-normal text-gray-700">{{ customer.phone }}</span>
      </div>

    </div>
  </panel-wrapper>
</template>

<script setup lang="ts">
import PanelWrapper from './PanelWrapper.vue';

defineProps({
  customer: {
    type: Object,
    default: ()=>({})
  }
})

</script>
