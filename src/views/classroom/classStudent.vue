<template>
  <div>
    <!-- 查询区域 -->
    <div class="cc-df">
      <div style="width: 60px">
        <p style="margin-top: 5px">班级名:</p>
      </div>
      <a-select
        style="width: 30%"
        show-search
        placeholder="Select a teacher"
        option-filter-prop="children"
        :filter-option="filterOption"
        @change="handleChange"
      >
        <a-select-option v-for="(item, index) in classes" :key="index">
          {{ item.className }}
        </a-select-option>
      </a-select>
    </div>
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
    </a-table>
    <add-student-class ref="modalForm" @getAll="getAll"></add-student-class>
  </div>
</template>
<script>
const API = require("../../request/api.js");
import addStudentClass from "./modules/addStudentClass.vue";
const columns = [
  {
    title: "学生名字",
    dataIndex: "studentName",
    key: "studentName",
  },
  {
    title: "学生性别",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "学生生日",
    dataIndex: "birthday",
    key: "birthday",
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
      classes: [],
      classId: 0,
    };
  },
  created() {
    this.selectClass();
  },
  components: {
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
      this.$refs.modalForm.title = "学生分班管理";
      this.$refs.modalForm.visible = true;
      const record = {
        id: this.classId,
      };
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
    //select
    handleChange(value) {
      // console.log(`selected ${value}`);
      this.classId = this.classes[value].id;
      console.log(`selected ${this.classId}`);
      this.selectStudent();
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    async selectClass() {
      this.url = this.GLOBAL.baseUrl + "/clazz";
      this.data = {
        className: "",
      };
      this.result = await API.init(this.url, this.data, "get");
      this.classes = this.result.data.records;
    },
    async selectStudent() {
      this.url = this.GLOBAL.baseUrl + "/clazz/stu";
      this.data = {
        clazzId: this.classId,
      };
      this.result = await API.init(this.url, this.data, "get");
      this.data = this.result.data;
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    async bathDel() {
      for (let i = 0; i < this.selectedRowKeys.length; i++) {
        this.selectedId[i] = this.data[this.selectedRowKeys[i]].id;
      }
      this.url = this.GLOBAL.baseUrl + "/stu/class";
      this.result = await API.init(this.url, this.selectedId, "del");
      this.selectStudent();
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
