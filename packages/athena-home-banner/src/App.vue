<template>
  <div class="w-full h-300px bg-bg-secondary" />
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useThemeStore } from './store/theme';

  const themeStore = useThemeStore();
  const { currentThemeIndex } = storeToRefs(themeStore);

  onMounted(() => {
    themeStore.setCurrentThemeIndex(currentThemeIndex.value);
  });
</script>
