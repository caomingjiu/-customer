<template>
  <div>
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" @click="handleAddClass" icon="plus"
        >新增</a-button
      >
    </div>
    <a-table :columns="columns" :dataSource="data" :pagination="false">
      <span slot="status" slot-scope="text">
        <p v-if="text" style="color: #1890ff">正常</p>
        <p v-if="!text" style="color: red">禁用</p>
      </span>
    </a-table>
    <a-pagination
      class="address"
      :total="result.data.total"
      show-size-changer
      show-quick-jumper
      @change="onChange"
      @showSizeChange="onShow"
    />
  </div>
</template>
<script>
const API = require("../../request/api.js");
const columns = [
  {
    title: "学期ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "学期名称",
    dataIndex: "semesterName",
    key: "semesterName",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime",
  },
];
export default {
  data() {
    return {
      data: [],
      columns,
      selectedRowKeys: [],
      selectedId: [],
      pages: {
        current: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.selectSys();
  },
  components: {},
  methods: {
    getAll() {
      this.selectSys();
    },
    //分页
    onChange(current, pageSize) {
      this.pages.current = current;
      this.pages.pageSize = pageSize;
      this.selectSys();
    },
    onShow(current, pageSize) {
      this.pages.current = current;
      this.pages.pageSize = pageSize;
      this.selectSys();
    },
    async handleAddClass() {
      this.url = this.GLOBAL.baseUrl + "/semester";
      this.result = await API.init(this.url, {}, "get");
      if ((this.result.code = 20001)) {
        this.$message({
          message: "新增学期成功",
          type: "success",
        });
      }
    },
    formatDateTime(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    },
    async selectSys() {
      this.url = this.GLOBAL.baseUrl + "/semester/page";
      this.data = {
        pageNo: this.pages.current,
        pageSize: this.pages.pageSize,
      };
      this.result = await API.init(this.url, this.data, "get");
      console.log(this.result);
      this.data = this.result.data.records;
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].createTime = this.formatDateTime(this.data[i].createTime);
      }
      console.log(this.data);
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    async bathDel() {
      for (let i = 0; i < this.selectedRowKeys.length; i++) {
        this.selectedId[i] = this.data[this.selectedRowKeys[i]].id;
      }
      this.url = this.GLOBAL.baseUrl + "/sys/role";
      this.result = await API.init(this.url, this.selectedId, "del");
      this.selectSys();
      this.selectedRowKeys = [];
    },
  },
};
</script>
<style scoped>
.address {
  margin-left: 65%;
  margin-top: 10px;
}
/*列表上方操作按钮区域*/
.ant-card-body .table-operator {
  margin-bottom: 8px;
}
/** Button按钮间距 */
.table-operator .ant-btn {
  margin: 0 8px 8px 0;
}
.table-operator .ant-btn-group .ant-btn {
  margin: 0;
}

.table-operator .ant-btn-group .ant-btn:last-child {
  margin: 0 8px 8px 0;
}

.table-page-search-submitButtons {
  margin-top: 3px;
  margin-left: -70px;
}
</style>>
