<template>
  <div class="big_box">
    <div class="toolbar" ref="toolbar"></div>

    <div class="content" ref="content"><p>{{ value }}</p></div>
  </div>
</template>

<script>
import wangEditor from "wangeditor";
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  mounted() {
    let editor = new wangEditor(this.$refs.toolbar, this.$refs.content);

    editor.customConfig.onchange = html => {
      // html 即变化之后的内容
      // console.log(text);
      this.$emit("input", html);
    };
    editor.create();
  }
};
</script>

<style>
</style>