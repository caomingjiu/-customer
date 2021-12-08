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
          <p style="margin-top: 5px">角色名称:</p>
        </div>
        <a-input
          v-model="roleName"
          style="width: 90%"
          placeholder="input roleName"
        />
      </div>
      <div class="cc-df">
        <div style="width: 70px">
          <p style="margin-top: 5px">角色简介:</p>
        </div>
        <a-input
          v-model="roleDescription"
          style="width: 90%"
          placeholder="input roleDescription"
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
      roleDescription: "",
      classType: "",
      record: {},
      isTrue: true,
    };
  },
  created() {},
  methods: {
    fuzhi(record) {
      this.record = record;
      this.roleName = this.record.roleName;
      this.roleDescription = this.record.roleDescription;
      this.roleId = this.record.id;
    },
    async addSys() {
      this.url = this.GLOBAL.baseUrl + "/sys/role";
      this.data = {
        roleDescription: this.roleDescription,
        roleName: this.roleName,
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
        this.$message.error("新增失败，角色已存在");
      }
    },
    async putSys() {
      this.url = this.GLOBAL.baseUrl + "/sys/role";
      this.data = {
        roleDescription: this.roleDescription,
        roleName: this.roleName,
        id: this.roleId,
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
        if (this.roles[value].roleName == this.roles[i].roleName) {
          this.roleId = this.roles[i].id;
        }
      }
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
