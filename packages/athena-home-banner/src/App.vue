<template>
  <div class="w-full h-300px bg-theme flex flex-col items-center justify-center">
    <div class="text-size-18px font-bold color-white">子应用：athena-home-banner</div>
    <div class="text-size-16px font-bold mt-space color-white">
      登录状态：{{ token ? `已登录，token: ${token}` : '未登录' }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { setThemeClassByIndex } from 'qst-ui-system';
  import { useToggleDayNight } from '@/composables/useToggleDayNight';
  import { useAuthStore } from './store/auth';
  import { storeToRefs } from 'pinia';

  const { toggleDayNight } = useToggleDayNight();
  const authStore = useAuthStore();
  const { token } = storeToRefs(authStore);

  onMounted(() => {
    // 如果当前是是WUJIE微前端子应用
    if (window.__POWERED_BY_WUJIE__) {
      // 切换夜间模式事件
      window.$wujie?.bus.$on('toggle-dark', () => {
        toggleDayNight();
      });
      // 主题切换事件
      window.$wujie?.bus.$on('theme-change', (themIndex: number) => {
        setThemeClassByIndex(themIndex);
      });
    }
  });
</script>
