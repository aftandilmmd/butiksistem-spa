<template>
  <div class="flex flex-col bg-white border-0 border-l border-solid border-gray-200">

    <div v-if="currentPanel == 'cart'" class="h-full flex flex-col">

      <div class="flex w-full h-20 bg-[#263238]">

        <div v-if="cartStore.has_customer" class="flex-1 flex items-center px-4">

          <div class="flex-1 flex flex-col py-2">

            <span class="font-semibold text-base text-gray-200">
              {{ cartStore.getCustomerFullName }}
            </span>

            <span v-if="cartStore.customer.phone" class="font-medium text-gray-500 text-md">
              {{ cartStore.customer.phone }}
            </span>

          </div>

          <q-btn
            @click="removeCustomer"
            icon="close"
            align="left"
            text-color="white"
            size="md"
            unelevated
            class="rounded p-4"
          />

        </div>

        <q-btn
          v-else
          @click="showCustomerPanel"
          icon="person_add_alt_1"
          align="left"
          color="blue-grey-10"
          text-color="white"
          size="md"
          unelevated
          label="Müşteri Ekle"
          class="rounded-none flex-1 px-10"
        />

        <q-btn
          :disabled="!cartStore.has_items"
          @click="currentPanel = 'action'"
          icon="more_horiz"
          color="blue-grey-10"
          text-color="white"
          size="md"
          unelevated
          class="ml-auto rounded-none w-24 border-0 border-l border-solid border-gray-900"
        />

      </div>

      <div v-if="cartStore.has_items" class="relative z-20 flex flex-col flex-1 bg-white overflow-hidden">
        <q-scroll-area class="w-full flex-1">
          <cart-items />
        </q-scroll-area>

        <cart-actions
          @confirm-click="showPaymentConfirmation"
          @fastpay-click="showPaymentDialog"
        />
      </div>

      <div v-else class="flex items-center justify-center text-center flex-1">
        <div class="text-lg font-light text-gray-400">
          <p class="m-0 p-0">Satışa başlamak için sepete ürün ekle</p>
          <p class="m-0 p-0">Hedefine çok az kaldı 👍</p>
        </div>
      </div>

    </div>

    <action-panel
      v-if="currentPanel == 'action'"
      @hide="showCartPanel"
    />

    <customer-panel
      v-if="currentPanel == 'customer'"
      @hide="showCartPanel"
      @create-customer="createCustomer"
      @select-customer="selectCustomer"
    />

  </div>

  <q-dialog v-model="dialogs.payment_confirmation">
    <payment-confirmation-dialog />
  </q-dialog>

  <q-dialog maximized v-model="dialogs.payment">
    <payment-dialog @complete="completePayment" />
  </q-dialog>
</template>

<script>
import CartItems from 'src/components/terminal/cart/CartItems.vue';
import CartActions from 'src/components/terminal/cart/CartActions.vue';

import CustomerPanel from 'src/components/terminal/sidebar/panel/CustomerPanel.vue';
import ActionPanel from 'src/components/terminal/sidebar/panel/ActionPanel.vue';

import PaymentConfirmationDialog from 'src/components/terminal/payment/dialog/PaymentConfirmationDialog.vue';
import PaymentDialog from 'src/components/terminal/payment/dialog/PaymentDialog.vue';
</script>

<script setup>
import { ref, reactive, provide } from 'vue';
import { useCartStore } from 'src/stores/terminal/cart-store';
import { useQuasar } from 'quasar';

const emit = defineEmits([
  'search-customer',
  'select-customer',
  'create-customer',
]);

provide('actionPanel', {
  complete: () => (currentPanel.value = 'cart'),
});

const $q = useQuasar();

const dialogs = reactive({
  payment: false,
  payment_confirmation: false,
})

const cartStore    = useCartStore();
const currentPanel = ref('cart');

function selectCustomer(customer) {

  cartStore.setCustomer(customer);

  emit('select-customer', customer);

  $q.notify({
    type: 'positive',
    position:'bottom-right',
    message: 'Müşteri seçildi.'
  });

}

function createCustomer() {
  emit('create-customer');
}

function showCustomerPanel() {
  currentPanel.value = 'customer';
}

function showCartPanel() {
  currentPanel.value = 'cart';
}

function showPaymentConfirmation() {
  dialogs.payment_confirmation = true;
}

function showPaymentDialog() {
  dialogs.payment = true;
}

function completePayment() {
  dialogs.payment = false;
}

function removeCustomer() {
  cartStore.setCustomer({})
}
</script>
