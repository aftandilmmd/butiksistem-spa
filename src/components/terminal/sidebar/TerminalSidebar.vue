<template>
  <div class="flex flex-col bg-white border-0 border-l border-solid border-gray-200">

    <div v-if="currentPanel == 'cart'" class="h-full flex flex-col">

      <div class="flex w-full h-20 bg-[#263238]">

        <div v-if="CartManager.hasCustomer()" class="flex-1 flex items-center px-4">

          <div class="flex-1 flex flex-col py-2">

            <span class="font-semibold text-base text-gray-200">
              {{ CartManager.getCustomerFullName() }}
            </span>

            <span v-if="CartManager.getCustomerPhone()" class="font-medium text-gray-500 text-md">
              {{ CartManager.getCustomerPhone() }}
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
          :disabled="!CartManager.hasItems()"
          @click="currentPanel = 'action'"
          icon="more_horiz"
          color="blue-grey-10"
          text-color="white"
          size="md"
          unelevated
          class="ml-auto rounded-none w-24 border-0 border-l border-solid border-gray-900"
        />

      </div>

      <div v-if="CartManager.hasItems()" class="relative z-20 flex flex-col flex-1 bg-white overflow-hidden">
        <q-scroll-area class="w-full flex-1">
          <cart-items />
        </q-scroll-area>

        <cart-actions
          @confirm-click="showPaymentConfirmation"
          @fastpay-click="showPaymentDialog"
        />
      </div>

      <empty-cart-message v-else />

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

<script setup lang="ts">
import CartItems from 'src/components/terminal/cart/CartItems.vue';
import CartActions from 'src/components/terminal/cart/CartActions.vue';
import CustomerPanel from 'src/components/terminal/sidebar/panel/CustomerPanel.vue';
import ActionPanel from 'src/components/terminal/sidebar/panel/ActionPanel.vue';
import PaymentConfirmationDialog from 'src/components/terminal/payment/dialog/PaymentConfirmationDialog.vue';
import PaymentDialog from 'src/components/terminal/payment/dialog/PaymentDialog.vue';
import EmptyCartMessage from '../cart/EmptyCartMessage.vue';

import { ref, reactive, provide } from 'vue';
import { CustomerInterface } from 'src/core/types/cart-types';
import { positiveNotify } from 'src/utils/Notify';
import { useCart } from 'src/core/composables/useCart';
import { useCustomer } from 'src/core/composables/useCustomer';

const emit = defineEmits([
  'search-customer',
  'select-customer',
  'create-customer',
]);

provide('actionPanel', {
  complete: () => (currentPanel.value = 'cart'),
});

const CartManager = useCart();
const CustomerManager = useCustomer();

const dialogs = reactive({
  payment: false,
  payment_confirmation: false,
})

const currentPanel = ref('cart');

function selectCustomer(customer: CustomerInterface) {

  CustomerManager.addCustomer(customer);

  CartManager.setCustomer(customer);

  emit('select-customer', customer);

  positiveNotify('Müşteri seçildi.')

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
  CartManager.removeCustomer()
}
</script>
