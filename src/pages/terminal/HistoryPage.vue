<template>
  <q-page class="h-screen flex flex-col bg-white">
    <page-header>İşlemler</page-header>

    <div class="bg-gray-50 flex items-center border-0 border-b border-solid border-gray-200">
      <div class="text-center mx-auto">
        <div class="flex items-center py-6 gap-8">
          <span class="inline-flex text-xl items-center gap-2">
            <q-icon name="calendar_month" color="blue-5" class="text-2xl" />
            14 Haziran 2022
          </span>
          <span class="inline-flex text-xl items-center gap-2">
            <q-icon name="schedule" color="blue-5" class="text-2xl" />
            15:15
          </span>
        </div>
      </div>
    </div>

    <div class="w-full flex flex-1 overflow-hidden">
      <q-table
        flat
        class="w-full h-full"
        :rows="sales"
        :columns="columns"
        row-key="name"
        v-model:pagination="pagination"
        :loading="loading"
        binary-state-sort
        :rows-per-page-options="rows_per_page_options"
        @request="onRequest"
        @row-click="showDetail"
      >
        <template v-if="false" v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>

        <template v-if="false" v-slot:top>
          <q-input
            v-for="column in columns"
            :key="column.name"
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Search"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>

    <q-drawer
      v-model="detailDrawer"
      :width="800"
      :breakpoint="500"
      overlay
      side="right"
      class="shadow-lg-left flex flex-col"
    >

      <div class="relative flex items-center border-0 border-b border-solid border-gray-200">
        <q-btn
          @click="closeDetail"
          icon="close"
          text-color="grey-9"
          size="lg"
          unelevated
          class="text-sm absolute left-0 rounded-none w-20 h-20"
        />

        <div class="h-20 mx-auto flex items-center">
          <h1 class="text-gray-400 text-xl font-medium">
            Satış No: <span class="text-gray-900 font-semibold">{{ SaleItem(current_sale).getId() }}</span>
          </h1>
        </div>

        <q-btn unelevated icon="more_vert" size="md" class="absolute p-3 right-0 m-2">
          <q-menu fit anchor="bottom right" self="top right">
            <q-list separator>
              <q-item clickable>
                <q-item-section>Bilgi Fişi Yazdır</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Faturayı E-Posta Gönder</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>

      <q-scroll-area class="w-full flex-1 bg-gray-100 p-8">
        <div class="grid grid-cols-2 gap-6">
          <div>
            <customer-panel :customer="SaleItem(current_sale).getCustomer()" />

            <order-activity-panel :order="current_sale" />

            <payments-panel />
          </div>

          <div>
            <products-panel :order="current_sale" />
          </div>
        </div>
      </q-scroll-area>

      <q-inner-loading
        :showing="loading"
        label="Yükleniyor..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />

    </q-drawer>
  </q-page>
</template>

<script setup lang="ts">
import PageHeader from 'src/components/terminal/_shared/page/PageHeader.vue';
import CustomerPanel from 'src/components/terminal/history/components/CustomerPanel.vue';
import OrderActivityPanel from 'src/components/terminal/history/components/OrderActivityPanel.vue';
import PaymentsPanel from 'src/components/terminal/history/components/PaymentsPanel.vue';
import ProductsPanel from 'src/components/terminal/history/components/ProductsPanel.vue';

import { ref, onBeforeMount, computed } from 'vue';
import { useSale } from 'src/core/composables/useSale';
import { SaleItemType } from 'src/core/types/sale-types';
import { getFormattedDate } from 'src/utils/DateTime';
import SaleItem from 'src/core/models/SaleItem';
import { Money } from 'src/utils/Money';
import { useRoute, useRouter } from 'vue-router';

const SaleManager = useSale();

const route = useRoute();
const router = useRouter();

const detailDrawer = ref(false);

const current_sale = computed(() => SaleManager.getCurrentSale());
const loading = ref(false);
const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 50,
  rowsNumber: 1000,
});

const rows_per_page_options = [25, 100, 150, 200, 250, 300, 350, 400, 450, 500];

const columns = [
  {
    classes: 'text-base text-gray-800 font-medium py-4',
    name: 'name',
    label: 'İşlem No',
    align: 'left',
    field: 'id',
  },
  {
    classes: 'text-base text-gray-800 py-4',
    name: 'calories',
    align: 'left',
    label: 'Müşteri',
    field: 'customer_name',
  },
  {
    classes: 'text-base text-gray-800 py-4',
    name: 'fat',
    align: 'left',
    label: 'Tarih',
    field: 'date',
  },
  {
    classes: 'text-base text-gray-800 py-4',
    name: 'carbs',
    align: 'left',
    label: 'Ödeme Türü',
    field: 'payment_type',
  },
  {
    classes: 'text-base text-gray-800 py-4',
    name: 'protein',
    align: 'left',
    label: 'İşlem Durumu',
    field: 'status',
  },
  {
    classes: 'text-base text-gray-800 py-4',
    name: 'sodium',
    align: 'left',
    label: 'Satış Toplamı',
    field: 'total_price',
  },
  {
    classes: 'text-base text-gray-800 py-4',
    name: 'calcium',
    align: 'left',
    label: 'Satış Personeli',
    field: 'staff_name',
  },
];

const sales = computed(() =>
  SaleManager.getSales().map((sale: SaleItemType) => ({
    id: SaleItem(sale).getId(),
    customer_name: SaleItem(sale).getCustomerName(),
    date: getFormattedDate(SaleItem(sale).getCreatedAt()),
    payment_type: SaleItem(sale).getPaymentTitle(),
    status: SaleItem(sale).getStatusTitle(),
    total_price: Money(SaleItem(sale).getPaymentTotal()),
    staff_name: SaleItem(sale).getSellerFullName(),
  }))
);

async function showDetail(event: PointerEvent, sale: SaleItemType) {
  loading.value = true;
  await SaleManager.getSaleFromServer(sale.id);
  loading.value = false;
  detailDrawer.value = true;
}

function closeDetail() {
  detailDrawer.value = false;
}

async function syncSales(page: number, rows_per_page: number) {
  pagination.value.page = page;
  pagination.value.rowsPerPage = rows_per_page;

  await SaleManager.getSalesFromServer(page, rows_per_page);
  pagination.value.rowsNumber = SaleManager.getTotalSalesCount();

  router.push({
    name: 'terminal_history',
    query: { page: page, per_page: rows_per_page },
  });
}

async function onRequest(props) {
  loading.value = true;
  await syncSales(props.pagination.page, props.pagination.rowsPerPage);
  pagination.value = props.pagination;
  loading.value = false;
}

onBeforeMount(async () => {
  let page = Number(route.query.page);
  let per_page = Number(route.query.per_page);

  if (!page || !per_page) {
    page = pagination.value.page;
    per_page = pagination.value.rowsPerPage;
  }

  if (per_page > 400 || page < 1) {
    page = 1;
    per_page = 400;
  }

  loading.value = true;
  await syncSales(page, per_page);
  loading.value = false;

  document.addEventListener('keydown', async function(event){
    if(event.keyCode == 39){
      pagination.value.page = pagination.value.page + 1;
    }

    if(event.keyCode == 37){
      pagination.value.page = pagination.value.page - 1;
    }

    pagination.value.page = (pagination.value.page < 1 || pagination.value.page > SaleManager.getLastPage()) ? 1 : pagination.value.page;

    await syncSales(pagination.value.page, pagination.value.rowsPerPage)
  })
});
</script>

<style scoped>
thead {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  border-bottom: 1px solid #ddd;
}
</style>
