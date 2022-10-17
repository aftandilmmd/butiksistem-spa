<template>
  <q-card-actions :align="align" class="p-8 py-5 bg-gray-100">

    <q-btn
      v-if="!hideCancelButton"
      @click="cancel"
      flat
      :label="cancelButtonText"
      color="grey-7"
      padding="8px 2rem"
      v-close-popup
    />

    <q-btn
      :disabled="disabled"
      @click="confirm"
      unelevated
      :label="confirmButtonText"
      color="dark"
      padding="8px 2rem"
      v-close-popup
    />

  </q-card-actions>
</template>

<script setup>
const emit = defineEmits(["confirm", "cancel", "close"]);

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },

  align: {
    type: String,
    default: "right",
  },

  hideCancelButton: {
    type: Boolean,
    default: false,
  },

  cancelButtonText: {
    type: String,
    default: "İptal",
  },

  confirmButtonText: {
    type: String,
    default: "Kaydet",
  },
});

function confirm() {
  emit("confirm");
  emit("close");
}

function cancel() {
  emit("cancel");
  emit("close");
}
</script>
