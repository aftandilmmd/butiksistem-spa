<template>
  <q-card class="flex flex-col">
    <q-card-section class="bg-gray-100 flex flex-row items-center p-8">
      <div class="bg-white rounded w-full flex flex-nowrap p-4 py-3 shadow">
        <div class="flex-1 flex flex-col items-start space-y-1">
          <span class="w-72 truncate overflow-hidden font-medium text-base text-gray-900">
            {{ $(product).getName() }}
          </span>
          <span class="text-blue-600 font-medium text-sm">
            {{ $(product).getVariantsCount() }} Varyant
          </span>
        </div>

        <div class="font-medium text-base text-gray-800">
          <span>{{ Money($(product).getPrice()) }}</span>
        </div>
      </div>
    </q-card-section>

    <q-card-section class="bg-white flex flex-row items-center p-8">
      <q-table
        :rows="rows"
        :columns="columns"
        row-key="name"
        hide-bottom
        class="w-full"
      />
    </q-card-section>

    <dialog-card-actions hide-cancel-button confirm-button-text="Kapat" />
  </q-card>
</template>

<script setup lang="ts">
import DialogCardActions from 'src/components/terminal/_shared/dialog/DialogCardActions.vue';

import { ProductInterface } from 'src/core/types/model';
import { Money } from 'src/utils/Money';
import $ from 'src/core/models/Model';

const props = defineProps<{ product: ProductInterface }>()

type RowType = { name: string, quantity: number }

const columns = [
  {
    name: 'name',
    align: 'left',
    label: 'Varyant',
    field: 'name',
    classes: (row: RowType) => row.quantity == 0 ? 'bg-red-200': ''
  },
  {
    name: 'quantity',
    align: 'right',
    label: 'Stok Miktarı (Adet)',
    field: (row: RowType) =>  row.quantity == 0 ? 'Tükendi': row.quantity,
    classes: (row: RowType) => row.quantity == 0 ? 'bg-red-200': ''
  },
]
const rows = $(props.product).getVariants().map(
  (variant): RowType => ({ name: $(variant).getName(), quantity: $(variant).getQuantity() })
)

</script>
