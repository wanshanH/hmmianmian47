<template>
  <el-dialog width="650px" :title="isAdd? '新增用户':'编辑用户'" center :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="电话" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="角色" prop="role">
        <el-select @change="form.role_id=form.role" v-model="form.role" placeholder="请选择角色">
          <el-option label="管理员" value="2"></el-option>
          <el-option label="老师" value="3"></el-option>
          <el-option label="学生" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth" label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="remark" label="用户备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>


<script>
import { userAdd, userEdit } from "@/api/user.js";
export default {
  name: "userD",
  data() {
    return {
      dialogFormVisible: false,
      isAdd: true,
      form: {
        eid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      formLabelWidth: "80px",
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空",
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
            message: "电话不能为空",
            trigger: "blur"
          },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            len: 11,
            message: "请输入正确的手机格式",
            trigger: "change"
          }
        ],
        role: [
          {
            required: true,
            message: "角色不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    save() {
      this.$refs.form.validate(v => {
        if (v) {
          if (this.isAdd) {
            userAdd(this.form).then(res => {
              //   window.console.log(res);
              if (res.data.code == 200) {
                this.$message.success("新增成功");
                this.$refs.form.resetFields();
                this.dialogFormVisible = false;
                this.$parent.getList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            userEdit(this.form).then(res => {
              //   window.console.log(res);
              if (res.data.code == 200) {
                this.$message.success("修改成功");
                this.dialogFormVisible = false;
                this.$parent.getList();
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style>
</style>