<template>
  <div class="flex flex-col bg-white">
    <div class="flex flex-col">
      <header class="h-20 flex flex-row border-0 border-b border-solid border-gray-200">
        <q-btn
          v-close-popup
          icon="arrow_back"
          color="blue-grey-10"
          text-color="white"
          size="lg"
          unelevated
          class="shadow-inner rounded-none w-24 mr-auto"
        />

        <q-btn
          no-caps
          label="Sepeti Göster"
          text-color="blue-7"
          unelevated
          class="shadow-inner text-base px-8"
        />
      </header>
    </div>

    <div class="flex-1 grid grid-cols-4">
      <div class="p-12 col-span-3 flex flex-col items-center border-0 border-r border-solid border-gray-200">
        <template v-if="is_completed">
          <div class="w-full flex-1 flex flex-col flex-center">
            <span v-if="is_over_paid" class="text-3xl mb-10">
              <strong class="font-semibold">
                {{ Money(-1 * cartStore.getTransactionsRemainingAmount) }}
              </strong>
              para üstü veriniz.
            </span>
            <q-btn
              @click="completePayment"
              color="green-5"
              padding="1.25rem 2rem"
              label="SATIŞI TAMAMLA"
              class="text-xl"
            />
          </div>
        </template>

        <template v-else>
          <div class="flex flex-row justify-center gap-6">
            <q-btn
              @click="setPaymentType('cash')"
              :class="`${
                paymentType == 'cash'
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
                paymentType == 'credit-card'
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
                :class="`${
                  amountType == 'remaining'
                    ? 'bg-gray-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`"
                :label="Money(cartStore.getTransactionsRemainingAmount)"
                no-caps
                unelevated
                class="rounded w-48 text-xl"
              />

              <q-btn
                @click="setAmountType('partial')"
                :class="`${
                  amountType == 'partial'
                    ? 'bg-gray-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`"
                label="Diğer"
                no-caps
                unelevated
                class="rounded w-48 text-xl"
              />
            </div>

            <div v-if="amountType == 'partial'" class="flex mt-8">
              <div class="w-6/12 mx-auto inline-flex flex-row items-center border-0 border-b border-solid border-gray-400 text-6xl">
                <q-icon name="currency_lira"></q-icon>
                <input
                  @keyup.enter="addTransaction"
                  ref="amountInputRef"
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
              :disabled="!isPaymentReady"
              padding="1rem 3rem"
              color="primary"
              label="Ödeme Ekle"
            />
          </div>
        </template>
      </div>

      <div class="col-span-1 flex flex-col">
        <div class="flex flex-col items-end text-gray-900 p-5 py-12 border-0 border-b border-solid border-gray-200">
          <span class="text-xl mb-1">Ödenecek Tutar</span>
          <span class="text-5xl">{{ Money(cartStore.getTotalPrice) }}</span>
        </div>

        <div class="relative flex flex-1">
          <q-scroll-area ref="transactionScroll" class="w-full">
            <div class="bg-white overflow-hidden">
              <TransitionGroup name="list" tag="ul" class="p-0 m-0 list-none divide-y divide-gray-200">
                <li v-for="transaction in cartStore.transactions" :key="transaction.hash_id">
                  <div class="group relative flex justify-between items-center p-5 hover:bg-gray-50 border-0 border-solid border-b border-gray-200">
                    <span class="text-xl font-light flex items-center">
                      {{ transaction.paymentType == 'cash' ? 'Nakit' : 'Kredi Kartı' }}
                    </span>

                    <span class="text-xl font-medium text-green-500">
                      {{ Money(transaction.amount) }}
                    </span>

                    <div class="hidden group-hover:flex bg-gray-100/50 absolute left-0 right-0 top-0 bottom-0 flex-center">
                      <q-btn
                        @click="cancelTransaction(transaction.hash_id)"
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
                  {{ cartStore.getTransactionsRemainingAmount < 0 ? Money(0) : Money(cartStore.getTransactionsRemainingAmount)}}
                </span>
              </div>
            </div>
          </q-scroll-area>
        </div>
      </div>
    </div>
  </div>

  <q-dialog maximized v-model="dialogs.payment_complete">
    <payment-success-dialog @restart="restart" />
  </q-dialog>
</template>

<script setup lang="ts">
import PaymentSuccessDialog from 'src/components/terminal/payment/dialog/PaymentSuccessDialog.vue';

import { ref, computed, watch, reactive } from 'vue';
import { Money } from 'src/utils/Money';
import { useCartStore } from 'src/stores/terminal/cart-store';
import { useQuasar } from 'quasar';
import { v4 as uuidv4 } from 'uuid';
import { PaymentType } from 'src/core/types/model';

type AmountType = 'remaining' | 'partial';

let paymentType = ref<PaymentType>('cash');
let amountType = ref<AmountType>('remaining');
let amount = ref(0);
let amountInputRef = ref<HTMLInputElement>();
let transactionScroll = ref();
let dialogs = reactive({
  payment_complete: false
});

let cartStore = useCartStore();
const $q = useQuasar();

const emit = defineEmits(['complete']);

let is_over_paid = computed(() => cartStore.getTransactionsRemainingAmount < 0);
let is_completed = computed(() => cartStore.getTransactionsRemainingAmount <= 0);

watch(amountType, () => {
  if (amountType.value == 'partial') {
    amount.value = 0;
    focusInput();
  } else {
    amount.value = cartStore.getTransactionsRemainingAmount;
  }
});


function setPaymentType(type: PaymentType) {
  paymentType.value = type;
}

function setAmountType(type: AmountType) {
  amountType.value = type;
}

function addTransaction() {
  cartStore.addTransaction({
    hash_id: uuidv4(),
    paymentType: paymentType.value,
    amount: amount.value,
  });

  amount.value = 0;

  transactionScroll.value.setScrollPosition('vertical', 10000, 400)

  focusInput();
}

function cancelTransaction(hash_id: string) {
  $q.dialog({
    title: 'Uyarı',
    message: 'Ödemeyi iptal etmek istediğinize emin misiniz?',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    cartStore.cancelTransaction(hash_id);
  });
}

let isPaymentReady = computed(() => {
  return amount.value !== 0;
});

function completePayment() {
  dialogs.payment_complete = true;
}

function focusInput() {
  setTimeout(() => {
    amountInputRef.value && amountInputRef.value.focus();
    amountInputRef.value && amountInputRef.value.select();
  }, 50);
}

function restart() {
  emit('complete');
}
</script>
