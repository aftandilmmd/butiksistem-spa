<template>
  <q-card class="flex flex-col">
    <q-card-section class="bg-gray-100 flex flex-row items-center p-8">
      <div class="bg-white rounded w-full flex flex-nowrap p-4 py-3 shadow">
        <div class="flex-1 flex flex-col items-start space-y-1">
          <span
            class="w-72 truncate overflow-hidden font-medium text-base text-gray-900"
          >
            {{ product.name }}
          </span>
          <span class="text-blue-600 font-medium text-sm">
            {{ product.variants.length }} Varyant
          </span>
        </div>

        <div class="font-medium text-base text-gray-800">
          <span>{{ Money(product.price) }}</span>
        </div>
      </div>

      <div v-if="false" class="w-full">
        <q-select
          filled
          label="Şube Seçin"
          behavior="menu"
          class="bg-white w-full shadow-md"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Sonuç Bulunamadı
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </q-card-section>

    <q-card-section class="bg-white flex flex-row items-center p-8">
      <q-table
        :rows="product.variants"
        :columns="[
          { align: 'left', label: 'Varyant', field: 'name' },
          { align: 'right', label: 'Stok Miktarı (Adet)', field: 'quantity' },
        ]"
        row-key="name"
        hide-bottom
        class="w-full"
      />

      <table v-if="false" class="w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th
              scope="col"
              class="py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
            >
              Varyant
            </th>
            <th
              scope="col"
              class="py-2 px-3 text-sm font-semibold text-gray-900 text-right"
            >
              Stok Miktarı (Adet)
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr
            v-for="variant in product.variants"
            :key="variant.id"
            class="border-0 border-b border-solid border-gray-500"
          >
            <td
              class="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0"
            >
              {{ variant.name }}
            </td>
            <td
              class="whitespace-nowrap py-2 px-3 text-sm text-gray-500 text-right"
            >
              <template v-if="variant.quantity == 0">
                <span> TÜKENDİ </span>
              </template>
              <template v-else>
                <span> {{ variant.quantity }} </span>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </q-card-section>

    <dialog-card-actions hide-cancel-button confirm-button-text="Kapat" />
  </q-card>
</template>

<script>
import DialogCardActions from "src/components/terminal/_shared/dialog/DialogCardActions.vue";
</script>

<script setup>
import { Money } from "src/utils/Money";

defineProps({
  product: {
    type: Object,
    default: () => ({}),
  },
});
</script>
