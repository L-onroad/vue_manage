<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h4>{{ isCollapse ? "管理栏" : "后台管理系统" }}</h4>
    <el-menu-item
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
      @click="toTitle(item)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu
      v-for="(item, index) in hasChildren"
      :index="index.toString()"
      :key="index"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="(subItem, subIndex) in item.children"
        :key="subItem.path"
      >
        <el-menu-item :index="subIndex.toString()" @click="toTitle(subItem)">{{
          subItem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      // isCollapse: true,
      menu: [
        // {
        //   path: "/",
        //   name: "Home",
        //   label: "首页",
        //   icon: "s-home",
        //   url: "Home/Home",
        // },
        // {
        //   path: "/Mall",
        //   name: "Mall",
        //   label: "商品管理",
        //   icon: "goods",
        //   url: "MallManage/MallManage",
        // },
        // {
        //   path: "/User",
        //   name: "User",
        //   label: "用户管理",
        //   icon: "user",
        //   url: "UserManage/UserManage",
        // },
        // {
        //   path: "/Others",
        //   name: "Others",
        //   label: "其他",
        //   icon: "location",
        //   children: [
        //     {
        //       path: "Page1",
        //       name: "Page1",
        //       label: "页面1",
        //       icon: "setting",
        //       url: "Other/PageOne",
        //     },
        //     {
        //       path: "Page2",
        //       name: "Page2",
        //       label: "页面2",
        //       icon: "setting",
        //       url: "Other/PageOne",
        //     },
        //   ],
        // },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    toTitle(item) {
      this.$router.push({
        name: item.name,
      })
      this.$store.commit('inputBreadcrumb',item)
    },
    // changeAside() {
    //   this.isCollapse = !this.isCollapse
    // }
  },
  computed: {
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.changeAside.isCollapse;
    },
    asyncMenu() {
      return this.$store.state.changeAside.menu
    }
  },
  mounted() {
    // //接收传过来的变化属性
    // this.$bus.$on('changeAside',this.changeAside)
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  border: none;
  h4 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
  background: linear-gradient(
    to right,
    #2c3e50,
    #bdc3c7
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  .el-menu-item-group {
    background: linear-gradient(to right, #2c3e50, #bdc3c7);
  }
}
</style>