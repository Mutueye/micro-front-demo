<template>
  <div class="w-full">
    <ElButtonExample />
    <IconFontExample />
    <ElLinkExample />
    <ElRadioExample />
    <ElCheckboxExample />
    <ElInputExample />
  </div>
</template>

<script lang="ts">
  import ElInputExample from './components/ElInputExample.vue';
  import ElButtonExample from './components/ElButtonExample.vue';
  import IconFontExample from './components/IconFontExample.vue';
  import ElLinkExample from './components/ElLinkExample.vue';
  import ElRadioExample from './components/ElRadioExample.vue';
  import ElCheckboxExample from './components/ElCheckboxExample.vue';

  export default {
    components: {
      ElInputExample,
      ElButtonExample,
      IconFontExample,
      ElLinkExample,
      ElRadioExample,
      ElCheckboxExample,
    },
  };
</script>
