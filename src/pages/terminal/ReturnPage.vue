<template>
  <q-page class="h-screen flex flex-col bg-white">
    <page-header>İade</page-header>

    <div
      class="bg-gray-50 flex items-center border-0 border-b border-solid border-gray-200"
    >
      <q-stepper
        v-model="currentStep"
        header-nav
        flat
        ref="stepper"
        color="primary"
        animated
        class="bg-transparent no-content-stepper mx-auto"
      >
        <q-step :done="currentStep > 1" :name="1" title="Sipariş ara" />

        <q-step :done="currentStep > 2" :name="2" title="Ürün seç" />

        <q-step :done="currentStep > 3" :name="3" title="İade türü seç" />

        <q-step :done="currentStep == 4" :name="4" title="İşlem tamamla" />
      </q-stepper>
    </div>

    <keep-alive>
      <div
        v-if="currentStep == 1"
        class="w-full items-center flex flex-col flex-1 p-5 overflow-hidden py-8"
      >
        <span class="text-gray-800 font-medium text-xl mb-8">
          İade edilecek siparişi bulun
        </span>

        <div class="flex flex-col w-4/12">
          <q-input
            outlined
            color="purple-12"
            v-model="searchQuery"
            label="Müşteri Ad-Soyad, Satış No veya Ürün Bilgisi ile arayın"
            :loading="true"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>

          <div class="h-96 flex flex-col border border-gray-200 rounded mt-2">
            <q-scroll-area class="h-full">
              <ol class="relative divide-y">
                <li
                  v-for="result in searchResults"
                  :key="result.id"
                  @click="setOrder(result)"
                  class="py-4 px-5 hover:bg-gray-100 cursor-pointer p-2"
                >
                  <div class="flex">
                    <div class="flex-1 flex flex-col items-start space-y-1">
                      <p class="flex text-gray-800">
                        <span class="font-medium text-lg">
                          {{ result.complete_at }}
                        </span>
                      </p>
                      <p class="flex text-gray-400 text-base">
                        <span>{{ result.token }} - Mağaza 1</span>
                      </p>
                    </div>
                    <div class="flex-shrink-0">
                      <span class="text-gray-800 font-medium text-xl">{{
                        Money(result.total_price)
                      }}</span>
                    </div>
                  </div>
                </li>
              </ol>
            </q-scroll-area>
          </div>
        </div>
      </div>
    </keep-alive>

    <keep-alive>
      <div
        v-if="currentStep == 2"
        class="w-full items-center flex flex-col flex-1 p-5 overflow-hidden py-8"
      >
        <span class="text-gray-400 font-normal text-xl mb-8">
          Sipariş No: <strong class="text-gray-800">1006</strong>
        </span>

        <div class="w-full flex flex-col items-center flex-1 h-full">
          <q-scroll-area class="w-full flex-1">
            <div class="flex flex-col gap-5 w-6/12 mx-auto">
              <div
                v-for="i in 4"
                :key="i"
                class="flex flex-row items-center bg-gray-100 border border-gray-200 rounded p-5 gap-8"
              >
                <select
                  class="bg-white border border-gray-300 rounded px-5 py-3 text-xl"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>

                <div class="flex flex-col mr-auto">
                  <span class="font-semibold text-base text-gray-700">
                    Polo Yaka T-Shirt
                  </span>
                  <span class="font-medium text-base text-gray-400"
                    >MV-TSH-S-01</span
                  >
                </div>

                <div class="flex flex-col">
                  <span class="font-semibold text-base text-gray-700"
                    >₺ 137.98</span
                  >
                  <span
                    class="font-medium text-base text-gray-400 line-through"
                  >
                    ₺ 275.96
                  </span>
                </div>

                <select
                  class="bg-white border border-gray-300 rounded px-3 py-3 text-base"
                >
                  <option value="0">Durum belirtin</option>
                  <option value="1">Stoğa Ekle</option>
                  <option value="2">Defolu Stoğa Ekle</option>
                  <option value="3">Stoğa Ekleme</option>
                </select>
              </div>
            </div>
          </q-scroll-area>

          <div class="flex flex-col gap-8">
            <span class="text-gray-400 text-center font-normal text-xl mt-8">
              Toplam İade Edilecek Tutar:
              <strong class="text-gray-800">126TL</strong>
            </span>

            <q-btn
              no-caps
              unelevated
              padding="0.75rem 3rem"
              color="primary"
              label="Ödeme Adımına Geç"
              class="inline-flex text-xl"
            />
          </div>
        </div>
      </div>
    </keep-alive>

    <keep-alive>
      <div
        v-if="currentStep == 3"
        class="w-full items-center flex flex-col flex-1 p-5 overflow-hidden py-8"
      >
        <div
          class="flex gap-16 text-center text-gray-400 font-normal text-xl mb-20"
        >
          <div class="flex flex-col">
            <span>Sipariş No</span>
            <strong class="text-gray-800">1006</strong>
          </div>
          <div class="flex flex-col">
            <span>İade Tutarı</span>
            <strong class="text-gray-800">₺ 129.00</strong>
          </div>
        </div>

        <div class="flex flex-row justify-center gap-6 mb-20">
          <q-btn
            @click="setPaymentType('cash')"
            no-caps
            class="rounded w-44 h-36 text-xl"
            :class="[
              {
                'text-white bg-blue-500': paymentType == 'cash',
                'text-gray-800 bg-gray-200': paymentType != 'cash',
              },
            ]"
          >
            <div class="flex flex-col gap-2">
              <span>Nakit</span>
              <span class="text-gray-400">120TL</span>
            </div>
          </q-btn>

          <q-btn
            @click="setPaymentType('credit-card')"
            no-caps
            class="rounded w-44 h-36 text-xl"
            :class="[
              {
                'text-white bg-blue-500': paymentType == 'credit-card',
                'text-gray-800 bg-gray-200': paymentType != 'credit-card',
              },
            ]"
          >
            <div class="flex flex-col gap-2">
              <span>Kredi Kartı</span>
              <span class="text-gray-400">120TL</span>
            </div>
          </q-btn>
        </div>

        <div class="w-full flex flex-col items-center flex-1 h-full">
          <div class="flex flex-col gap-8">
            <q-btn
              no-caps
              unelevated
              padding="0.75rem 3rem"
              color="primary"
              label="İadeyi Tamamla"
              class="inline-flex text-xl"
            />
          </div>
        </div>
      </div>
    </keep-alive>

    <keep-alive>
      <div
        v-if="currentStep == 4"
        class="w-full items-center flex flex-col flex-1 p-5 overflow-hidden py-8"
      >
        <div
          class="flex gap-16 text-center text-gray-400 font-normal text-xl my-20"
        >
          <span class="text-gray-800 text-2xl">
            İade işlemi tamamlandı 👍
          </span>
        </div>

        <div class="w-full flex flex-col items-center flex-1 h-full">
          <div class="flex gap-8">
            <q-btn
              outline
              no-caps
              unelevated
              padding="0.75rem 3rem"
              color="primary"
              label="Faturayı Yazdır"
              class="inline-flex text-xl"
            />
            <q-btn
              no-caps
              unelevated
              padding="0.75rem 3rem"
              color="primary"
              label="Menü'ye Dön"
              class="inline-flex text-xl"
            />
          </div>
        </div>
      </div>
    </keep-alive>
  </q-page>
</template>

<script>
import PageHeader from "src/components/terminal/_shared/page/PageHeader.vue";
</script>

<script setup>
import { ref } from "vue";
import { Money } from "src/utils/Money";

const searchResults = ref([
  {
    id: 4328,
    complete_at: "2022-06-24 15:15:06",
    token: "1006",
    customer: null,
    total_price: 404.96,
    total_discount_price: null,
    staff_name: "Bahlul Bah",
    branch: { id: 89, name: "Mağaza - 1" },
  },
  {
    id: 4318,
    complete_at: "2022-06-22 16:26:52",
    token: "1004",
    customer: null,
    total_price: 1198.0,
    total_discount_price: null,
    staff_name: "Bahlul Bah",
    branch: { id: 89, name: "Mağaza - 1" },
  },
  {
    id: 4224,
    complete_at: "2022-06-17 10:44:28",
    token: "1002",
    customer: null,
    total_price: 137.98,
    total_discount_price: null,
    staff_name: "Bahlul Bah",
    branch: { id: 89, name: "Mağaza - 1" },
  },
  {
    id: 4181,
    complete_at: "2022-06-15 12:17:32",
    token: "1001",
    customer: null,
    total_price: 107.99,
    total_discount_price: null,
    staff_name: "Bahlul Bah",
    branch: { id: 89, name: "Mağaza - 1" },
  },
]);

let searchQuery = ref(null);
const currentStep = ref(1);
let paymentType = ref("cash");
let selectedOrder = ref(null);

function setPaymentType(type) {
  paymentType.value = type;
}

function setOrder(order) {
  selectedOrder.value = order;
  currentStep.value = 2;
}
</script>

<style>
.no-content-stepper .q-stepper__content {
  display: none;
}
</style>
