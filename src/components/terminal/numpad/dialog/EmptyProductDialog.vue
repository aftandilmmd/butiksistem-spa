<template>
  <q-card class="flex flex-col">
    <q-card-section class="flex flex-row items-center p-4">
      <span class="font-medium text-lg">{{ Money(price) }}</span>
    </q-card-section>

    <q-card-section class="flex flex-row items-center p-4">
      <q-select
        v-model="product.tax_rate"
        :options="tax_options"
        :display-value="tax_rate_display_value"
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
        autogrow
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

<script setup lang="ts">
import DialogCardActions from '../../_shared/dialog/DialogCardActions.vue';

import { ref, computed } from 'vue';
import { Money } from 'src/utils/Money';

const emit = defineEmits(['add']);

const props = defineProps({
  price: {
    type: String,
    default: '',
  },
});

const product = ref({
  name: 'Tanımsız Ürün',
  tax_rate: 0,
  note: '',
  quantity: 1,
  price: 0,
});

let tax_options = ref([
  { label: 'Vergi Yok', value: 0 },
  { label: '1%', value: 1 },
  { label: '8%', value: 8 },
  { label: '18%', value: 18 },
]);

let tax_rate_display_value = computed(() => {
  return tax_options.value.find((tax) => tax.value === product.value.tax_rate)?.label;
});

function addEmptyProduct() {
  product.value.price = Number(props.price);
  emit('add', product.value);
}
</script>
