<template>
  <q-card style="width: 700px; max-width: 80vw">

    <q-card-section>
      <div class="text-lg">Müşteri Ekle</div>
    </q-card-section>

    <q-card-section class="flex flex-col gap-5">

      <div class="grid grid-cols-2 gap-5">

        <q-input
          v-model="customer.first_name"
          filled
          class="text-lg"
          label="Adı"
        />

        <q-input
          v-model="customer.last_name"
          filled
          class="text-lg"
          label="Soyadı"
        />

      </div>

      <div class="grid grid-cols-2 gap-5">

        <q-input
          v-model="customer.phone"
          filled
          class="text-lg"
          label="Telefon"
          mask="0(###) ### ####"
        />

        <q-input
          v-model="customer.email"
          type="email"
          filled
          class="text-lg"
          label="Eposta"
        />

      </div>

      <div class="grid grid-cols-2 gap-5">

        <q-select
          v-model="shipping_address.city"
          filled
          label="İl"
          behavior="menu"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                Sonuç Bulunamadı
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-select
          v-model="shipping_address.district"
          filled
          label="İlçe"
          behavior="menu"
        >
          <template v-slot:no-option>
            <no-option />
          </template>
        </q-select>

      </div>

      <div class="grid grid-cols-1 gap-5">
        <q-input
          v-model="shipping_address.address"
          filled
          class="text-lg"
          label="Adres"
        />
      </div>

    </q-card-section>

    <dialog-card-actions @confirm="save"/>

  </q-card>
</template>

<script>
import DialogCardActions from 'src/components/terminal/_shared/dialog/DialogCardActions.vue';
import NoOption from 'src/components/_shared/form/select/NoOption.vue'
</script>

<script setup>
import { reactive } from 'vue';
import { useCart } from 'src/core/composables/useCart';
import { useCustomer } from 'src/core/composables/useCustomer';

const CartManager = useCart();
const CustomerManager = useCustomer();

const emit = defineEmits(['save']);

const customer = reactive(Object.create(CartManager.getCustomer()));
const shipping_address = reactive(Object.create(CartManager.getShippingAddress()));

function save(){

  CustomerManager.addCustomer(customer);

  CartManager.setCustomer(customer);

  CartManager.setShippingAddress(shipping_address);

  emit('save', customer)

}

</script>
