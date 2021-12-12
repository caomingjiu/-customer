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
          <p style="margin-top: 5px">员工名字:</p>
        </div>
        <a-input v-model="name" style="width: 90%" placeholder="input name" />
      </div>
      <div class="cc-df">
        <div style="width: 70px">
          <p style="margin-top: 5px">员工电话:</p>
        </div>
        <a-input v-model="phone" style="width: 90%" placeholder="input phone" />
      </div>
      <div class="cc-df">
        <div style="width: 70px">
          <p style="margin-top: 5px">员工年龄:</p>
        </div>
        <a-input-number
          v-model="age"
          style="width: 90%"
          placeholder="input age"
        />
      </div>
      <div class="cc-df">
        <div style="width: 70px">
          <p style="margin-top: 5px">员工工资:</p>
        </div>
        <a-input-number
          v-model="wage"
          style="width: 90%"
          placeholder="input wage"
        />
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
      <div class="cc-df" v-if="this.classType == 'put'">
        <div style="width: 70px">
          <p style="margin-top: 5px">是否禁用:</p>
        </div>
        <a-switch
          style="margin-top: 5px"
          checked-children="正常"
          un-checked-children="禁用"
          @change="switchButton"
          v-model="isTrue"
        />
      </div>
      <div class="cc-df">
        <div style="width: 70px">
          <p style="margin-top: 5px">部门名称:</p>
        </div>
        <a-select
          style="width: 90%"
          show-search
          v-model="roleName"
          placeholder="Select a role"
          option-filter-prop="children"
          :filter-option="filterOption"
          @change="handleChange"
        >
          <a-select-option v-for="(item, index) in roles" :key="index">
            {{ item.depName }}
          </a-select-option>
        </a-select>
      </div>
      <div class="cc-df">
        <div style="width: 70px">
          <p style="margin-top: 5px">职位名称:</p>
        </div>
        <a-select
          style="width: 90%"
          show-search
          v-model="positionName"
          placeholder="Select a role"
          option-filter-prop="children"
          :filter-option="filterOption"
        >
          <a-select-option v-for="(item, index) in positions" :key="index">
            {{ item.positionName }}
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
      roles: [],
      roleId: 0,
      roleName: "",
      positionName: "",
      positions: [],
      name: "",
      wage: 0,
      age: 0,
      phone: "",
      gender: "男",
      classType: "",
      record: {},
      isTrue: true,
    };
  },
  created() {
    this.selectRole();
  },
  methods: {
    clean() {
      this.roleId = 0;
      this.roleName = "";
      this.positionName = "";
      this.name = "";
      this.wage = 0;
      this.age = 0;
      this.phone = "";
    },
    fuzhi(record) {
      this.record = record;
      this.roleName = this.record.employeeType;
      this.positionName = this.record.employeeType;
      this.name = this.record.employeeName;
      this.wage = this.record.wage;
      this.age = this.record.age;
      this.phone = this.record.phone;
    },
    async selectRole() {
      this.url = this.GLOBAL.baseUrl + "/dep/list";
      this.result = await API.init(this.url, {}, "get");
      this.roles = this.result.data;
    },
    async selectPosition() {
      this.url = this.GLOBAL.baseUrl + "/position/dep";
      this.data = {
        depId: this.roleId,
      };
      this.result = await API.init(this.url, this.data, "get");
      this.positions = this.result.data;
    },
    async addSys() {
      this.url = this.GLOBAL.baseUrl + "/emp";
      this.data = {
        age: this.age,
        employeeName: this.name,
        employeeType: this.positionName,
        password: "123456",
        phone: this.phone,
        sex: this.gender,
        wage: this.wage,
      };
      this.result = await API.init(this.url, this.data, "post");
      console.log(this.result);
      if (this.result.code == 1) {
        this.$message({
          message: "新增成功",
          type: "success",
        });
        this.visible = false;
        this.clean();
        this.$emit("getAll");
      }
      if (this.result.code == 50003) {
        this.$message.error("新增失败");
      }
      if (this.result.code == 20010) {
        this.$message.error("新增失败，用户已存在");
      }
    },
    async putSys() {
      this.url = this.GLOBAL.baseUrl + "/sys/user";
      this.data = {
        age: this.age,
        employeeName: this.name,
        employeeType: this.positionName,
        password: "123456",
        phone: this.phone,
        sex: this.gender,
        wage: this.wage,
        id: this.record.id,
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
    //选择器
    handleChange(value) {
      // console.log(`selected ${value}`);
      for (let i = 0; i < this.roles.length; i++) {
        if (this.roles[value].depName == this.roles[i].depName) {
          this.roleId = this.roles[i].id;
        }
      }
      this.selectPosition();
      console.log(`selected ${this.roleId}`);
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
    //switch
    switchButton(checked, event) {
      console.log(checked);
    },
  },
};
</script>
