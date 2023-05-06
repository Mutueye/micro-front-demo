<template>
  <div class="mt-spacing-xxxl">
    <h1>复选框</h1>
    <div class="mt-spacing-xs">
      <el-checkbox v-model="checked">备选项</el-checkbox>
      <el-checkbox v-model="checked1" disabled>备选项1</el-checkbox>
      <el-checkbox v-model="checked2" disabled>备选项</el-checkbox>
    </div>
    <div class="mt-spacing-xs">
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="复选框 A"></el-checkbox>
        <el-checkbox label="复选框 B"></el-checkbox>
        <el-checkbox label="复选框 C"></el-checkbox>
        <el-checkbox label="禁用" disabled></el-checkbox>
        <el-checkbox label="选中且禁用" disabled></el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="mt-spacing-xs">
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange">
        全选
      </el-checkbox>
      <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}</el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="mt-spacing-xs">
      <el-checkbox-group v-model="checkboxGroup1">
        <el-checkbox-button v-for="city in cities" :label="city" :key="city">
          {{ city }}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div class="mt-spacing-xs">
      <el-checkbox-group v-model="checkboxGroup2" size="medium">
        <el-checkbox-button v-for="city in cities" :label="city" :key="city">
          {{ city }}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div class="mt-spacing-xs">
      <el-checkbox-group v-model="checkboxGroup3" size="small">
        <el-checkbox-button
          v-for="city in cities"
          :label="city"
          :disabled="city === '北京'"
          :key="city">
          {{ city }}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div class="mt-spacing-xs">
      <el-checkbox-group v-model="checkboxGroup4" size="mini" disabled>
        <el-checkbox-button v-for="city in cities" :label="city" :key="city">
          {{ city }}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div class="mt-spacing-xs">
      <el-checkbox v-model="checked_1" label="备选项1" border></el-checkbox>
      <el-checkbox v-model="checked_2" label="备选项2" border></el-checkbox>
    </div>
    <div class="mt-spacing-xs">
      <el-checkbox v-model="checked_3" label="备选项1" border size="medium"></el-checkbox>
      <el-checkbox v-model="checked_4" label="备选项2" border size="medium"></el-checkbox>
    </div>
    <div class="mt-spacing-xs">
      <el-checkbox-group v-model="checkboxGroup_1" size="small">
        <el-checkbox label="备选项1" border></el-checkbox>
        <el-checkbox label="备选项2" border disabled></el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="mt-spacing-xs">
      <el-checkbox-group v-model="checkboxGroup_2" size="mini" disabled>
        <el-checkbox label="备选项1" border></el-checkbox>
        <el-checkbox label="备选项2" border></el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script lang="ts">
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data() {
      return {
        checked: true,
        checked1: true,
        checked2: false,
        checkList: ['选中且禁用', '复选框 A'],
        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true,
        checkboxGroup1: ['上海'],
        checkboxGroup2: ['上海'],
        checkboxGroup3: ['上海'],
        checkboxGroup4: ['上海'],
        checked_1: true,
        checked_2: false,
        checked_3: false,
        checked_4: true,
        checkboxGroup_1: [],
        checkboxGroup_2: ['备选项2'],
      };
    },
    methods: {
      handleCheckAllChange(val: string[]) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value: string[]) {
        const checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
    },
  };
</script>
