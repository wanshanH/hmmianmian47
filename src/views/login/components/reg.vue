<template>
  <el-dialog
    title="用户注册"
    :center="true"
    width="603px"
    :visible.sync="dialogFormVisible"
    :show-close="false"
  >
    <el-form ref="regForm" :model="form" :rules="rules">
      <!-- 头像 -->
      <el-form-item prop="avatar" label="头像" :label-width="formLabelWidth">
        <el-upload
          v-model="form.avatar"
          name="image"
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <!-- 昵称 -->
      <el-form-item prop="name" label="昵称" :label-width="formLabelWidth">
        <el-input clearable v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item prop="Email" label="邮箱" :label-width="formLabelWidth">
        <el-input clearable v-model="form.Email" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 手机 -->
      <el-form-item prop="phone" label="手机" :label-width="formLabelWidth">
        <el-input clearable v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
        <el-input clearable v-model="form.password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <!-- 图形码 -->
      <el-form-item prop="imgCode" label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input clearable v-model="form.imgCode"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <img class="imgCode" @click="getNewCode" :src="imgUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="rCode" label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input clearable v-model="form.rCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-button
              @click="getPhoneCode"
              :disabled="sec!=0"
              class="el_button"
            >{{sec==0? "获取用户验证码":"还剩"+" "+sec+" "+"秒"}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doregister">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from "axios";
import { sendSMS, register } from "@/api/reg.js";
export default {
  data() {
    return {
      uploadUrl: process.env.VUE_APP_CODERUL + "/uploads",
      imageUrl: "",
      dialogFormVisible: false,
      formLabelWidth: "65px",
      imgUrl: process.env.VUE_APP_CODERUL + "/captcha?type=sendsms",
      sec: 0,
      form: {
        avatar: "",
        name: "",
        Email: "",
        phone: "",
        password: "",
        imgCode: "",
        rCode: ""
      },
      rules: {
        avatar: [
          {
            required: true,
            message: "请上传头像",
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入昵称",
            trigger: "blur"
          },
          {
            min: 3,
            max: 6,
            message: "长度在3-6个字符",
            trigger: "change"
          }
        ],
        Email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          },
          {
            pattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            message: "请输入正确的邮箱格式",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            len: 11,
            message: "请输入正确的手机格式",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 8,
            max: 16,
            message: "长度在8-16个字符",
            trigger: "change"
          }
        ],
        imgCode: [
          {
            required: true,
            message: "请输入图形码",
            trigger: "blur"
          },
          {
            len: 4,
            message: "图形码长度为4位",
            trigger: "change"
          }
        ],
        rCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          },
          {
            len: 4,
            message: "验证码长度为4位",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    //  头像上传成功后
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // 上传成功后
      // window.console.log(res);
      // 手动上传数据  要对这个数据进行重新校验
      this.form.avatar = res.data.file_path;
      //   单独进行校验
      this.$refs.regForm.validateField("avatar");
    },
    // 上传前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像只能是图片格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 获取图形码
    // 请求后面加一个随机数或时间戳
    getNewCode() {
      this.imgUrl =
        process.env.VUE_APP_CODERUL + "/captcha?type=sendsms&t=" + Date.now();
    },
    getPhoneCode() {
      if (!/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.phone)) {
        return this.$message.error("手机号码格式不正确");
      }

      if (this.form.imgCode.length != 4) {
        return this.$message.error("图形码格式不正确");
      }

      this.sec = 60;
      let timerID = setInterval(() => {
        this.sec--;
        if (this.sec == 0) {
          clearInterval(timerID);
        }
      }, 100);
      sendSMS({
        phone: this.form.phone,
        code: this.form.imgCode
      }).then(res => {
        //成功回调
        // window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success("验证码为:" + res.data.data.captcha);
          // alert("验证码为:"+res.data.data.captcha)
        } else {
          // alert(res.data.message)
          this.$message.error(res.data.message);
        }
      });
    },
    //  全局表单验证
    doregister() {
      this.$refs.regForm.validate(valid => {
        if (valid) {
          register({
            username: this.form.name,
            phone: this.form.phone,
            email: this.form.Email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.rCode
          }).then(res => {
            // window.console.log(res);
            if (res.data.code == 200) {
              this.$message.success("注册成功");
              // 重置头像
              this.imageUrl = "";
              // 成功之后重置表单
              this.$refs.regForm.resetFields();
              // 注册成功后关闭弹窗
              this.dialogFormVisible = false;
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right ;#01C5FB, #1495fd);

  .el-dialog__title {
    font-size: 17px;
    color: #fff;
  }
}

.imgCode {
  width: 100%;
  vertical-align: top;
  height: 41px;
}

.el-dialog__body {
  .el_button {
    font-size: 12px;
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
.avatar-uploader {
  text-align: center;
}
</style>