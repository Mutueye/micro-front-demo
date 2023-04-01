<template>
  <div class="w-full min-h-screen overflow-hidden flex flex-col">
    <Header class="fixed left-0 right-0 top-0 z-1000" />
    <div class="w-full flex flex-col mt-header flex-1 flex-shrink-0 mx-auto min-h-0">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
</script>
