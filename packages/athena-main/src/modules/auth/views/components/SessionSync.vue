<template>
  <iframe :src="syncUrl" class="display-none"></iframe>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useAppConfigStore } from '@/store/appConfig';
  import { useAuthStore } from '../../store/auth';
  import { useAuthProcess } from '@/componsables/useAuthProcess';
  import { athena_api } from '@/utils/pathUtils';

  const { processAuth } = useAuthProcess();

  const authStore = useAuthStore();

  const emit = defineEmits(['synced']);

  // 因为使用iframe访问用户中心，这里fallback参数中的redirect_uri无效(用户中心判断如果当前是在iframe中，
  // 只给父窗口postMessage，不会做页面跳转)
  const fallback = `${location.origin}${athena_api}/login?redirect_uri=${window.location.origin}`;
  // quc 同步登录地址
  const syncUrl = `${
    useAppConfigStore().config.QUC
  }/login?theme=athena&fallback=${encodeURIComponent(fallback)}`;

  onMounted(() => {
    window.addEventListener('message', (e: MessageEvent<string>) => {
      // 已登录，data 为当前用户的 token；未登录，则为 nosession
      const { data, origin } = e;
      if (syncUrl.includes(origin) && data !== 'nosession') {
        authStore.setToken(data);
        // 处理登录后的信息读取
        processAuth(() => {
          emit('synced');
        });
      } else {
        emit('synced');
      }
    });
  });
</script>
