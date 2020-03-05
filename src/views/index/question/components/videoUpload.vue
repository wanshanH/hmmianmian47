<template>
  <div class="videoUpload">
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过2mb</div>
    </el-upload>
    <video class="video" :src="videoUrl" controls></video>
  </div>
</template>

<script>
export default {
  props: {
    video: String
  },
  data() {
    return {
      videoUrl: "",
      uploadUrl: process.env.VUE_APP_CODERUL + "/question/upload"
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.videoUrl = URL.createObjectURL(file.raw);
      this.$emit("update:video", res.data.url);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传视频只能是 MP4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传视频大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.videoUpload {

  .el-upload {
    margin-top: 60px;
    border: none;
  }
  .video {
    width: 320px;
    height: 200px;
    background-color: #333;
  }

  .avatar-uploader {
    text-align: left;
  }
}
</style>