<template>
  <SectionWrapper title="子项目示例" sub-title="对于配置了跨域的https协议网站可直接作为子项目引入">
    <!-- <WuJie width="100%" height="auto" name="example" url="https://vercel.com/" :sync="true" /> -->
    <WuJie
      width="100%"
      height="100%"
      name="example"
      url="https://mutueye.github.io/vite-vue3-scaffold/"
      :sync="true" />
  </SectionWrapper>
</template>

<script lang="ts" setup>
  import WuJie from 'wujie-vue3';
  import SectionWrapper from './SectionWrapper.vue';
</script>
