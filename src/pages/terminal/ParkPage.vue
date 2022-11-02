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

      <q-scroll-area v-if="ParkManager.hasParks()" class="w-full h-full flex" >

        <div class="lg:w-8/12 mx-auto p-4 xl:p-6 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-8 xl:gap-x-5 lg:grid-cols-4">

          <div v-for="park in ParkManager.getParks()" :key="park.id" class="cursor-pointer group relative overflow-hidden p-5 border border-solid border-gray-800 bg-black/25 rounded text-center text-white flex flex-col items-center">
            <div>

              <span class="text-xl block text-center mb-12">{{ park.title }}</span>

              <div class="flex flex-col mt-auto">

                <span class="text-base mb-3">
                  {{ Money(ParkManager.getParkTotalPrice(park)) }} /
                  {{ park.cart.items.length }} ürün
                </span>

                <span class="text-gray-500 text-sm">
                  {{ formatParkDate(park) }}
                </span>

              </div>

            </div>

            <div
              @click="restorePark(park)"
              class="group-hover:flex bg-black/25 absolute left-0 right-0 top-0 bottom-0 p-3 hidden flex-col"
            ></div>

            <q-btn
              @click="removePark(park)"
              unelevated
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

<script setup lang="ts">
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { Money } from 'src/utils/Money';

import { usePark } from 'src/core/composables/usePark';
import { confirmDialog } from 'src/utils/DialogHelper';
import { positiveNotify } from 'src/utils/Notify';
import { CartCouldNotBeRestoredError, CartCouldNotBeRemovedError } from 'src/core/exceptions/CartError'
import { QPage, QBtn, QScrollArea } from 'quasar';
import { ParkItemInterface } from 'src/core/types/model';


const ParkManager = usePark();
const router    = useRouter();

function formatParkDate(park: ParkItemInterface){
  return dayjs(park.created_at).format('DD/MM/YYYY HH:mm')
}

async function removePark(park: ParkItemInterface) {

  try {
    await confirmDialog({
      title: 'Uyarı',
      message: `<strong>${ park.title }</strong> - (${ formatParkDate(park) }) tarihli parkı silinsin mi?`,
      html: true,
    });

    ParkManager.removeParkById(park.id);

  } catch (e) {
    new CartCouldNotBeRemovedError(e?.message);
  }
}

async function restorePark(park) {

  try {
    await confirmDialog({
      title: 'Uyarı',
      message: 'Bu sepeti geri yüklemek istediğinize emin misiniz? <br>Mevcut sepetinizdeki ürünler kaldırılacaktır.',
      html: true,
    });

    ParkManager.restorePark(park);
    router.push({ path: 'sale' });
    positiveNotify('Sepetiniz geri yüklendi.');

  } catch (e) {
    new CartCouldNotBeRestoredError(e?.message);
  }

}

</script>
