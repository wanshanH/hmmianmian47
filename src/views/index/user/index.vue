<template>
  <div>
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名称" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input class="long" v-model="formInline.email"></el-input>
        </el-form-item>

        <el-form-item label="角色" prop="role_id">
          <el-select class="long" v-model="formInline.role_id">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="doSearch" type="primary">搜索</el-button>
          <el-button @click="clearSearch">清除</el-button>
          <el-button @click="showAdd" type="primary" icon="el-icon-plus">新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色">
          <template slot-scope></template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else style="color:red;">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="showEdit(scope.row)" size="small" type="text">编辑</el-button>
            <el-button
              @click="userStatus(scope.row)"
              size="small"
              type="text"
            >{{scope.row.status==1? '禁用': '启用'}}</el-button>
            <el-button @click="doDel(scope.row)" size="small" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <userDialog ref="userDialog"></userDialog>
  </div>
</template>

<script>
import { userList, userStatus, userRemove } from "@/api/user.js";
import userDialog from "./components/userDialog";
export default {
  components: {
    userDialog
  },
  name: "user",
  data() {
    return {
      formInline: {
        username: "",
        phone: "",
        email: "",
        role: "",
        remark: "",
        status: ""
      },
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      oldItem: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 页容量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.getList();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getList();
    },

    // 封装 获取用户列表方法
    getList() {
      userList({
        page: this.currentPage,
        limit: this.pageSize,
        ...this.formInline
      }).then(res => {
        // window.console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },

    // 筛选查询
    doSearch() {
      this.currentPage = 1;
      this.getList();
    },

    // 清除筛选查询
    clearSearch() {
      this.$refs.formInline.resetFields();
      this.currentPage = 1;
      this.getList();
    },

    // 修改用户状态
    userStatus(item) {
      userStatus({
        id: item.id
      }).then(() => {
        // window.console.log(res);
        this.getList();
      });
    },

    // 新增用户
    showAdd() {
      this.$refs.userDialog.dialogFormVisible = true;
      this.$refs.userDialog.isAdd = true;
      this.$refs.userDialog.form = {};
      this.oldItem = 0;
    },

    // 编辑用户
    showEdit(item) {
      this.$refs.userDialog.dialogFormVisible = true;
      this.$refs.userDialog.isAdd = false;
      if (item != this.oldItem || this.oldItem == 0) {
        this.$refs.userDialog.form = { ...item };
        this.oldItem = item;
      }
    },

    // 删除 用户
    doDel(item) {
      userRemove({
        id: item.id
      }).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          if (this.tableData.length == 1) {
            this.currentPage--;
          }
          if (this.currentPage == 0) {
            this.currentPage = 1;
          }
          this.$message.success("删除成功");
          this.getList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="less">
.box-card {
  margin-bottom: 20px;

  .short {
    width: 150px;
  }
  .long {
    width: 200px;
  }
}
</style>