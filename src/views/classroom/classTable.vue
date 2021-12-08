<template>
  <div>
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
        <a @click="handleAddStudents(record)" class="cc-mleft">分班</a>
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
    <class-model ref="modalForm" @getAll="getAll"></class-model>
    <add-student-class ref="modalForm1" @getAll="getAll"></add-student-class>
  </div>
</template>
<script>
const API = require("../../request/api.js");
import ClassModel from "./modules/classModel.vue";
import addStudentClass from "./modules/addStudentClass.vue";
const columns = [
  {
    title: "班级名字",
    dataIndex: "className",
    key: "className",
  },
  {
    title: "教师名字",
    dataIndex: "teacherName",
    key: "teacherName",
  },
  {
    title: "教师性别",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "教师电话",
    dataIndex: "phone",
    key: "phone",
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
      selectedRowKeys: [],
      selectedId: [],
      pages: {
        current: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.selectClass();
  },
  components: {
    ClassModel,
    addStudentClass,
  },
  methods: {
    getAll() {
      this.selectClass();
    },
    //分页
    onChange(current, pageSize) {
      this.pages.current = current;
      this.pages.pageSize = pageSize;
      this.selectClass();
    },
    onShow(current, pageSize) {
      this.pages.current = current;
      this.pages.pageSize = pageSize;
      this.selectClass();
    },
    handleAddClass() {
      this.$refs.modalForm.title = "添加班级";
      this.$refs.modalForm.visible = true;
      this.$refs.modalForm.classType = "add";
      this.$refs.modalForm.teacherName = "";
    },
    handleEdit(record) {
      console.log(record);
      this.$refs.modalForm.classType = "put";
      this.$refs.modalForm.title = "修改班主任";
      this.$refs.modalForm.visible = true;
      this.$refs.modalForm.fuzhi(record);
    },
    handleAddStudents(record) {
      console.log(record);
      this.$refs.modalForm1.title = "学生分班管理";
      this.$refs.modalForm1.visible = true;
      this.$refs.modalForm1.fuzhi(record);
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
    async selectClass() {
      this.url = this.GLOBAL.baseUrl + "/clazz";
      this.data = {
        pageNo: this.pages.current,
        pageSize: this.pages.pageSize,
      };
      this.result = await API.init(this.url, this.data, "get");
      console.log(this.result);
      this.data = this.result.data.records;
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
      this.url = this.GLOBAL.baseUrl + "/clazz";
      this.result = await API.init(this.url, this.selectedId, "del");
      this.selectClass();
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
