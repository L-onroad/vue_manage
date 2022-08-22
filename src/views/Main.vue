<template>
  <el-container style="height: 100vh">
    <el-aside width="auto">
      <CommonAside/>
    </el-aside>
    <el-container>
      <el-header style="height: 50px">
        <CommonHeader/>
      </el-header>
      <CommonTag/>
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside.vue"
import CommonHeader from "../components/CommonHeader.vue"
import CommonTag from "../components/CommonTag.vue"
export default {
  name: "Main",
  data() {
    return {};
  },
  components: { CommonAside, CommonHeader, CommonTag },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.el-header {
  background-color: #253a55;
  color: rgb(196, 196, 196);
  font-size: 14px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

</style>