<template>
  <el-select v-model="business" @change="selChange" placeholder="请选择企业">
    <el-option v-if="isSearch" value>所有企业</el-option>
    <el-option
      v-for="(item, index) in businessList"
      :key="index"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
import { businessList } from "@/api/business.js";
export default {
  props: {
    value: {
      default: ""
    },
    isSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      business: this.value,
      businessList: []
    };
  },
  watch: {
    value(val) {
      this.business = val;
    }
  },
  created() {
    //  获取企业数据
    businessList({
      status: 1
    }).then(res => {
      // window.console.log(res);
      this.businessList = res.data.data.items;
    });
  },
  methods: {
    selChange() {
      this.$emit("input", this.business);
    }
  }
};
</script>

<style>
</style>