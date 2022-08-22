<template>
  <header>
    <div class="topContent">
      <el-button
        @click="changeAside"
        type="info"
        icon="el-icon-menu"
        size="small"
      >
      </el-button>
      <el-breadcrumb separator="|">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-dropdown trigger="click" size="mini">
        <span>
          <img :src="userImg" class="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/海豹.png"),
    };
  },
  methods: {
    // //全局事件总线方法发送改变的状态
    // changeAside(){
    //     this.$bus.$emit('changeAside')
    // }
    //触发commit函数
    changeAside() {
      this.$store.commit("ifCollapse");
    },
    logOut() {
      this.$store.commit('clearToken')
      this.$store.commit('clearMenu')
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapState({
      tags: state => state.changeAside.tabsList
    })
  }
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  .topContent {
    display: flex;
    .el-button {
      margin: 15px 15px 15px 10px;
      padding: 5px;
    }
    .el-breadcrumb {
      line-height: 52px;
    }
  }
  .el-dropdown {
    margin-right: 20px;
    .userImg {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }
}
</style>