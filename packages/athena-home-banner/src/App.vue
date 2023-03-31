<template>
  <div class="w-full h-300px bg-theme color-white flex flex-row items-center justify-center">
    子应用：athena-home-banner
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useThemeStore } from './store/theme';

  const themeStore = useThemeStore();
  const { currentThemeIndex } = storeToRefs(themeStore);

  onMounted(() => {
    console.log('__POWERED_BY_WUJIE_', window.__POWERED_BY_WUJIE__);
    themeStore.setCurrentThemeIndex(currentThemeIndex.value);
  });
</script>
