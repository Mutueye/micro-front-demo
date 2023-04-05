<!--  登录状态控件：登录按钮 / 用户信息 -->
<template>
  <div v-if="token" class="flex flex-row items-center">
    <el-dropdown>
      <img :src="avatar" class="rounded-full w-40px h-40px" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <div v-else>
    <el-button type="primary" round @click="goLogin">
      <span class="font-bold">登录/注册</span>
    </el-button>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/modules/auth/store/auth';
  import { goLogin, logout } from '@/utils/authUtils';
  import defaultAvatar from '@/assets/default-avatar.png';

  const authStore = useAuthStore();
  const { token, identity, userInfo } = storeToRefs(authStore);

  const avatar = computed(() => {
    return userInfo.value.avatar ? userInfo.value.avatar : defaultAvatar;
  });

  // /** 下拉菜单相关 */
  // const studentMenus = [
  //   { name: '我的课程', path: '/workbench/index/school', divided: false },
  //   { name: '我的实习', path: '/workbench/index/internship', divided: false },
  //   { name: '我的简历', path: '/workbench/index/resume', divided: false },
  //   { name: '账号设置', path: qucPersonalPath(), divided: true },
  //   { name: '退出登录', path: '', divided: true },
  // ];

  // /** 教师下拉菜单相关 */
  // const teacherMenus = [
  //   { name: '我的课程', path: '/u/teacherGr/group', divided: false },
  //   { name: '我的习题', path: '/u/teacherGr/exerciseLibs', divided: false },
  //   { name: '账号设置', path: qucPersonalPath(), divided: true },
  //   { name: '退出登录', path: '', divided: true },
  // ];
</script>
