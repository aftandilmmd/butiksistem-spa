<template>
  <panel-wrapper>
    <template #title>Satış Tarihçesi</template>

    <div class="space-y-1">
      <div
        v-for="payment in 3"
        :key="payment"
        @click="editPayment(payment)"
        class="flex items-center cursor-pointer hover:bg-gray-100 px-2 rounded border border-gray-200 py-3"
      >
        <q-icon name="edit" class="text-base text-blue-500 mr-2" />
        <span class="font-normal text-gray-600">Nakit</span>
        <span class="text-sm text-gray-600 font-medium ml-auto"> 50TL </span>
      </div>
    </div>
  </panel-wrapper>

  <q-dialog v-model="dialogs.payment_dialog">
    <update-payment-dialog />
  </q-dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import PanelWrapper from './PanelWrapper.vue';
import UpdatePaymentDialog from 'src/components/terminal/history/dialog/UpdatePaymentDialog.vue';

defineProps({
  customer: {
    type: Object,
    default: ()=>({})
  }
})

const dialogs = reactive({
  payment_dialog: false,
});

function editPayment(payment) {
  dialogs.payment_dialog = true;
}

</script>
