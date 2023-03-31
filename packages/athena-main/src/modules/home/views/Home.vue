<template>
  <div class="w-full flex flex-col items-center">
    <WuJieVue
      width="100%"
      height="auto"
      name="athena-home-banner"
      url="//localhost:5210/"
      :sync="false" />
  </div>
</template>

<script lang="ts" setup>
  import WuJieVue from 'wujie-vue3';
</script>
