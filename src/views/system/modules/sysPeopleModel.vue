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
          <p style="margin-top: 5px">管理名字:</p>
        </div>
        <a-input
          v-model="sysName"
          style="width: 90%"
          placeholder="input className"
        />
      </div>
      <div class="cc-df">
        <div style="width: 70px">
          <p style="margin-top: 5px">管理密码:</p>
        </div>
        <a-input-password
          v-model="sysPassword"
          style="width: 90%"
          placeholder="input className"
        />
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
      sysName: "",
      sysPassword: "",
      classType: "",
      record: {},
      isTrue: true,
    };
  },
  created() {
    this.selectRole();
  },
  methods: {
    fuzhi(record) {
      this.record = record;
      this.isTrue = this.record.status;
      for (let i = 0; i < this.roles.length; i++) {
        if (this.record.roleName == this.roles[i].roleName) {
          this.roleId = this.roles[i].id;
        }
      }
      this.roleName = this.record.roleName;
    },
    async selectRole() {
      this.url = this.GLOBAL.baseUrl + "/sys/role";
      this.result = await API.init(this.url, {}, "get");
      this.roles = this.result.data;
    },
    async addSys() {
      this.url = this.GLOBAL.baseUrl + "/sys/user/register";
      this.data = {
        password: this.sysPassword,
        roleId: this.roleId,
        userName: this.sysName,
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
        this.$message.error("新增失败");
      }
      if (this.result.code == 20010) {
        this.$message.error("新增失败，用户已存在");
      }
    },
    async putSys() {
      this.url = this.GLOBAL.baseUrl + "/sys/user";
      this.data = {
        roleId: this.roleId,
        status: this.isTrue,
        sysUserName: this.sysName,
        sysUserPassword: this.sysPassword,
        userId: this.record.userId,
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
    //switch
    switchButton(checked, event) {
      console.log(checked);
    },
  },
};
</script>
