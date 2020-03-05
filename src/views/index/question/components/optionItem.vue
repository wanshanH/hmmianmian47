<template>
  <div class="radio">
    <el-radio v-if="isRadio" :label="label"></el-radio>
    <el-checkbox v-else :label="label"></el-checkbox>
    <el-input type="text" v-model="selfText" @input="onInput"></el-input>
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    text: String,
    image: String,
    isRadio: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      imageUrl: this.image,
      selfText: this.text,
      uploadUrl: process.env.VUE_APP_CODERUL + "/question/upload"
    };
  },
  methods: {
    onInput() {
      this.$emit("update:text", this.selfText);
    },
    // 成功后
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //   console.log(res);
      this.$emit("update:image", res.data.url);
    },
    // 成功前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 图片 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.radio {
  display: flex;
  align-items: center;
  margin-top: 60px;

  .el-input {
    width: 520px;
    margin-right: 50px;
    margin-left: 20px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>