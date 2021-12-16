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
      <span slot="img" slot-scope="text">
        <img
          :src="text"
          style="width: 30px; margin-left: 15px"
          @click="clImg(text)"
        />
      </span>
      <span slot="status" slot-scope="text">
        <p v-if="text" style="color: #1890ff; margin-top: 12px">正常</p>
        <p v-if="!text" style="color: red; margin-top: 12px">禁用</p>
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
    title: "管理名字",
    dataIndex: "adminName",
    key: "adminName",
  },
  {
    title: "手机号",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "用户头像",
    dataIndex: "avatar",
    key: "avatar",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "img" },
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "status" },
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
    handleAddClass() {
      this.$refs.modalForm.title = "添加管理员";
      this.$refs.modalForm.visible = true;
      this.$refs.modalForm.classType = "add";
      this.$refs.modalForm.roleName = "";
    },
    handleEdit(record) {
      console.log(record);
      this.$refs.modalForm.classType = "put";
      this.$refs.modalForm.title = "修改管理信息";
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
      this.url = this.GLOBAL.baseUrl + "/admin";
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
        this.selectedId[i] = this.data[this.selectedRowKeys[i]].userId;
      }
      this.url = this.GLOBAL.baseUrl + "/sys/user";
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
