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

<script setup lang="ts">

const emit = defineEmits<{
  (e: 'confirm'): void,
  (e: 'cancel'): void,
  (e: 'close'): void
}>();

// eslint-disable-next-line vue/no-setup-props-destructure
withDefaults(defineProps<{
  disabled?: boolean,
  align?: 'right' | 'left' | 'center' | 'between' | 'around' | 'evenly' | 'stretch' | undefined,
  hideCancelButton?: boolean,
  cancelButtonText?: string,
  confirmButtonText?: string,
}>(), {
  disabled : false,
  align : 'right',
  hideCancelButton : false,
  cancelButtonText : 'İptal',
  confirmButtonText : 'Kaydet'
});

function confirm() {
  emit('confirm');
  emit('close');
}

function cancel() {
  emit('cancel');
  emit('close');
}
</script>
