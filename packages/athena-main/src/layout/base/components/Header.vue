<template>
  <div
    class="w-full h-header flex flex-row items-center justify-between px-spacing bg-bg border-b border-border-light">
    <div class="flex flex-row items-center">
      <i inline-block align-middle text-size-32px class="i-uplus:logo" />
      <div class="text-size-large font-semibold ml-10px">产教融合云</div>
    </div>
    <div class="flex flex-row items-center">
      <ThemeToggler class="mr-spacing-xxxl" />
      <AuthState />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import AuthState from './AuthState.vue';
  import ThemeToggler from '@/components/ThemeToggler.vue';
</script>
