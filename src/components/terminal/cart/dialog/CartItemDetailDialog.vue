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
          v-model="variantForm.attributes.quantity"
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
            @click="settransaction_type('discount')"
            no-caps
            :class="`${
              transaction_type === 'discount'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`"
            padding="0.5rem"
            label="İndirim"
          />

          <q-btn
            @click="settransaction_type('custom')"
            no-caps
            :class="`${
              transaction_type === 'custom'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`"
            padding="0.5rem"
            label="Özel Fiyat"
          />

        </q-btn-group>

      </div>

      <div class="w-full flex flex-row items-center gap-5">

        <div v-if="transaction_type == 'discount'">

          <q-btn-group unelevated>

            <q-btn
              @click="setdiscount_type('percent')"
              :class="`text-xs ${
                discount_type == 'percent'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`"
              padding="1rem 1rem"
              icon="percent"
            />

            <q-btn
              @click="setdiscount_type('fixed')"
              :class="`text-xs ${
                discount_type == 'fixed'
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
          ref="amountRef"
          type="number"
          v-model="variantForm.meta.amount"
          class="flex-1 text-right text-xl"
        >
          <template v-if="transaction_type == 'discount'" v-slot:prepend>

            <q-icon v-if="discount_type == 'percent'" name="percent" />

            <q-icon v-if="discount_type == 'fixed'" name="currency_lira" />

          </template>

          <template v-else v-slot:prepend>
            <q-icon name="currency_lira" />
          </template>

        </q-input>

      </div>

      <div v-if="has_discount" @click="removeMetaPrice" class="cursor-pointer absolute left-0 top-0 right-0 bottom-0 bg-white/80 flex flex-center">

        <white-label :label="remove_meta_price_message" />

      </div>

    </q-card-section>

    <dialog-card-actions
      confirm-button-text="Uygula"
      @confirm="update"
      :disabled="is_over_discounted"
    />
  </q-card>
</template>

<script>
import DialogCardActions from "src/components/terminal/_shared/dialog/DialogCardActions.vue";
import WhiteLabel from "src/components/_shared/labels/WhiteLabel.vue";
</script>

<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { cloneDeep } from "lodash";
import { useCartStore } from "src/stores/terminal/cart-store";
import { useQuasar } from "quasar";
import { Money } from "src/utils/Money";
import { isCartItemPriceUpdated, isCartItemVariantOverDiscounted, removeCartItemDiscount, setCartItemVariant} from "src/resources/Cart";

import {
  getProductName,
  getProductFirstVariant,
  getVariantMetaAmount,
  getVariantMetaDiscountType,
  getVariantMetaTransactionType,
  getVariantQuantity
} from "src/resources/Product";

const cartStore = useCartStore();
const $q = useQuasar();

const emit = defineEmits(["update"]);
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});

let amountRef     = ref(null);
const variantForm = ref({});

onBeforeMount(() => {
  variantForm.value = cloneDeep( getProductFirstVariant(props.item) );
});

let remove_meta_price_message = computed(() => {

  if( transaction_type.value === "custom" ){
    return `${Money(amount.value)} ÖZEL FİYATI KALDIR.`
  }

  return `${amount.value}${ discount_type.value === "fixed" ? "₺" : "%" } İNDİRİMİ KALDIR.`;

});

let has_discount       = computed(() => isCartItemPriceUpdated(props.item) );
let transaction_type   = computed(() => getVariantMetaTransactionType(variantForm.value) );
let discount_type      = computed(() => getVariantMetaDiscountType(variantForm.value) );
let amount             = computed(() => getVariantMetaAmount(variantForm.value) );
let is_over_discounted = computed(() => isCartItemVariantOverDiscounted(props.item, variantForm.value) );

let over_discount_message = "Uyarı! Ürün fiyatı eksiye düştü.";

function decQuantity() {
  if ( getVariantQuantity(variantForm.value) > 1){
    variantForm.value.attributes.quantity--;
  }
}

function incQuantity() {
  variantForm.value.attributes.quantity++;
}

function settransaction_type(type) {
  variantForm.value.meta.transaction_type = type;
}

function setdiscount_type(type) {
  variantForm.value.meta.discount_type = type;
}

function removeMetaPrice() {
  removeCartItemDiscount( props.item );
}

function update() {

  if (is_over_discounted.value) return false;

  let updated_item = cloneDeep(props.item);

  updated_item     = setCartItemVariant(updated_item, variantForm.value);

  cartStore.updateItem( updated_item );

  emit("update", updated_item);

  $q.notify({
    icon   : "check",
    type   : "positive",
    message: "Sepet güncellendi.",
  });

}

</script>
