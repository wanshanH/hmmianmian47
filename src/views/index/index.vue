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
        <img :src="$store.state.avatar" alt />
        <span class="user">{{$store.state.username}},你好</span>
        <el-button size="small" @click="btnLogout" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside class="my_aside" width="auto">
        <el-menu
          :collapse="isCollapse"
          default-active="/index/chart"
          class="el-menu-vertical-demo"
          :router="true"
        >
          <template v-for="(item, index) in children">
            <el-menu-item
              :key="index"
              :index="'/index/'+item.path"
              v-if="item.meta.roles.includes($store.state.role)"
            >
              <i :class="item.meta.icon"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main class="my_main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { logout } from "@/api/index.js";
import { getToken, removeToken } from "@/utilis/token.js";
import children from "@/router/children.js";
export default {
  data() {
    return {
      children,
      // username: "",
      // avatar: "",
      isCollapse: false
    };
  },
  beforeCreate() {
    if (!getToken()) {
      this.$message.error("请先登录");
      this.$router.push("/login");
    }
  },
  // created() {
  //   // 调用获取用户信息接口
  //   info().then(res => {
  //     // window.console.log(res);
  //     this.username = res.data.data.username;
  //     this.avatar = process.env.VUE_APP_CODERUL + "/" + res.data.data.avatar;
  //   });
  // },
  methods: {
    btnLogout() {
      this.$confirm("您将退出本系统,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then(() => {
            // window.console.log(res);
            removeToken();
            // 退出清空vuex
            this.$store.commit("changeUsername", "");
            this.$store.commit("changeAvatar", "");

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
        border-radius: 30%;
      }

      .user {
        font-size: 15px;
        margin: 0 38px 0 9px;
      }
    }
  }

  // .my_aside {
  //   background-color: yellowgreen;
  // }

  // .my_main {
  //   background-color: #0094ff;
  // }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>