<template>
  <div style="margin-left: 10px">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <CommonForm
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></CommonForm>
      <div slot="footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manageHeader">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <CommonForm
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </CommonForm>
    </div>
    <CommonTable :tableData="tableData" :tableLabel="tableLabel" :config="config" @changePage="getList()" @edit="editUser" @del="delUser"></CommonTable>
  </div>
</template>

<script>
import CommonForm from "../components/CommonForm";
import CommonTable from "../components/CommonTable";
import { getUser } from "../api/data"
export default {
  name: "User",
  components: { CommonForm, CommonTable },
  data() {
    return {
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "address",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        sex: "",
        age: "",
        birth: "",
        address: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: '200px',
        },
        {
          prop: "address",
          label: "地址",
          width: '320px',
        },
      ],
      config: {

      }
    };
  },
  methods: {
    confirm() {
      if (this.operateType === "edit") {
        this.$axios.post("user/edit", this.operateForm).then((res) => {
          this.isShow = false;
          this.getList()
          console.log(res);
        });
      } else {
        this.$axios.post("user/add", this.operateForm).then((res) => {
          this.isShow = false;
          this.getList()
          console.log(res);
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        name: "",
        sex: "",
        age: "",
        birth: "",
        address: "",
      };
    },
    getList(name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      getUser({
        page: this.config.page,
        name
      }).then(({ data: res })=> {
        this.tableData = res.list.map(item => {
          item.sexLabel = item.sex === 0 ? '女' : '男'
          return item
        })
        this.config.total = res.count
        this.config.loading = false
      })
    },
    editUser(row) {
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    },
    delUser(row) {
      this.$confirm('真的要删？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = row.id
        this.$axios.post('/user/del', {
          params: { id }
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成了！'
          })
          this.getList()
        })
      })
    }
  },
  created () {
    this.getList()
  }
};
</script>

<style lang="less" scoped>
.manageHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>