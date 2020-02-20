<template>
  <div class="login">
    <div class="box">
      <!-- 标题 -->
      <div class="title_box">
        <!-- log -->
        <img src="../../assets/hm.png" alt />
        <span class="title_left">黑马面面</span>
        <span class="line"></span>
        <span class="title_right">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="43px">
        <!-- 用户手机号 -->
        <el-form-item prop="phone">
          <el-input clearable v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            clearable
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="18">
              <div class="grid-content bg-purple-dark">
                <el-input
                  clearable
                  v-model="form.code"
                  prefix-icon="el-icon-key"
                  placeholder="请输入验证码"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <img class="img" src="../../assets/code.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 用户协议 -->
        <el-form-item prop="checked" class="align_item">
          <el-checkbox v-model="form.checked"></el-checkbox>我已阅读并同意
          <el-link class="align" type="primary">用户协议</el-link>和
          <el-link class="align" type="primary">隐私条款</el-link>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button class="box_btn" type="primary" @click="btnClick">登录</el-button>
          <el-button class="box_btn1" type="primary" @click="btnClick">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="../../assets/login.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: "",
        password: "",
        code: "",
        checked: false
      },
      rules: {
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          {
            min: 11,
            max: 11,
            message: "请输入正确的手机号码格式",
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
            min: 6,
            max: 16,
            message: "长度在6-16个字符",
            trigger: "change"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ],
        checked: [
          {
            pattern: /true/,
            message: "必须勾选用户协议",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    btnClick() {
      this.$refs.form.validate(v => {
        if (v) {
          alert("全部正确!");
        } else {
          alert("至少一个不正确");
        }
      });
    }
  }
};
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  justify-content: space-around;
  align-items: center;

  .box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding-right: 41px;
    box-sizing: border-box;

    .title_box {
      display: flex;
      align-items: center;
      margin: 44px 0 27px 48px;

      img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }

      .title_left {
        font-size: 22px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-right: 14px;
      }

      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }

      .title_right {
        font-size: 21px;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }

    .img {
      width: 100%;
      height: 40px;
      vertical-align: top;
    }

    .align_item {
      margin-top: 40px;

      .el-form-item__content {
        display: flex;
        align-items: center;
        line-height: 0;
        // height: 16px;
      }

      .align {
        height: 16px;
        font-size: 14px;
      }
    }

    .box_btn {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 26px;
    }
    .box_btn1 {
      width: 100%;
      margin-left: 0;
    }
  }
}
</style>