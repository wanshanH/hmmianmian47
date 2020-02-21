<template>
  <el-dialog
    title="用户注册"
    :center="true"
    width="603px"
    :visible.sync="dialogFormVisible"
    :show-close="false"
  >
    <el-form :model="form" :rules="rules">
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
      <el-form-item prop="password" label="密码" :label-width="formLabelWidth" show-password>
        <el-input clearable v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 图形码 -->
      <el-form-item label="图形码" :label-width="formLabelWidth">
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
      <el-form-item label="验证码" :label-width="formLabelWidth">
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
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "65px",
      imgUrl: process.env.VUE_APP_CODERUL + "/captcha?type=sendsms",
      sec: 0,
      form: {
        name: "",
        Email: "",
        phone: "",
        password: "",
        imgCode: "",
        rCode: ""
      },
      rules: {
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
        ]
      }
    };
  },
  methods: {
    // 获取图形码
    // 请求后面加一个随机数或时间戳
    getNewCode() {
      this.imgUrl =
        process.env.VUE_APP_CODERUL + "/captcha?type=sendsms&t=" + Date.now();
    },
    getPhoneCode() {
      this.sec = 60;
      let timerID = setInterval(() => {
        this.sec--;
        if (this.sec == 0) {
          clearInterval(timerID);
        }
      }, 1000);
      this.$axios({
        url: "/sendsms",
        method: "post",
        data: {
          code: this.form.imgCode,
          phone: this.form.phone
        },
        withCredentials: true
      }).then(res => {
        //成功回调
        window.console.log(res);
        if(res.data.code==200){
          alert("验证码为:"+res.data.data.captcha)
        }else{
          alert(res.data.message)
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
</style>