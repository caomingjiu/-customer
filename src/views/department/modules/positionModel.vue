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
          <p style="margin-top: 5px">职业名字:</p>
        </div>
        <a-input v-model="name" style="width: 90%" placeholder="input name" />
      </div>
      <div class="cc-df">
        <div style="width: 70px">
          <p style="margin-top: 5px">职业简介:</p>
        </div>
        <a-input
          v-model="description"
          style="width: 90%"
          placeholder="input description"
        />
      </div>
      <div class="cc-df">
        <div style="width: 70px">
          <p style="margin-top: 5px">部门名称:</p>
        </div>
        <a-select
          style="width: 90%"
          show-search
          v-model="value"
          placeholder="Select a role"
          option-filter-prop="children"
          :filter-option="filterOption"
          @change="handleChange"
        >
          <a-select-option v-for="(item, index) in database" :key="index">
            {{ item.depName }}
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
      database: [],
      value: "",
      id: 0,
      teacherId: 0,
      roleName: "",
      name: "",
      description: "",
      year: "",
      classType: "",
      record: {},
    };
  },
  created() {
    this.selectData();
  },
  methods: {
    fuzhi(record) {
      this.record = record;
      this.name = this.record.depName;
      this.description = this.record.description;
    },
    //选择器
    handleChange(value) {
      // console.log(`selected ${value}`);
      for (let i = 0; i < this.database.length; i++) {
        if (this.database[value].depName == this.database[i].depName) {
          this.id = this.database[i].id;
        }
      }
      console.log(`selected ${this.id}`);
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    async selectData() {
      this.url = this.GLOBAL.baseUrl + "/dep/list";
      this.result = await API.init(this.url, {}, "get");
      this.database = this.result.data;
    },
    async addSys() {
      this.url = this.GLOBAL.baseUrl + "/dep";
      this.data = {
        depName: this.name,
        description: this.description,
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
      this.url = this.GLOBAL.baseUrl + "/dep";
      this.data = {
        depName: this.name,
        description: this.description,
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
