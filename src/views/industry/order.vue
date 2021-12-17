<template>
  <div style="min-height: 100vh">
    <!-- 查询区域 -->
    <!-- <div>
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="标题">
              <a-input placeholder="请输入标题"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <span
              style="float: left; overflow: hidden"
              class="table-page-search-submitButtons"
            >
              <a-button type="primary" @click="searchQuery" icon="search"
                >查询</a-button
              >
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
                >重置</a-button
              >
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div> -->
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button type="primary" @click="handleAddClass" icon="plus"
        >新增</a-button
      >
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
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
      </span>
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
    <div v-if="imgIstrue" class="img-address">
      <a-icon
        type="close"
        :style="{ fontSize: '16px', color: '#08c' }"
        class="icon-address"
        @click="imgIstrue = false"
      />
      <img :src="backImg" alt="" />
    </div>
    <product-model ref="modalForm" @getAll="getAll"></product-model>
  </div>
</template>
<script>
const API = require("../../request/api.js");
import productModel from "./modules/productModel.vue";
const columns = [
  {
    title: "客户姓名",
    dataIndex: "cuName",
    key: "cuName",
  },
  {
    title: "产品名称",
    dataIndex: "productName",
    key: "productName",
  },
  {
    title: "员工姓名",
    dataIndex: "employeeName",
    key: "employeeName",
  },
  {
    title: "产品数量",
    dataIndex: "number",
    key: "number",
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "action" },
    align: "center",
    width: 150,
  },
];
export default {
  data() {
    return {
      data: [],
      columns,
      imgIstrue: false,
      backImg: "",
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
    productModel,
  },
  methods: {
    clImg(index) {
      console.log(index);
      this.backImg = index;
      this.imgIstrue = true;
    },
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
      this.url = this.GLOBAL.baseUrl + "/order";
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
      this.url = this.GLOBAL.baseUrl + "/order";
      this.result = await API.init(this.url, this.selectedId, "del");
      this.selectSys();
      this.selectedRowKeys = [];
    },
  },
};
</script>
<style scoped>
.icon-address {
  position: relative;
  top: 30px;
  left: 90%;
  cursor: pointer;
}
.img-address {
  width: 400px;
  height: 400px;
  position: fixed;
  top: 20%;
  left: 45%;
}
.img-address img {
  width: 100%;
  height: 100%;
}
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
