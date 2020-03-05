<template>
  <el-cascader
    v-model="city"
    :options="options"
    :props="{ expandTrigger: 'hover', value:'label' }"
    @change="handleChange"
  ></el-cascader>
</template>

<script>
import { regionDataPlus } from "element-china-area-data";
export default {
  props: {
    value: {
      default: ""
    }
  },
  data() {
    return {
      options: regionDataPlus,
      city: this.value
    };
  },
  methods: {
    handleChange() {
      // console.log(this.city);

      this.$emit("input", this.city);
    }
  }
};
</script>

<style>
</style>