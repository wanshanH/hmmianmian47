<template>
  <div class="question">
    <el-card class="box-card">
      <el-form ref="formInline" :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="学科" prop="subject">
          <subjectSelect :isSearch="true" v-model="form.subject"></subjectSelect>
        </el-form-item>
        <el-form-item prop="step" label="阶段">
          <el-select v-model="form.step" placeholder="请选择阶段">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="enterprise" label="企业">
          <businessSelect :isSearch="true" v-model="form.enterprise"></businessSelect>
        </el-form-item>
        <el-form-item prop="type" label="题型">
          <el-select v-model="form.type" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item prop="difficulty" label="难度">
          <el-select v-model="form.difficulty" placeholder="请选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="username" label="作者">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="create_date" label="日期">
          <el-date-picker v-model="form.create_date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <br />
        <el-form-item prop="title" label="标题" class="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">搜索</el-button>
          <el-button @click="clearSearch">清除</el-button>
          <el-button
            type="primary"
            @click="$refs.questionAdd.dialogFormVisible=true"
            class="el-icon-plus"
          >新增试题</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="title" label="题目"></el-table-column>
        <el-table-column prop="subject_name" label="学科 . 阶段">
          <template slot-scope="scope">
            <!-- 用过滤器做 -->
            {{ scope.row | getStep }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.type==1">单选</span>
            <span v-else-if="scope.row.type==2">多选</span>
            <span v-else>简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status==1">启用</span>
            <span v-else style="color:red;">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="showEdit(scope.row)" size="small" type="text">编辑</el-button>
            <el-button
              @click="changeStatus(scope.row)"
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
    <questionAdd ref="questionAdd"></questionAdd>
    <questionEdit ref="questionEdit"></questionEdit>
  </div>
</template>

<script>
import {
  questionList,
  questionStatus,
  questionRemove
} from "@/api/question.js";
import questionAdd from "./components/questionAdd";
import questionEdit from "./components/questionEdit";
export default {
  components: {
    questionAdd,
    questionEdit
  },
  name: "question",
  data() {
    return {
      businessList: [],
      form: {},
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0
    };
  },
  created() {
    //  页面一加载  获取题库列表
    this.getList();
  },

  //   过滤器渲染 学科.阶段
  filters: {
    getStep(val) {
      let stepName = "";

      if (val.step == 1) {
        stepName = "初级";
      } else if (val.step == 2) {
        stepName = "中级";
      } else {
        stepName = "高级";
      }
      return val.subject_name + " . " + stepName;
    }
  },

  methods: {
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.currentPage = 1;
      this.getList();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getList();
    },

    //  封装题库列表方法
    getList() {
      // 获取题库列表
      questionList({
        page: this.currentPage,
        limit: this.pageSize,
        ...this.form
      }).then(res => {
        // window.console.log(res);
        this.tableData = res.data.data.items;
        this.total = res.data.data.pagination.total;
      });
    },
    // 显示编辑题库
    showEdit(item) {
      // console.log(item);

      this.$refs.questionEdit.form = { ...item };
      this.$refs.questionEdit.form.city = this.$refs.questionEdit.form.city.split(
        ","
      );
      this.$refs.questionEdit.form.multiple_select_answer = this.$refs.questionEdit.form.multiple_select_answer.split(
        ","
      );
      this.$refs.questionEdit.dialogFormVisible = true;
    },
    // 清空搜索
    clearSearch() {
      this.$refs.formInline.resetFields();
      this.getList();
    },

    // 修改状态
    changeStatus(item) {
      questionStatus({
        id: item.id
      }).then(res => {
        if (res.data.code == 200) {
          this.$message.success("状态修改成功");
          this.getList();
        }
      });
    },

    // 删除题库数据
    doDel(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?")
        .then(() => {
          questionRemove({
            id: item.id
          }).then(res => {
            if (res.data.code == 200) {
              if (this.tableData.length == 1) {
                this.currentPage--;
              }
              if (this.currentPage == 0) {
                this.currentPage = 1;
              }
              this.$message.success("删除成功");
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    }
  }
};
</script>

<style lang="less">
.question {
  .el-card__body {
    padding-left: 0;

    .el-form--inline {
      .el-form-item {
        &:not(:last-child) .el-form-item__content .el-input {
          width: 300px;
        }

        &.title .el-form-item__content .el-input {
          width: 700px;
        }

        .el-form-item__label {
          padding: 0 31px 0;
        }
      }
    }
  }
}
</style>