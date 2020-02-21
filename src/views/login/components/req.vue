<template>
  <el-dialog
    title="用户注册"
    :center="true"
    width="603px"
    :visible.sync="dialogFormVisible"
    :show-close="false"
  >
    <el-form :model="form">
      <!-- 昵称 -->
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.Email" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 手机 -->
      <el-form-item label="手机" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 图形码 -->
      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input clearable v-model="form.imgCode"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <img class="imgCode" src="../../../assets/code.png" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.rCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-button class="el_button">获取用户验证码</el-button>
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
      dialogFormVisible: true,
      form: {
        name: "",
        Email: "",
        phone: "",
        password: "",
        imgCode: "",
        rCode: ""
      },
      formLabelWidth: "65px"
    };
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