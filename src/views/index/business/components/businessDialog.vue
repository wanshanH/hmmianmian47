<template>
  <el-dialog width="650px" :title="isAdd? '新增企业':'编辑企业'" center :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="eid" label="企业编号" :label-width="formLabelWidth">
        <el-input v-model="form.eid" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="企业名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="short_name" label="企业简称" :label-width="formLabelWidth">
        <el-input v-model="form.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="intro" label="企业简介" :label-width="formLabelWidth">
        <el-input v-model="form.intro" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="remark" label="企业备注" :label-width="formLabelWidth">
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
import { businessAdd, businessEdit } from "@/api/business.js";
export default {
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
        eid: [
          {
            required: true,
            message: "企业编号不能为空",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "企业名称不能为空",
            trigger: "blur"
          }
        ],
        short_name: [
          {
            required: true,
            message: "企业简称不能为空",
            trigger: "blur"
          }
        ],
        intro: [
          {
            required: true,
            message: "企业简介不能为空",
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
            businessAdd(this.form).then(res => {
              // window.console.log(res);
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
            businessEdit(this.form).then(res => {
              // window.console.log(res);
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