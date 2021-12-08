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
        <div style="width: 60px" v-if="classType == 'add'">
          <p style="margin-top: 5px">班级名:</p>
        </div>
        <a-input
          v-if="classType == 'add'"
          v-model="className"
          style="width: 90%"
          placeholder="input className"
        />
      </div>
      <div class="cc-df">
        <div style="width: 60px">
          <p style="margin-top: 5px">教师名:</p>
        </div>
        <a-select
          style="width: 90%"
          show-search
          v-model="teacherName"
          placeholder="Select a teacher"
          option-filter-prop="children"
          :filter-option="filterOption"
          @change="handleChange"
        >
          <a-select-option v-for="(item, index) in teachers" :key="index">
            {{ item.teacherName }}
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
      teacherId: 0,
      teacherName: "",
      className: "",
      classType: "",
      record: {},
    };
  },
  created() {
    this.selectTeacher();
  },
  methods: {
    fuzhi(record) {
      this.record = record;
      for (let i = 0; i < this.teachers.length; i++) {
        if (this.record.teacherName == this.teachers[i].teacherName) {
          this.teacherId = this.teachers[i].id;
        }
      }
      this.teacherName = this.record.teacherName;
      console.log(this.teacherName);
    },
    async selectTeacher() {
      this.url = this.GLOBAL.baseUrl + "/teacher";
      this.result = await API.init(this.url, {}, "get");
      console.log(this.result);
      this.teachers = this.result.data;
      console.log(this.teachers);
    },
    async addClass() {
      this.url = this.GLOBAL.baseUrl + "/clazz";
      this.data = {
        className: this.className,
        teacherId: this.teacherId,
      };
      this.result = await API.init(this.url, this.data, "post");
      console.log(this.result);
      if (this.result.code == 1) {
        this.$message({
          message: "新增成功",
          type: "success",
        });
        this.visible = false;
        this.$emit("getAll");
      }
      if (this.result.code == 50003) {
        this.$message.error("新增失败，班级已存在");
      }
    },
    async putClass() {
      this.url = this.GLOBAL.baseUrl + "/clazz/teacher";
      this.data = {
        clazzId: this.record.id,
        teacherId: this.teacherId,
      };
      this.result = await API.init(this.url, this.data, "post");
      console.log(this.result);
      if (this.result.code == 1) {
        this.$message({
          message: "修改成功",
          type: "success",
        });
        this.visible = false;
        this.$emit("getAll");
      }
      if (this.result.code == 50001) {
        this.$message.error("修改失败");
      }
    },
    //选择器
    handleChange(value) {
      // console.log(`selected ${value}`);
      for (let i = 0; i < this.teachers.length; i++) {
        if (this.teachers[value].teacherName == this.teachers[i].teacherName) {
          this.teacherId = this.teachers[i].id;
        }
      }
      console.log(`selected ${this.teacherId}`);
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
        if (this.classType == "add") {
          this.addClass();
        }
        if (this.classType == "put") {
          this.putClass();
        }
      }, 2000);
    },
    handleCancel(e) {
      console.log("Clicked cancel button");
      this.visible = false;
    },
  },
};
</script>
