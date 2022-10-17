<template>
  <q-card class="flex flex-col">
    <q-card-section class="flex flex-row items-center relative">
      <q-btn
        @click="closeDialog"
        class="text-2xl z-50 font-light"
        icon="close"
        flat
        v-close-popup
      />
      <div
        class="flex flex-col items-center text-4xl flex-1 absolute left-[50%] translate-x-[-50%]"
      >
        <span class="mb-2">{{ getProductName(product) }}</span>
        <span
          v-if="selectedVariant"
          class="bg-blue-500 text-white font-normal text-base rounded px-2"
          >{{ getVariantName(selectedVariant) }}</span
        >
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none flex-1 flex flex-center -mt-12">
      <div class="flex flex-col items-center">
        <h2 class="text-2xl text-gray-500 font-normal mb-10">Varyant Seçin</h2>
        <div class="flex gap-5">
          <div
            v-for="variant in getProductVariants(product)"
            :key="getVariantId(variant)"
            @click="selectVariant(variant)"
            :style="_strippedBackground(variant)"
            :class="[
              'shadow hover:bg-blue-500 flex flex-col items-center justify-center rounded border border-solid border-gray-300 h-36 w-36',
              _variantClasses(variant),
            ]"
          >
            <div
              :class="[
                'flex flex-col items-center text-xl font-semibold',
                _variantNameClasses(variant),
              ]"
            >
              <span class="text-2xl">{{ getVariantName(variant) }}</span>
              <span
                :class="[
                  'text-sm font-normal',
                  _variantQuantityClasses(variant),
                ]"
              >
                {{ _getVariantQuantityMessage(variant) }}
              </span>
            </div>
            <span
              :class="[
                'text-lg font-medium mt-6',
                _variantPriceClasses(variant),
              ]"
            >
              {{ _getFormattedPrice(variant) }}
            </span>
          </div>
        </div>
      </div>
    </q-card-section>

    <dialog-card-actions
      align="center"
      hide-cancel-button
      confirm-button-text="Sepete Ekle"
      :disabled="!selectedVariant"
      @confirm="emitVariant"
    />
  </q-card>
</template>

<script>
import DialogCardActions from "src/components/terminal/_shared/dialog/DialogCardActions.vue";
</script>

<script setup>
import { ref } from "vue";
import { Money } from "src/utils/Money";
import {
  getProductVariants,
  getProductName,
  getProductPrice,
  getVariantId,
  getVariantName,
  getVariantPrice,
  getVariantQuantity,
} from "src/resources/Product";


const props = defineProps({
  product: Object,
  default: () => ({}),
});

const emit = defineEmits(["close", "select-variant"]);

const selectedVariant = ref(null);

function closeDialog() {
  selectedVariant.value = null;
  emit("close");
}

function isVariantSelected(variant) {
  return getVariantId(selectedVariant.value) === getVariantId(variant);
}

function selectVariant(variant) {

  if (! getVariantQuantity(variant)) return;

  selectedVariant.value = variant;

}

function emitVariant() {
  emit("select-variant", selectedVariant.value);
  closeDialog();
}


// Computed
function _getVariantQuantityMessage(variant) {
  return getVariantQuantity(variant) ? getVariantQuantity(variant) + " ADET KALDI" : "TÜKENDİ";
}

function _getFormattedPrice(variant) {
  return Money( getVariantPrice(variant, getProductPrice(props.product)) );
}


// Classes
function _variantClasses(variant) {
  return {
    "bg-blue-500 text-white": isVariantSelected(variant),
    "bg-gray-100": !isVariantSelected(variant),
    "group cursor-pointer": getVariantQuantity(variant) > 0,
  };
}

function _variantNameClasses(variant) {
  return {
    "text-white": isVariantSelected(variant),
    "text-gray-800": !isVariantSelected(variant),
    "group-hover:text-white": getVariantQuantity(variant) > 0,
  };
}

function _variantPriceClasses(variant) {
  return {
    "text-white": isVariantSelected(variant),
    "text-blue-600": !isVariantSelected(variant),
    "group-hover:text-white": getVariantQuantity(variant) > 0,
  };
}

function _variantQuantityClasses(variant) {
  return {
    "text-gray-500": !isVariantSelected(variant),
    "group-hover:text-white": getVariantQuantity(variant) > 0,
  };
}

function _strippedBackground(variant) {

  if (getVariantQuantity(variant)) return;

  return {
    background: `repeating-linear-gradient(
                -45deg,
                rgb(235 240 240),
                rgb(235 240 240) 10px,
                #fff 10px,
                #fff 20px
              )`,
    animation: "animatedBackground 500s linear infinite",
  };

}

</script>
