<template>
  <div style="min-height: 100vh">
    <!-- 操作按钮区域 -->
    <div class="table-operator" style="height: 37px">
      <a-button
        v-if="selectedRowKeys.length > 0"
        ghost
        type="primary"
        icon="delete"
        @click="bathDel"
        >批量删除
      </a-button>
    </div>
    <a-table
      :columns="columns"
      :dataSource="data"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :pagination="false"
    >
    </a-table>
    <a-pagination
      class="address"
      :total="result.data.total"
      show-size-changer
      show-less-items
      show-quick-jumper
      @change="onChange"
      @showSizeChange="onShow"
    />
    <person-table-model ref="modalForm" @getAll="getAll"></person-table-model>
  </div>
</template>
<script>
const API = require("../../request/api.js");
import personTableModel from "./modules/personTableModel.vue";
const columns = [
  {
    title: "员工姓名",
    dataIndex: "employeeName",
    key: "employeeName",
  },
  {
    title: "订单号",
    dataIndex: "orderNumber",
    key: "orderNumber",
  },
  {
    title: "交易额",
    dataIndex: "totalMoney",
    key: "totalMoney",
  },
  {
    title: "完成时间",
    dataIndex: "nowTime",
    key: "nowTime",
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
  components: {
    personTableModel,
  },
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
    handleAddClass() {
      this.$refs.modalForm.title = "添加员工信息";
      this.$refs.modalForm.visible = true;
      this.$refs.modalForm.classType = "add";
      this.$refs.modalForm.teacherName = "";
    },
    handleEdit(record) {
      console.log(record);
      this.$refs.modalForm.classType = "put";
      this.$refs.modalForm.title = "修改员工信息";
      this.$refs.modalForm.visible = true;
      this.$refs.modalForm.fuzhi(record);
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
      this.url = this.GLOBAL.baseUrl + "/per";
      this.data = {
        pageNo: this.pages.current,
        pageSize: this.pages.pageSize,
      };
      this.result = await API.init(this.url, this.data, "get");
      this.data = this.result.data.records;
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    async bathDel() {
      for (let i = 0; i < this.selectedRowKeys.length; i++) {
        this.selectedId[i] = this.data[this.selectedRowKeys[i]].id;
      }
      this.url = this.GLOBAL.baseUrl + "/per";
      this.result = await API.init(this.url, this.selectedId, "del");
      this.selectSys();
      this.selectedRowKeys = [];
    },
  },
};
</script>
<style scoped>
.address {
  margin-left: 59%;
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
