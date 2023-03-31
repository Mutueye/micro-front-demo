<template>
  <RouterView />
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { greet } from 'qst-ui-system';
  import { useThemeStore } from './store/theme';

  const themeStore = useThemeStore();
  const { currentThemeIndex } = storeToRefs(themeStore);

  onMounted(() => {
    greet(':::::::::::::::::athena-main');
    themeStore.setCurrentThemeIndex(currentThemeIndex.value);
  });
</script>
