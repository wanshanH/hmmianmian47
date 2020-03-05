<template>
  <el-select v-model="subject" @change="selChange" placeholder="请选择学科">
    <el-option v-if="isSearch" value>所有学科</el-option>
    <el-option
      v-for="(item, index) in subjectList"
      :key="index"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
import { subject } from "@/api/subject.js";
export default {
  name: "subjectSelect",
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
      subjectList: [],
      subject: this.value
    };
  },
  watch: {
    value(val) {
      // 参数就是它改变后的值，只要把value改变后的值再赋值给subject就可以了
      // console.log('value变了，变成：' + val);
      this.subject = val;
    }
  },
  created() {
    //  获取学科数据
    subject({
      status: 1
    }).then(res => {
      // window.console.log(res);
      this.subjectList = res.data.data.items;
      // console.log(this.subjectList);
    });
  },
  methods: {
    selChange() {
      this.$emit("input", this.subject);
    }
  }
};
</script>

<style>
</style>