<template>
  <div class="mt-spacing-xxxl">
    <h1>计数器</h1>
    <div class="mt-spacing-xs">
      <el-input-number
        v-model="num"
        @change="handleChange"
        :min="1"
        :max="10"
        label="描述文字"></el-input-number>
      <el-input-number v-model="num" :disabled="true" class="ml-spacing-xs"></el-input-number>
    </div>
    <div class="mt-spacing-xs">
      <el-input-number v-model="num1"></el-input-number>
      <el-input-number size="medium" v-model="num2" class="ml-spacing-xs"></el-input-number>
      <el-input-number size="small" v-model="num3" class="ml-spacing-xs"></el-input-number>
      <el-input-number size="mini" v-model="num4" class="ml-spacing-xs"></el-input-number>
    </div>
    <div class="mt-spacing-xs">
      <el-input-number v-model="num1" controls-position="right"></el-input-number>
      <el-input-number
        size="medium"
        v-model="num2"
        controls-position="right"
        class="ml-spacing-xs"></el-input-number>
      <el-input-number
        size="small"
        v-model="num3"
        controls-position="right"
        class="ml-spacing-xs"></el-input-number>
      <el-input-number
        size="mini"
        v-model="num4"
        controls-position="right"
        class="ml-spacing-xs"></el-input-number>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        num: 1,
        num1: 1,
        num2: 1,
        num3: 1,
        num4: 1,
      };
    },
    methods: {
      handleChange(value: number) {
        console.log(value);
      },
    },
  };
</script>
