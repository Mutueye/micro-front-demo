<template>
  <div class="mt-space-xxxl">
    <h1>输入框</h1>
    <div class="mt-space-xs">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
    <div class="mt-space-xs">
      <el-input placeholder="请输入内容" v-model="input" :disabled="true"></el-input>
    </div>
    <div class="mt-space-xs">
      <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
    </div>
    <div class="mt-space-xs">
      <el-input placeholder="请输入密码" v-model="input" show-password></el-input>
    </div>
    <div class="mt-space-xs">
      <div class="flex flex-row items-center">
        <span class="whitespace-nowrap">属性方式：</span>
        <el-input
          placeholder="请选择日期"
          suffix-icon="el-icon-date"
          v-model="input1"
          class="mr-space-xs"></el-input>
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input2"></el-input>
      </div>
      <div class="flex flex-row items-center mt-space-xs">
        <span class="whitespace-nowrap">slot 方式：</span>
        <el-input placeholder="请选择日期" v-model="input3" class="mr-space-xs">
          <i slot="suffix" class="el-input__icon el-icon-date"></i>
        </el-input>
        <el-input placeholder="请输入内容" v-model="input4">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </div>
    <div class="mt-space-xs">
      <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
    </div>
    <div class="mt-space-xs">
      <el-input placeholder="请输入内容" v-model="input1">
        <template slot="prepend">Http://</template>
      </el-input>
    </div>
    <div class="mt-space-xs">
      <el-input placeholder="请输入内容" v-model="input2">
        <template slot="append">.com</template>
      </el-input>
    </div>
    <div class="mt-space-xs">
      <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择" class="w-130px">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button type="primary" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="mt-space-xs flex flex-row items-center">
      <el-input
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="input1"
        class="mr-space-xs"></el-input>
      <el-input
        size="medium"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="input2"
        class="mr-space-xs"></el-input>
      <el-input
        size="small"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="input3"
        class="mr-space-xs"></el-input>
      <el-input
        size="mini"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="input4"></el-input>
    </div>
    <div class="mt-space-xs">
      <el-input
        type="text"
        placeholder="请输入内容"
        v-model="text"
        maxlength="10"
        show-word-limit></el-input>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    data() {
      return {
        input: '',
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        textarea: '',
        select: '',
        text: '',
      };
    },
  };
</script>

<style>
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
