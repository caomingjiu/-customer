<template>
  <div>
    <a-modal
      width="500px"
      :title="title"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div class="cc-df">
        <div style="width: 70px">
          <p style="margin-top: 5px">选择学生:</p>
        </div>
        <a-select
          style="width: 90%"
          show-search
          v-model="studentNames"
          mode="multiple"
          placeholder="Select a teacher"
          option-filter-prop="children"
          :filter-option="filterOption"
          @change="handleChange"
        >
          <a-select-option v-for="(item, index) in teachers" :key="index">
            {{ item.studentName }}
          </a-select-option>
        </a-select>
      </div>
    </a-modal>
  </div>
</template>
<script>
const API = require("../../../request/api.js");
export default {
  data() {
    return {
      title: "",
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
      teachers: [],
      studentIds: [],
      studentNames: [],
      className: "",
      record: {},
    };
  },
  created() {
    this.selectTeacher();
  },
  methods: {
    fuzhi(record) {
      this.record = record;
    },
    async selectTeacher() {
      this.url = this.GLOBAL.baseUrl + "/stu/list";
      this.result = await API.init(this.url, {}, "get");
      console.log(this.result);
      this.teachers = this.result.data;
      console.log(this.teachers);
    },
    async addClass() {
      this.url = this.GLOBAL.baseUrl + "/stu/clazz";
      this.data = {
        clazzId: this.record.id,
        studentIds: this.studentIds,
      };
      this.result = await API.init(this.url, this.data, "post");
      console.log(this.result);
      if (this.result.code == 1) {
        this.$message({
          message: "新增成功",
          type: "success",
        });
        this.studentNames = [];
        this.studentIds = [];
        this.selectTeacher();
        this.visible = false;
        this.$emit("getAll");
      }
      if (this.result.code == 50003) {
        this.$message.error("新增失败，班级已存在");
      }
    },
    //选择器
    handleChange(value) {
      for (let i = 0; i < this.studentNames.length; i++) {
        this.studentIds[i] = this.teachers[this.studentNames[i]].id;
      }
      console.log(this.studentIds);
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    //model
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.confirmLoading = false;
        this.addClass();
      }, 2000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
  },
};
</script>
