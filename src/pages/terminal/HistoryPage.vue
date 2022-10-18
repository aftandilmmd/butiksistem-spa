<template>
  <q-page class="h-screen flex flex-col bg-white">
    <page-header>İşlemler</page-header>

    <div
      class="bg-gray-50 flex items-center border-0 border-b border-solid border-gray-200"
    >
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

    <div class="w-full flex flex-1 p-5 overflow-hidden">
      <q-table
        flat
        class="w-full h-full"
        :rows="rows"
        :columns="columns"
        row-key="name"
        :pagination="{ rowsPerPage: 10 }"
      >
        <template v-slot:body="props">
          <q-tr
            :props="props"
            @click="showDetail(props.row)"
            class="cursor-pointer"
          >
            <q-td key="name" :props="props">
              {{ props.row.token }}
            </q-td>
            <q-td key="name" :props="props">
              {{ props.row.customer_name }}
            </q-td>
            <q-td key="name" :props="props">
              {{ props.row.date }}
            </q-td>
            <q-td key="name" :props="props">
              {{ props.row.payment_type }}
            </q-td>
            <q-td key="name" :props="props">{{ props.row.status }}</q-td>
            <q-td key="name" :props="props">{{ props.row.total_price }}</q-td>
            <q-td key="name" :props="props">{{ props.row.staff_name }}</q-td>
          </q-tr>
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
      <div
        class="relative flex items-center border-0 border-b border-solid border-gray-200"
      >
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
            Satış No: <span class="text-gray-900 font-semibold">1003</span>
          </h1>
        </div>

        <q-btn
          unelevated
          icon="more_vert"
          size="md"
          class="absolute p-3 right-0 m-2"
        >
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
            <div class="w-full rounded-lg bg-white p-6 shadow mb-6">
              <span class="block font-medium text-gray-700 text-base mb-6">
                Müşteri Bilgileri
              </span>
              <div class="space-y-3">
                <div class="flex items-center">
                  <q-icon
                    name="person_outline"
                    class="text-xl text-blue-500 mr-3"
                  />
                  <span class="font-normal text-gray-700">Mahire Çalım</span>
                </div>
                <div class="flex items-center">
                  <q-icon
                    name="mail_outline"
                    class="text-xl text-blue-500 mr-3"
                  />
                  <span class="font-normal text-gray-700"
                    >mahire.calim@demo-hesap.com</span
                  >
                </div>
                <div class="flex items-center">
                  <q-icon name="phone" class="text-xl text-blue-500 mr-3" />
                  <span class="font-normal text-gray-700">539 503 04 38</span>
                </div>
              </div>
            </div>

            <div class="w-full rounded-lg bg-white p-6 shadow mb-6">
              <span class="block font-medium text-gray-700 text-base mb-6">
                Satış Tarihçesi
              </span>
              <ol
                class="relative border-l border-gray-200 dark:border-gray-700"
              >
                <li class="mb-6 hover:bg-gray-100 p-2 rounded ml-4">
                  <div
                    class="absolute w-3 h-3 bg-blue-600 rounded-full mt-1.5 -left-1.5 dark:border-gray-900 dark:bg-gray-700"
                  ></div>

                  <h3
                    class="text-sm font-semibold text-gray-900 dark:text-white mb-1"
                  >
                    Satış Oluşturuldu
                  </h3>
                  <time
                    class="block text-sm font-normal leading-none text-gray-400 dark:text-gray-500 mb-3"
                    >22 Haziran 2022 - 15:05</time
                  >
                  <div
                    class="flex flex-col text-base font-normal text-gray-500 dark:text-gray-400"
                  >
                    <div class="space-y-1">
                      <div class="text-sm flex items-center">
                        <q-icon name="person_outline" class="mr-2" />
                        <span class="">Hakan Yılmaz</span>
                      </div>
                      <div class="text-sm text-gray-500 flex items-center">
                        <q-icon name="place" class="mr-2" />
                        <span class="">Mağaza 1</span>
                      </div>
                      <div class="text-sm flex items-center">
                        <q-icon name="currency_lira" class="mr-2" />
                        <span class="">125.00</span>
                      </div>
                    </div>
                  </div>
                </li>

                <li class="mb-6 hover:bg-gray-100 p-2 rounded ml-4">
                  <div
                    class="absolute w-3 h-3 bg-red-600 rounded-full mt-1.5 -left-1.5 dark:border-gray-900 dark:bg-gray-700"
                  ></div>
                  <h3
                    class="text-sm font-semibold text-gray-900 dark:text-white mb-1"
                  >
                    İptal Edildi
                  </h3>
                  <time
                    class="block text-sm font-normal leading-none text-gray-400 dark:text-gray-500 mb-3"
                    >22 Haziran 2022 - 16:05</time
                  >
                  <div
                    class="flex flex-col text-base font-normal text-gray-500 dark:text-gray-400"
                  >
                    <div class="space-y-1">
                      <div class="text-sm flex items-center">
                        <q-icon name="person_outline" class="mr-2" />
                        <span class="">Hakan Yılmaz</span>
                      </div>
                      <div class="text-sm text-gray-500 flex items-center">
                        <q-icon name="place" class="mr-2" />
                        <span class="">Mağaza 1</span>
                      </div>
                      <div class="text-sm flex items-center">
                        <q-icon name="currency_lira" class="mr-2" />
                        <span class="">125.00</span>
                      </div>
                    </div>
                  </div>
                </li>

                <li class="mb-6 hover:bg-gray-100 p-2 rounded ml-4">
                  <div
                    class="absolute w-3 h-3 bg-blue-600 rounded-full mt-1.5 -left-1.5 dark:border-gray-900 dark:bg-gray-700"
                  ></div>
                  <h3
                    class="text-sm font-semibold text-gray-900 dark:text-white mb-1"
                  >
                    Şu An
                  </h3>
                  <time
                    class="block text-sm font-normal leading-none text-gray-400 dark:text-gray-500 mb-3"
                    >24 Haziran 2022 - 12:00</time
                  >
                  <div
                    class="flex flex-col text-base font-normal text-gray-500 dark:text-gray-400"
                  >
                    <div class="space-y-1">
                      <div class="text-sm flex items-center">
                        <q-icon name="person_outline" class="mr-2" />
                        <span class="">Hakan Yılmaz</span>
                      </div>
                      <div class="text-sm text-gray-500 flex items-center">
                        <q-icon name="place" class="mr-2" />
                        <span class="">Mağaza 1</span>
                      </div>
                    </div>
                  </div>
                </li>
              </ol>
            </div>

            <div class="w-full rounded-lg bg-white p-6 shadow mb-6">
              <span class="block font-medium text-gray-700 text-base mb-6">
                Ödemeler
              </span>
              <div class="space-y-1">
                <div
                  v-for="payment in 3"
                  :key="payment"
                  @click="editPayment(payment)"
                  class="flex items-center cursor-pointer hover:bg-gray-100 px-2 py-1 rounded"
                >
                  <q-icon name="edit" class="text-xl text-blue-500 mr-3" />
                  <span class="font-normal text-gray-700">Nakit</span>
                  <span class="text-lg text-gray-900 font-medium ml-auto">
                    50TL
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="w-full rounded-lg bg-white pt-6 shadow mb-6">
              <span class="block font-medium text-gray-700 text-base mb-6 px-6">
                Ürünler
              </span>
              <div class="px-6">
                <ol class="relative divide-y">
                  <li class="py-4 hover:bg-gray-50 p-2">
                    <div class="flex">
                      <div class="flex-1 flex flex-col items-start space-y-2">
                        <p class="flex text-gray-800">
                          <span>Polo Yaka T-Shirt</span>
                          <span class="ml-2 text-blue-500">(2)</span>
                        </p>
                        <p class="flex text-gray-400 text-xs">
                          <span>MV-TSH-S-01 / 8782143867262</span>
                        </p>
                        <span
                          class="bg-blue-50 text-blue-500 rounded px-3 py-1"
                        >
                          Beyaz
                        </span>
                      </div>
                      <div class="flex-shrink-0">
                        <span class="text-gray-800 font-medium">258TL</span>
                      </div>
                    </div>
                  </li>
                  <li class="py-4 hover:bg-gray-50 p-2">
                    <div class="flex">
                      <div class="flex-1 flex flex-col items-start space-y-2">
                        <p class="flex text-gray-800">
                          <span>Polo Yaka T-Shirt</span>
                          <span class="ml-2 text-blue-500">(2)</span>
                        </p>
                        <p class="flex text-gray-400 text-xs">
                          <span>MV-TSH-S-01 / 8782143867262</span>
                        </p>
                        <span
                          class="bg-blue-50 text-blue-500 rounded px-3 py-1"
                        >
                          Beyaz
                        </span>
                      </div>
                      <div class="flex-shrink-0">
                        <span class="text-gray-800 font-medium">258TL</span>
                      </div>
                    </div>
                  </li>
                  <li class="py-4 hover:bg-gray-50 p-2">
                    <div class="flex">
                      <div class="flex-1 flex flex-col items-start space-y-2">
                        <p class="flex text-gray-800">
                          <span>Polo Yaka T-Shirt</span>
                          <span class="ml-2 text-blue-500">(2)</span>
                        </p>
                        <p class="flex text-gray-400 text-xs">
                          <span>MV-TSH-S-01 / 8782143867262</span>
                        </p>
                        <span
                          class="bg-blue-50 text-blue-500 rounded px-3 py-1"
                        >
                          Beyaz
                        </span>
                      </div>
                      <div class="flex-shrink-0">
                        <span class="text-gray-800 font-medium">258TL</span>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
              <div class="p-5 border-0 border-t border-solid border-gray-200">
                <div class="flex flex-col">
                  <div class="flex h-[1.75rem]">
                    <span class="w-1/2 text-base font-medium text-gray-400">
                      Ara Toplam
                    </span>
                    <span
                      class="w-1/2 text-right text-base font-medium text-gray-400"
                    >
                      555 TL
                    </span>
                  </div>
                  <div
                    v-for="tax in [
                      {
                        label: '%8',
                        value: 55,
                      },
                      {
                        label: '%18',
                        value: 125,
                      },
                    ]"
                    :key="tax.label"
                    class="flex h-[1.75rem]"
                  >
                    <span class="w-1/2 text-base font-medium text-gray-400">
                      {{ tax.label }}
                    </span>

                    <span
                      class="w-1/2 text-right text-base font-medium text-gray-400"
                    >
                      {{ tax.value }}
                    </span>
                  </div>
                  <div class="flex border-t border-gray-200 mt-3 pt-3">
                    <span class="w-1/2 text-base font-medium text-gray-800">
                      Toplam
                    </span>
                    <span
                      class="w-1/2 text-right text-base font-medium text-gray-800"
                    >
                      555 TL
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-dialog v-model="updatePaymentDialog">
      <update-payment-dialog />
    </q-dialog>
  </q-page>
</template>

<script>
import PageHeader from "src/components/terminal/_shared/page/PageHeader.vue";
import UpdatePaymentDialog from "src/components/terminal/history/dialog/UpdatePaymentDialog.vue";
</script>

<script setup>
import { ref } from "vue";
import { useHistoryStore } from "src/stores/terminal/history-store";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

const historyStore = useHistoryStore();

const detailDrawer = ref(false);
const updatePaymentDialog = ref(false);

const columns = [
  {
    classes: "text-base text-gray-800 font-medium py-4",
    name: "name",
    label: "İşlem No",
    align: "left",
    field: "token",
  },
  {
    classes: "text-base text-gray-800 font-medium py-4",
    name: "calories",
    align: "left",
    label: "Müşteri",
    field: "customer_name",
  },
  {
    classes: "text-base text-gray-800 font-medium py-4",
    name: "fat",
    align: "left",
    label: "Tarih",
    field: "date",
  },
  {
    classes: "text-base text-gray-800 font-medium py-4",
    name: "carbs",
    align: "left",
    label: "Ödeme Türü",
    field: "payment_type",
  },
  {
    classes: "text-base text-gray-800 font-medium py-4",
    name: "protein",
    align: "left",
    label: "İşlem Durumu",
    field: "status",
  },
  {
    classes: "text-base text-gray-800 font-medium py-4",
    name: "sodium",
    align: "left",
    label: "Satış Toplamı",
    field: "total_price",
  },
  {
    classes: "text-base text-gray-800 font-medium py-4",
    name: "calcium",
    align: "left",
    label: "Satış Personeli",
    field: "staff_name",
  },
];

const rows = Array.from({ length: 1000 }).map((item, index) => ({
  token: 1000 + index,
  customer_name: faker.name.findName(),
  date: dayjs(faker.date.recent()).format("DD/MM/YYYY - HH:mm"),
  payment_type: "Nakit",
  status: "Satış",
  total_price: 1125,
  staff_name: "John Doe",
}));

function showDetail(row) {
  detailDrawer.value = true;
}

function closeDetail() {
  detailDrawer.value = false;
}

function editPayment(paymant) {
  updatePaymentDialog.value = true;
}
</script>
