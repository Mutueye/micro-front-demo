<template>
  <div class="w-1200px flex flex-col items-center py-spacing-xxxl">
    <div class="text-size-24px color-text-primary mb-spacing-sm">{{ title }}</div>
    <div v-if="subTitle" class="text-size-12px color-text-secondary mb-spacing-sm">
      {{ subTitle }}
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { toRefs } from 'vue';
  const props = defineProps<{ title: string; subTitle?: string }>();
  const { title, subTitle } = toRefs(props);
</script>
