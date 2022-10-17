<template>
  <q-page class='flex flex-center'>
    <h5 class='font-light'>Anasayfa</h5>
  </q-page>
</template>

<script>
export default {
  name: 'IndexPage',
};
</script>

<script setup>
import { useMeta } from 'quasar';

useMeta({
  title: 'Anasayfa',
});
</script>
