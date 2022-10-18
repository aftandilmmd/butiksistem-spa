<template>
  <q-page class="h-screen flex flex-col bg-gray-900">

    <header class="flex flex-col">

      <div>
        <q-btn
          to="/terminal/menu"
          v-close-popup
          icon="menu"
          text-color="white"
          size="lg"
          unelevated
          class="rounded-none w-20 h-20 mr-auto"
        />
      </div>

      <div class="text-center">
        <h1 class="text-white font-medium text-3xl">Park Edilen Satışlar</h1>
      </div>

    </header>

    <div class="w-full flex flex-1">

      <q-scroll-area v-if="parkStore.parks.length > 0" class="w-full h-full flex" >

        <div class="lg:w-8/12 mx-auto p-4 xl:p-6 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-8 xl:gap-x-5 lg:grid-cols-4">

          <div
            v-for="park in parkStore.parks"
            :key="park.hash_id"
            class="group relative overflow-hidden p-5 border border-solid border-gray-600 rounded text-center text-white flex flex-col items-center"
          >
            <div>

              <span class="text-xl block text-center mb-12">{{ park.title }}</span>

              <div class="flex flex-col mt-auto">

                <span class="text-base">
                  {{ Money(getCartTotalPrice(park.cart.items)) }} /
                  {{ park.cart.items.length }} ürün
                </span>

                <span class="text-gray-500 text-sm">
                  {{ formatParkDate(park) }}
                </span>

              </div>

            </div>

            <div
              @click="restorePark(park)"
              class="group-hover:flex bg-white/25 absolute left-0 right-0 top-0 bottom-0 p-3 hidden flex-col"
            ></div>

            <q-btn
              @click="removePark(park)"
              unelevated=""
              icon="close"
              class="hidden group-hover:flex absolute right-0 top-0 m-4 bg-white rounded text-gray-800 w-12 h-12"
            />

          </div>

        </div>

      </q-scroll-area>

      <div v-else class="inline-flex text-center text-xl bg-gray-200 p-4 px-12 rounded mb-auto mx-auto mt-20">
        Park edilmiş satışınız bulunmuyor.
      </div>

    </div>

  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { useQuasar } from "quasar";

import { useParkStore } from "src/stores/terminal/park-store";
import { Money } from "src/utils/Money";
import { getCartTotalPrice } from "src/resources/Cart";

const router    = useRouter();
const parkStore = useParkStore();
const $q        = useQuasar();

function formatParkDate(park){
  return dayjs(park.parked_at).format("DD/MM/YYYY HH:mm")
}

function removePark(park) {

  $q.dialog({

    title   : "Uyarı",
    cancel  : true,
    html    : true,
    message : `<strong>${ formatParkDate(park.parked_at) }</strong> tarihli parkı silinsin mi?`,

  }).onOk(() => {
    parkStore.removePark(park.hash_id);
  });
}

function restorePark(park) {
  $q.loading.show();
  parkStore.restorePark(park);
  router.push({ path: "sale" });
  $q.loading.hide();
}

</script>
