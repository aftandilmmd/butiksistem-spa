<template>
  <q-card class="flex flex-col">
    <div class="w-full bg-[#002640] p-6">
      <h1 class="m-0 text-xl text-white mx-auto font-normal">
        {{ getProductName(item) }}
      </h1>
    </div>

    <q-card-section class="px-8 flex flex-row gap-4 items-center my-8">

      <q-btn
        @click="decQuantity"
        class="h-10 w-10 mx-auto"
        round
        icon="remove"
      />

      <div class="w-7/12 mx-auto relative flex flex-col items-center">

        <input
          v-model="variant_form.attributes.quantity"
          class="w-full rounded p-3 py-2 text-3xl border-2 border-solid border-gray-300 focus:border-gray-400 text-center"
        />

        <span class="absolute bottom-0 -mb-8 text-lg text-gray-400 font-normal">adet</span>

      </div>

      <q-btn
        @click="incQuantity"
        class="h-10 w-10 mx-auto"
        round
        icon="add"
      />

    </q-card-section>

    <q-card-section class="px-8 w-full q-pt-none flex-1 flex flex-center py-8">

      <div class="w-full flex flex-row">

        <q-btn-group unelevated class="w-full mb-8" spread>

          <q-btn
            @click="setTransactionType('discount')"
            no-caps
            :class="`${
              variant_form.meta.transaction_type === 'discount'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`"
            padding="0.5rem"
            label="İndirim"
          />

          <q-btn
            @click="setTransactionType('custom')"
            no-caps
            :class="`${
              variant_form.meta.transaction_type === 'custom'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`"
            padding="0.5rem"
            label="Özel Fiyat"
          />

        </q-btn-group>

      </div>

      <div class="w-full flex flex-row items-center gap-5">

        <div v-if="variant_form.meta.transaction_type == 'discount'">

          <q-btn-group unelevated>

            <q-btn
              @click="setDiscountType('percent')"
              :class="`text-xs ${
                variant_form.meta.discount_type == 'percent'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`"
              padding="1rem 1rem"
              icon="percent"
            />

            <q-btn
              @click="setDiscountType('fixed')"
              :class="`text-xs ${
                variant_form.meta.discount_type == 'fixed'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`"
              padding="1rem 1rem"
              icon="currency_lira"
            />

          </q-btn-group>

          <div>&nbsp;</div>

        </div>

        <q-input
          :error="is_over_discounted"
          :error-message="over_discount_message"
          outlined
          type="number"
          v-model="variant_form.meta.amount"
          class="flex-1 text-right text-xl"
        >
          <template v-if="variant_form.meta.transaction_type == 'discount'" v-slot:prepend>

            <q-icon v-if="variant_form.meta.discount_type == 'percent'" name="percent" />

            <q-icon v-if="variant_form.meta.discount_type == 'fixed'" name="currency_lira" />

          </template>

          <template v-else v-slot:prepend>
            <q-icon name="currency_lira" />
          </template>

        </q-input>

      </div>

      <div v-if="has_discount" class="absolute left-0 top-0 right-0 bottom-0 bg-white flex flex-center">

        <q-btn @click="removeDiscount" :label="remove_meta_price_message" text-color="grey-10" color="white" class="py-3" />

      </div>

    </q-card-section>

    <dialog-card-actions
      confirm-button-text="Uygula"
      @confirm="update"
      :disabled="is_over_discounted"
    />
  </q-card>
</template>

<script setup lang="ts">

import DialogCardActions from 'src/components/terminal/_shared/dialog/DialogCardActions.vue';

import { ref, computed, onBeforeMount } from 'vue';
import { cloneDeep } from 'lodash';
import { useCartStore } from 'src/stores/terminal/cart-store';
import { useQuasar } from 'quasar';
import { Money } from 'src/utils/Money';
import { CartItemInterface, DiscountType, TransactionType } from 'src/core/types/model'

import {
  isCartItemPriceUpdated,
  isCartItemVariantOverDiscounted,
  getCartItemVariantMetaAmount,
  removeCartItemDiscount,
  setCartItemVariant,
} from 'src/resources/Cart';

import { getProductName, getProductFirstVariant, getVariantQuantity } from 'src/resources/Product';

const cartStore = useCartStore();
const $q = useQuasar();

const props = defineProps<{ item: CartItemInterface }>()
const emit  = defineEmits<{ (e: 'update', value: CartItemInterface): void }>()

let updated_item   = cloneDeep(props.item);
const variant_form = ref({
  type  : 'variants',
  id    : 0,

  attributes:{
    name     : '',
    price    : 0,
    quantity : 0,
  },

  meta:{
    hash_id: '',
    transaction_type: 'custom',
    discount_type: 'percent',
    amount: null
  }
});

onBeforeMount(() => {
  variant_form.value = JSON.parse(JSON.stringify(getProductFirstVariant(props.item)));
});

let has_discount = computed(() => isCartItemPriceUpdated(props.item) );
let amount       = computed(() => getCartItemVariantMetaAmount(props.item) );
let is_over_discounted = computed(() => isCartItemVariantOverDiscounted(props.item, variant_form.value) );

let over_discount_message = 'Uyarı! Ürün fiyatı eksiye düştü.';

let remove_meta_price_message = computed(() => {
return variant_form.value.meta.transaction_type === 'custom' ?
      `${Money(amount.value)} ÖZEL FİYATI KALDIR.` :
      `${amount.value}${ variant_form.value.meta.discount_type === 'fixed' ? '₺' : '%' } İNDİRİMİ KALDIR.`;
});

function decQuantity(): void {
  if ( getVariantQuantity(variant_form.value) > 1){
    variant_form.value.attributes.quantity--;
  }
}

function incQuantity(): void {
  variant_form.value.attributes.quantity++;
}

function setTransactionType(type: TransactionType): void {
  variant_form.value.meta.transaction_type = type;
}

function setDiscountType(type: DiscountType): void {
  variant_form.value.meta.discount_type = type;
}

function removeDiscount(): void {
  variant_form.value = removeCartItemDiscount( props.item ).relations.variants[0]
}

function update(): void {

  if (is_over_discounted.value) return;

  updated_item = setCartItemVariant(updated_item, variant_form.value);

  cartStore.update(updated_item);

  emit('update', updated_item);

  $q.notify({
    icon   : 'check',
    type   : 'positive',
    message: 'Sepet güncellendi.',
  });

}

</script>
