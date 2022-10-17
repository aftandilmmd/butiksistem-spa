<template>
  <q-card class="flex flex-col">
    <q-card-section class="flex flex-row items-center p-4">
      <span class="font-medium text-lg">{{ Money(price) }}</span>
    </q-card-section>

    <q-card-section class="flex flex-row items-center p-4">
      <q-select
        v-model="product.tax"
        :options="taxOptions"
        :display-value="taxDisplayValue"
        emit-value
        class="w-full"
        outlined
        label="Vergi Seçin"
        behavior="menu"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">Sonuç Bulunamadı</q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-card-section>

    <q-card-section class="flex flex-row items-center p-4">
      <q-input
        autogrow=""
        outlined
        v-model="product.note"
        label="Not"
        class="w-full"
      />
    </q-card-section>

    <dialog-card-actions
      confirm-button-text="Ekle"
      @confirm="addEmptyProduct"
    />
  </q-card>
</template>

<script>
import DialogCardActions from "src/components/terminal/_shared/dialog/DialogCardActions.vue";
</script>

<script setup>
import { ref, computed, onActivated } from "vue";
import { Money } from "src/utils/Money";

const emit = defineEmits(["add"]);

const props = defineProps({
  price: {
    type: String,
    default: "",
  },
});

let taxOptions = ref([
  { label: "Vergi Yok", value: 0 },
  { label: "1%", value: "1" },
  { label: "8%", value: "8" },
  { label: "18%", value: "18" },
]);

let taxDisplayValue = computed(() => {
  return taxOptions.value.find((tax) => tax.value == product.value.tax).label;
});

const product = ref({
  name: "Tanımsız Ürün",
  tax: "",
  note: "",
  variant: {
    quantity: 1,
    price: 0,
  },
});

function addEmptyProduct() {
  product.value.variant.price = props.price;
  emit("add", product.value);
}
</script>
