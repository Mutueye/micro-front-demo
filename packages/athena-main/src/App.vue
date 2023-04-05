<template>
  <SessionSync @synced="onSynced" />
  <RouterView v-if="isSynced" />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import SessionSync from './modules/auth/views/components/SessionSync.vue';

  const isSynced = ref(false);

  const onSynced = () => {
    isSynced.value = true;
  };
</script>
