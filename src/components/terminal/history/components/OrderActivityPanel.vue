<template>
  <panel-wrapper>

    <template #title>Satış Tarihçesi</template>

    <ol class="relative border-l border-gray-200 dark:border-gray-700">

      <li v-for="activity in activities" :key="activity.id" class="mb-3 hover:bg-gray-50 p-2 rounded ml-4">

        <div class="absolute w-2 h-2 bg-blue-600 rounded-full mt-1.5 -left-1 dark:border-gray-900 dark:bg-gray-700"></div>

        <h3 class="text-sm font-medium text-gray-700 dark:text-white mb-2">
          {{ SaleActivity(activity).getStatusTitle() }}
        </h3>

        <time class="block text-sm font-normal leading-none text-gray-400 dark:text-gray-500 mb-2">
          {{ getFormattedDate(SaleItem(order).getCreatedAt()) }}
        </time>

        <span v-if="false" class="text-gray-600">
          {{ SaleItem(order).getVariantsCount() }} parça ürün / {{ Money(SaleItem(order).getTotalPrice()) }}
        </span>

      </li>

    </ol>

  </panel-wrapper>
</template>

<script setup lang="ts">
import PanelWrapper from './PanelWrapper.vue';
import { computed } from 'vue';

import SaleActivity from 'src/core/models/SaleActivity';
import SaleItem from 'src/core/models/SaleItem';

import { SaleItemType } from 'src/core/types/sale-types';
import { getFormattedDate } from 'src/utils/DateTime';
import { Money } from 'src/utils/Money';

const props = defineProps<{ order: SaleItemType }>()

const activities = [ ...SaleItem(props.order).getActivities() ]

const create_activity = computed(() => activities.find(a => SaleActivity(a).getStatusValue() === 'Order::addOrder'))

if(! create_activity.value){

  activities.unshift({
    type: 'sale_activities',
    id: props.order?.id,
    attributes: {
      created_at: props.order?.attributes?.created_at,
    },
    computed: {
      status_data: {
        value: 'Order::addOrder',
        title: 'Satış oluşturuldu'
      }
    }
  });

}

</script>
