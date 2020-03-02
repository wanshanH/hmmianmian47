<template>
  <div>
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号" prop="rid">
          <el-input class="short" v-model="formInline.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
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
          <el-button type="primary" @click="doSearch">搜索</el-button>
          <el-button @click="clearSearch">清除</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$refs.subjectAdd.dialogFormVisible=true"
          >新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
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
              @click="subjectStatus(scope.row.id)"
              size="small"
              type="text"
            >{{scope.row.status==1? '禁用': '启用'}}</el-button>
            <el-button v-if="['超级管理员','管理员'].includes($store.state.role)" @click="doDel(scope.row)" size="small" type="text">删除</el-button>
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
    <subjectAdd ref="subjectAdd"></subjectAdd>
    <subjectEdit ref="subjectEdit"></subjectEdit>
  </div>
</template>

<script>
import { subject, getStatus, delSubject } from "@/api/subject.js";
import subjectAdd from "./components/subjectAdd";
import subjectEdit from "./components/subjectEdit";
export default {
  components: {
    subjectAdd,
    subjectEdit
  },
  name: "subject",
  data() {
    return {
      formInline: {
        rid: "",
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
    this.getSubject();
  },
  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.getSubject();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getSubject();
    },

    //  修改状态
    subjectStatus(id) {
      getStatus({
        id
      }).then(() => {
        // window.console.log(res);
        // 状态修改完成 重新请求数据
        this.getSubject();
      });
    },

    //  封装  获取学科列表
    getSubject() {
      //  获取学科列表  数据
      subject({
        page: this.currentPage,
        limit: this.pageSize,
        // 解构 赋值
        ...this.formInline
      }).then(res => {
        // window.console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    //   条件搜索 筛选
    doSearch() {
      this.currentPage = 1;
      this.getSubject();
    },
    //  重置表单  清除筛选
    clearSearch() {
      // 重置需要加 prop 属性
      this.$refs.formInline.resetFields();
      this.currentPage = 1;
      // 重新请求数据
      this.getSubject();
    },
    // 显示编辑对话框
    showEdit(item) {
      this.$refs.subjectEdit.dialogFormVisible = true;
      //  因为对象 是引用传值  传的是地址  所以需要拷贝
      if (item != this.oldItem) {
        this.$refs.subjectEdit.form = { ...item };
        this.oldItem = item;
      }
    },
    // 删除学科
    doDel(item) {
      if (this.tableData.length == 1) {
        this.currentPage--;
      }
      if (this.currentPage == 0) {
        this.currentPage = 1;
      }
      delSubject({
        id: item.id
      }).then(res => {
        // window.console.log(res);
        if (res.data.code == 200) {
          this.$message.success("删除成功");
          this.getSubject();
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