<template>
  <q-card class="flex flex-col">
    <div class="w-full bg-[#002640] p-6">
      <h1 class="m-0 text-xl text-white mx-auto font-normal">
        {{ CartItem(item).getName() }}
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
          v-model="item_form.attributes.quantity"
          @blur="checkQuantity"
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
              CartItem(item_form).getTransactionType() === 'discount'
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
              CartItem(item_form).getTransactionType() === 'custom'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`"
            padding="0.5rem"
            label="Özel Fiyat"
          />

        </q-btn-group>

      </div>

      <div class="w-full flex flex-row items-center gap-5">

        <div v-if="CartItem(item_form).getTransactionType() == 'discount'">

          <q-btn-group unelevated>

            <q-btn
              @click="setDiscountType('percent')"
              :class="`text-xs ${
                CartItem(item_form).getDiscountType() == 'percent'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`"
              padding="1rem 1rem"
              icon="percent"
            />

            <q-btn
              @click="setDiscountType('fixed')"
              :class="`text-xs ${
                CartItem(item_form).getDiscountType() == 'fixed'
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
          v-model="item_form.meta.pricing.amount"
          class="flex-1 text-right text-xl"
        >
          <template v-if="CartItem(item_form).getTransactionType() == 'discount'" v-slot:prepend>

            <q-icon v-if="CartItem(item_form).getDiscountType() == 'percent'" name="percent" />

            <q-icon v-if="CartItem(item_form).getDiscountType() == 'fixed'" name="currency_lira" />

          </template>

          <template v-else v-slot:prepend>
            <q-icon name="currency_lira" />
          </template>

        </q-input>

      </div>

      <div v-if="is_price_updated" class="absolute left-0 top-0 right-0 bottom-0 bg-white flex flex-center">

        <q-btn @click="removeDiscount" :label="discount_remove_message" text-color="grey-10" color="white" class="py-3" />

      </div>

    </q-card-section>

    <dialog-card-actions
      cancel-button-text="İptal"
      confirm-button-text="Uygula"
      @confirm="update"
      :disabled="is_over_discounted"
    />
  </q-card>
</template>

<script setup lang="ts">
import DialogCardActions from 'src/components/terminal/_shared/dialog/DialogCardActions.vue';

import { ref, computed } from 'vue';
import { DiscountType, TransactionType } from 'src/core/types/model'
import { cloneDeep } from 'lodash';
import { Money } from 'src/utils/Money';
import { positiveNotify } from 'src/utils/Notify';

import CartItem from 'src/core/models/CartItem';
import { CartItemType } from 'src/core/types/cart-types';
import { useCart } from 'src/core/composables/useCart';

const CartManager = useCart();

const props = defineProps<{ item: CartItemType }>()
const emit  = defineEmits<{ (e: 'update', value: CartItemType): void }>()

let item_form = ref<CartItemType>(cloneDeep(props.item));

let amount = computed(() => CartItem(props.item).getAmount() );
let is_price_updated = computed(() => CartItem(props.item).isPriceUpdated() );
let is_over_discounted = computed(() => CartItem(item_form.value).isOverDiscounted() );

let over_discount_message = 'Uyarı! Ürün fiyatı eksiye düştü.';
let discount_remove_message = computed(() => {

  if(CartItem(item_form.value).getTransactionType() === 'custom'){
    return `${Money(amount.value)} ÖZEL FİYATI KALDIR.`;
  }

  return `${amount.value}${ CartItem(item_form.value).getDiscountType() === 'fixed' ? '₺' : '%' } İNDİRİMİ KALDIR.`;
});

function decQuantity(): void {
  if ( CartItem(item_form.value).getQuantity() > 1){
    item_form.value.attributes.quantity--;
  }
}

function incQuantity(): void {
  item_form.value.attributes.quantity++;
}

function setTransactionType(type: TransactionType): void {
  item_form.value.meta.pricing.pricing_type = type;
}

function setDiscountType(type: DiscountType): void {
  item_form.value.meta.pricing.discount_type = type;
}

function removeDiscount(): void {
  item_form.value = CartItem(props.item).removeDiscount();
}

function update(): void {

  if (is_over_discounted.value) return;

  CartManager.updateItem(item_form.value.id, item_form.value);

  emit('update', item_form.value);

  positiveNotify('Sepet güncellendi.')

}

function checkQuantity(){

  if(item_form.value.attributes.quantity < 1){
    item_form.value.attributes.quantity = 1;
  }

}

</script>
