<template>
  <el-container class="my_container">
    <el-header class="my_header">
      <div class="left">
        <i
          @click="isCollapse=!isCollapse"
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        ></i>
        <img src="./imgs/logo.png" alt />
        <span class="span">黑马面面</span>
      </div>
      <div class="right">
        <img :src="avatar" alt />
        <span class="user">{{username}},你好</span>
        <el-button size="small" @click="btnLogout" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside class="my_aside" width="auto">
        <el-menu :collapse="isCollapse" default-active="1" class="el-menu-vertical-demo">
          <el-menu-item index="1">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { info, logout } from "@/api/index.js";
import { removeToken } from "@/utilis/token.js";
export default {
  data() {
    return {
      username: "",
      avatar: "",
      isCollapse: false
    };
  },
  created() {
    info().then(res => {
      window.console.log(res);
      this.username = res.data.data.username;
      this.avatar = process.env.VUE_APP_CODERUL + "/" + res.data.data.avatar;
    });
  },
  methods: {
    btnLogout() {
      this.$confirm("您将退出本系统,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then(res => {
            window.console.log(res);
            removeToken();
            this.$message.success("退出成功");
            this.$router.push({
              path: "/",
              query: {}
            });
          });
        })
        .catch(() => {
          this.$message.info("取消退出");
        });
    }
  }
};
</script>

<style lang="less">
.my_container {
  height: 100%;

  .my_header {
    display: flex;
    justify-content: space-between;

    .left {
      height: 100%;
      display: flex;
      align-items: center;

      i {
        font-size: 24px;
        margin-right: 22px;
      }

      .span {
        font-weight: 600;
        font-size: 22px;
        color: rgba(73, 161, 255, 1);
        margin-left: 11px;
      }
    }

    .right {
      height: 100%;
      display: flex;
      align-items: center;

      img {
        width: 43px;
        height: 43px;
        vertical-align: top;
        border-radius: 50%;
      }

      .user {
        font-size: 15px;
        margin: 0 38px 0 9px;
      }
    }
  }

  //   .my_aside {
  //     background-color: yellowgreen;
  //   }

  .my_main {
    background-color: #0094ff;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>