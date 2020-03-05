<template>
  <div>
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="企业编号" prop="eid">
          <el-input class="short" v-model="formInline.eid"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input class="long" v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input class="short" v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select class="long" v-model="formInline.status">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="btnSearch">搜索</el-button>
          <el-button @click="clearSearch">清除</el-button>
          <el-button @click="showAdd" type="primary" icon="el-icon-plus">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">{{scope.row.create_time | formatTime}}</template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else style="color:red;">禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" v-if="['超级管理员','管理员','老师'].includes($store.state.role)">
          <template slot-scope="scope">
            <el-button @click="showEdit(scope.row)" size="small" type="text">编辑</el-button>
            <el-button
              @click="getStatus(scope.row)"
              size="small"
              type="text"
            >{{ scope.row.status==1? "禁用": "启用" }}</el-button>
            <el-button
              v-if="['超级管理员','管理员'].includes($store.state.role)"
              @click="doDel(scope.row)"
              size="small"
              type="text"
            >删除</el-button>
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
    <!-- <businessAdd ref="businessAdd"></businessAdd>
    <businessEdit ref="businessEdit"></businessEdit>-->
    <businessDialog ref="businessDialog"></businessDialog>
  </div>
</template>

<script>
import {
  businessList,
  businessStatus,
  businessRemove
} from "@/api/business.js";
// import businessAdd from "./components/businessAdd";
// import businessEdit from "./components/businessEdit";
import businessDialog from "./components/businessDialog";
export default {
  name: "qiye",
  components: {
    // businessAdd,
    // businessEdit
    businessDialog
  },
  data() {
    return {
      formInline: {
        eid: "",
        name: "",
        username: "",
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
    //  获取企业列表
    this.getList();
  },
  methods: {
    // 页容量
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.getList();
    },
    // 当前页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getList();
    },

    // 封装获取企业列表方法
    getList() {
      businessList({
        page: this.currentPage,
        limit: this.pageSize,
        ...this.formInline
      }).then(res => {
        // window.console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },

    // 改变 启用禁用状态
    getStatus(item) {
      businessStatus({
        id: item.id
      }).then(() => {
        // window.console.log(res);
        this.$message.success("状态修改成功");
        this.getList();
      });
    },

    // 条件筛选
    btnSearch() {
      this.currentPage = 1;
      this.getList();
    },

    // 清空筛选
    clearSearch() {
      //  重置表单
      this.$refs.formInline.resetFields();
      this.currentPage = 1;
      this.getList();
    },

    // 显示新增弹框
    showAdd() {
      this.$refs.businessDialog.dialogFormVisible = true;
      this.$refs.businessDialog.isAdd = true;
      this.$refs.businessDialog.form = {};
    },

    //  显示编辑弹框
    showEdit(item) {
      this.$refs.businessDialog.dialogFormVisible = true;
      this.$refs.businessDialog.isAdd = false;

      if (item != this.oldItem) {
        this.$refs.businessDialog.form = { ...item };
        this.oldItem = item;
      }
    },

    // 删除企业
    doDel(item) {
      businessRemove({
        id: item.id
      }).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          if (this.tableData.length == 1) {
            this.currentPage--;
          }
          if (this.currentPage == 0) {
            this.currentPage = 1;
          }
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
.el-pagination {
  text-align: center;
}
</style>