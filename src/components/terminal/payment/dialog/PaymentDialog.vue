<template>
  <div class="flex flex-col bg-white">
    <div class="flex flex-col">
      <header class="h-20 flex flex-row border-0 border-b border-solid border-gray-200">
        <q-btn
          @click="cancelTransactions"
          v-close-popup
          icon="arrow_back"
          color="blue-grey-10"
          text-color="white"
          size="lg"
          unelevated
          class="shadow-inner rounded-none w-24 mr-auto"
        />

        <q-btn v-if="!dialogs.cart" @click="toggleCart"
          icon="shopping_cart"
          no-caps
          label="Sepeti Göster"
          text-color="grey-8"
          unelevated
          class="text-base px-8"
        />

        <q-btn v-else @click="toggleCart"
          icon="remove_shopping_cart"
          no-caps
          label="Sepeti Gizle"
          text-color="grey-8"
          unelevated
          class="text-base px-8"
        />
      </header>
    </div>

    <div class="flex-1 grid grid-cols-4">

      <div v-if="! CartManager.hasItems()" class="p-12 col-span-3 flex flex-col items-center justify-center border-0 border-r border-solid border-gray-200">
        <span v-if="is_completed" class="text-2xl text-gray-600 flex flex-col items-center">
          <q-icon name="production_quantity_limits" class="text-6xl mb-8" />
          Sepetiniz boş
        </span>
      </div>

      <div v-else class="p-12 col-span-3 flex flex-col items-center border-0 border-r border-solid border-gray-200">
        <template v-if="is_completed">
          <div class="w-full flex-1 flex flex-col flex-center">
            <span v-if="is_completed" class="text-2xl text-green-800 mb-16 flex flex-col items-center">
              <q-icon name="check_circle_outline" class="text-8xl mb-8"></q-icon>
              Tutarın tamamı tahsil edildi. Siparişi tamamlayabilsiniz.
            </span>

            <span v-if="is_over_paid" class="text-3xl mb-16">
              <strong class="font-semibold">{{ remainder_amount }}</strong> para üstü veriniz.
            </span>

            <q-btn
              @click="completePayment"
              color="green-5"
              padding="1.25rem 2rem"
              label="Satışı tamamla"
              class="text-xl"
            />
          </div>
        </template>

        <template v-else>
          <div class="flex flex-row justify-center gap-6">
            <q-btn
              @click="setPaymentType('cash')"
              :class="`${
                payment_type == 'cash'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`"
              label="Nakit"
              no-caps
              unelevated
              class="rounded w-48 text-xl"
            />

            <q-btn
              @click="setPaymentType('credit-card')"
              :class="`${
                payment_type == 'credit-card'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`"
              label="Kredi Kartı"
              no-caps
              unelevated
              class="rounded w-48 text-xl"
            />
          </div>

          <div class="my-auto">
            <div class="flex flex-row justify-center gap-6">
              <q-btn
                @click="setAmountType('remaining')"
                :class="`${ amount_type === 'remaining' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-600' }`"
                :label="remaining_amount"
                no-caps
                unelevated
                class="rounded w-48 text-xl"
              />

              <q-btn
                @click="setAmountType('partial')"
                :class="`${ amount_type === 'partial' ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-600' }`"
                label="Diğer"
                no-caps
                unelevated
                class="rounded w-48 text-xl"
              />
            </div>

            <div v-if="amount_type === 'partial'" class="flex mt-8">
              <div class="w-6/12 mx-auto inline-flex flex-row items-center border-0 border-b border-solid border-gray-400 text-6xl">
                <q-icon name="currency_lira"></q-icon>
                <input
                  @keyup.enter="addTransaction"
                  ref="amount_input_element"
                  placeholder="Tutar"
                  v-model="amount"
                  class="w-full p-5 border-0 focus-within:outline-none text-center inline-block placeholder-gray-400 placeholder:font-light"
                  type="number"
                />
              </div>
            </div>
          </div>

          <div class="">
            <q-btn
              @click="addTransaction"
              :disabled="!is_payment_ready"
              padding="1rem 3rem"
              color="primary"
              label="Ödeme Ekle"
            />
          </div>
        </template>
      </div>

      <div class="col-span-1 flex flex-col">


        <template v-if="dialogs.cart">

          <cart-items v-if="CartManager.hasItems()"/>

          <empty-cart-message v-else />

        </template>

        <template v-else>

          <div class="flex flex-col items-end text-gray-900 p-5 py-12 border-0 border-b border-solid border-gray-200">
            <span class="text-xl mb-1">Ödenecek Tutar</span>
            <span class="text-5xl">{{ Money(CartManager.getTotalPrice()) }}</span>
          </div>

          <div class="relative flex flex-1">
            <q-scroll-area ref="transactions_scroll_area" class="w-full">
              <div class="bg-white overflow-hidden">
                <TransitionGroup name="list" tag="ul" class="p-0 m-0 list-none divide-y divide-gray-200">
                  <li v-for="transaction in CartManager.getTransactions()" :key="transaction.id">
                    <div class="group relative flex justify-between items-center p-5 hover:bg-gray-50 border-0 border-solid border-b border-gray-200">
                      <span class="text-xl font-light">
                        <span class="flex items-center" v-if="transaction.payment_type == 'cash'"><q-icon class="text-gray-700 mr-2" name="payments"/> Nakit</span>
                        <span class="flex items-center" v-if="transaction.payment_type =='credit-card'"><q-icon class="text-gray-700 mr-2" name="payment"/> Kredi Kartı</span>
                      </span>

                      <span class="text-xl font-medium text-green-500">
                        {{ Money(transaction.amount) }}
                      </span>

                      <div class="hidden group-hover:flex bg-gray-100/50 absolute left-0 right-0 top-0 bottom-0 flex-center">
                        <q-btn
                          @click="cancelTransaction(transaction.id)"
                          label="İptal Et"
                          class="bg-red-500 text-white"
                        />
                      </div>
                    </div>
                  </li>
                </TransitionGroup>
                <div class="flex justify-between items-center p-5 hover:bg-gray-50 border-0 border-solid border-b border-gray-200">
                  <span class="text-xl font-medium flex items-center">
                    Kalan Tutar
                  </span>
                  <span class="text-xl font-medium">
                    {{ remaining_amount }}
                  </span>
                </div>
              </div>
            </q-scroll-area>
          </div>

        </template>

      </div>

    </div>
  </div>

  <q-dialog maximized v-model="dialogs.payment_complete">
    <payment-success-dialog @restart="restart" />
  </q-dialog>
</template>

<script setup lang="ts">
import PaymentSuccessDialog from 'src/components/terminal/payment/dialog/PaymentSuccessDialog.vue';
import CartItems from '../../cart/CartItems.vue';
import EmptyCartMessage from '../../cart/EmptyCartMessage.vue';

import { ref, computed, reactive } from 'vue';
import { Money } from 'src/utils/Money';
import { useCart } from 'src/core/composables/useCart';
import { confirmDialog } from 'src/utils/DialogHelper';
import { PaymentType, TransactionAmountType } from 'src/core/types/cart-types';

const CartManager = useCart();

let payment_type = ref<PaymentType>('cash');
let amount_type = ref<TransactionAmountType>();
let amount = ref(0);
let amount_input_element = ref<HTMLInputElement>();
let transactions_scroll_area = ref();
let dialogs = reactive({
  payment_complete: false,
  cart: false,
});

const emit = defineEmits(['complete']);

let remainder_amount = computed(() => Money(-1 * CartManager.getTransactionsRemainingAmount()) );
let is_payment_ready = computed(() => amount.value !== 0 );
let is_over_paid = computed(() => CartManager.getTransactionsRemainingAmount() < 0);
let is_completed = computed(() => CartManager.getTransactionsRemainingAmount() <= 0);
let remaining_amount = computed(() => CartManager.getTransactionsRemainingAmount() < 0 ? Money(0) : Money(CartManager.getTransactionsRemainingAmount()));

function setPaymentType(type: PaymentType) {
  payment_type.value = type;
}

function setAmountType(type: TransactionAmountType) {

  amount_type.value = type;

  if(type === 'remaining'){
    amount.value = CartManager.getTransactionsRemainingAmount();
  }else{
    amount.value = 0;
    focusAmountInput();
  }

}

function addTransaction() {

  CartManager.addTransaction({
    payment_type: payment_type.value,
    amount: amount.value,
  });

  amount.value = 0;

  transactions_scroll_area.value.setScrollPosition('vertical', 10000, 400)

  focusAmountInput();

}

function cancelTransaction(id: string) {
  confirmDialog({
    title: 'Uyarı',
    message: 'Ödemeyi iptal etmek istediğinize emin misiniz?'
  })
  .then(() => CartManager.cancelTransaction(id));
}

function completePayment() {
  confirmDialog({
    title: 'Siparişi tamamla',
    message: 'Siparişi tamamlamak istediğinizi onaylıyor musunuz?',
    confirm_label: 'Evet, Tamamla',
    persistent: true
  })
  .then(() => {
    dialogs.payment_complete = true;
    CartManager.createOrder();
  });
}

function focusAmountInput() {
  setTimeout(() => {
    amount_input_element.value && amount_input_element.value.focus();
    amount_input_element.value && amount_input_element.value.select();
  }, 50);
}

function cancelTransactions(){
  CartManager.clearTransactions()
}

function restart() {
  emit('complete');
}

function toggleCart(){
  dialogs.cart = !dialogs.cart
}
</script>
