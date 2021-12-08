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
          <p style="margin-top: 5px">学生名字:</p>
        </div>
        <a-input
          v-model="teacherName"
          style="width: 90%"
          placeholder="input className"
        />
      </div>
      <div class="cc-df">
        <div style="width: 70px">
          <p style="margin-top: 5px">学生生日:</p>
        </div>
        <a-date-picker style="width: 90%" @change="onChange" />
      </div>
      <div class="cc-df">
        <div style="width: 70px">
          <p style="margin-top: 5px">学生性别:</p>
        </div>
        <a-radio-group name="radioGroup" v-model="gender">
          <a-radio value="男"> 男 </a-radio>
          <a-radio value="女"> 女 </a-radio>
        </a-radio-group>
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
      roles: [],
      teacherId: 0,
      roleName: "",
      teacherName: "",
      gender: "男",
      birthday: "",
      phone: "",
      year: "",
      classType: "",
      record: {},
    };
  },
  created() {},
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString);
      this.birthday = dateString + " 00:00:00";
    },
    fuzhi(record) {
      this.record = record;
      this.teacherName = this.record.teacherName;
      this.gender = this.record.gender;
      this.teacherId = this.record.id;
      this.phone = this.record.phone;
      this.year = this.record.enrollmentYear;
    },
    async addSys() {
      this.url = this.GLOBAL.baseUrl + "/stu";
      this.data = {
        birthday: this.birthday,
        gender: this.gender,
        studentName: this.teacherName,
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
        this.$message.error("新增失败,学生已存在");
      }
    },
    async putSys() {
      this.url = this.GLOBAL.baseUrl + "/teacher";
      this.data = {
        enrollmentYear: this.year,
        gender: this.gender,
        phone: this.phone,
        teacherName: this.teacherName,
        id: this.teacherId,
      };
      this.result = await API.init(this.url, this.data, "put");
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
    //model
    handleOk(e) {
      this.ModalText = "The modal will be closed after two seconds";
      this.confirmLoading = true;
      setTimeout(() => {
        this.confirmLoading = false;
        if (this.classType == "add") {
          this.addSys();
        }
        if (this.classType == "put") {
          this.putSys();
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
