<template>
  <div class="w-full h-300px bg-theme color-text-primary flex flex-row items-center justify-center">
    子应用：athena-home-banner
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';

  onMounted(() => {
    console.log('__POWERED_BY_WUJIE_', window.__POWERED_BY_WUJIE__);
  });
</script>
