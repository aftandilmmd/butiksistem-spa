<template>
  <div class="h-screen overflow-hidden flex flex-col z-50">

    <div @click="emit('hide')" class="bg-gray-800/30 absolute left-0 top-0 right-0 bottom-0 z-10"></div>

    <div class="relative z-20 flex flex-row h-20 bg-blue-500">

      <q-icon name="search" size="md" class="h-full px-6 text-white" />

      <input
        ref="customer_search_input"
        type="text"
        class="flex-1 text-white bg-transparent text-xl font-normal outline-none border-0 placeholder-white"
        placeholder="Ad, Soyad veya Telefon yazın"
      />

      <q-btn
        @click="emit('hide')"
        icon="close"
        text-color="grey-5"
        size="md"
        unelevated
        class="rounded-none text-gray-300 px-8"
      />

    </div>

    <div class="relative z-20 flex flex-col flex-1 bg-white">

      <q-scroll-area class="w-full h-full">

        <q-btn
          @click="showCreateCustomerDialog"
          no-caps
          align="left"
          text-color="grey-5"
          size="md"
          label="Yeni Müşteri Ekle"
          unelevated
          class="text-base w-full rounded-none text-blue-500 py-6 px-8"
        />

        <q-separator />

        <ul class="w-full list-none p-0 m-0">
          <li
            v-for="(customer, index) in CustomerManager.getCustomers()"
            :key="index"
            @click="selectCustomer(customer)"
            class="cursor-pointer hover:bg-blue-50 px-8 py-4 border-gray-200 border-t-0 border-l-0 border-r-0 border-b border-solid"
          >
            <div class="flex flex-col">

              <span class="font-semibold text-base text-gray-600">
                {{ Customer(customer).getFullName() }}
              </span>

              <span class="font-medium text-gray-400 text-md">
                {{ Customer(customer).getPhone() }}
              </span>

            </div>
          </li>
        </ul>

      </q-scroll-area>

    </div>

  </div>

  <q-dialog v-model="dialogs.create_customer">
    <create-customer-dialog />
  </q-dialog>
</template>

<script setup lang="ts">
import CreateCustomerDialog from 'src/components/terminal/customer/dialog/CreateCustomerDialog.vue';
import { ref, watch, onMounted, reactive } from 'vue';
import { debounce } from 'lodash';
import { useCustomer } from 'src/core/composables/useCustomer';
import Customer from 'src/core/models/Customer';
import { CustomerInterface } from 'src/core/types/cart-types';

const CustomerManager = useCustomer();

const emit = defineEmits(['hide', 'create-customer', 'select-customer']);

const searchValue = ref('');
const customer_search_input = ref();

const dialogs = reactive({
  create_customer: false,
})

watch(searchValue, value => searchCustomer(value));

let searchCustomer = debounce( value => {
  emit('search-customer', value);
}, 500);

function selectCustomer(customer: CustomerInterface) {
  emit('select-customer', customer);
  emit('hide');
}

function showCreateCustomerDialog() {
  dialogs.create_customer = true;
}

onMounted(() => {
  setTimeout(() => customer_search_input.value.focus(), 100);
});

</script>
