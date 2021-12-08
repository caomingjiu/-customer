<template>
  <div class="bg cc-col-center">
    <div class="login-card">
      <div class="cc-col-center">
        <div class="cc-df">
          <!-- <img src="../assets/zijin.png" alt="" class="img-zijin" /> -->
          <p class="font-title"><b>客户管理系统</b></p>
        </div>
        <div class="logon-t"></div>
        <a-input
          ref="userNameInput"
          v-model="userName"
          placeholder="Basic usage"
          size="large"
          class="input-account"
        >
          <a-icon slot="prefix" type="user" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
          </a-tooltip>
        </a-input>
        <a-input-password
          placeholder="input password"
          ref="passwordInput"
          v-model="password"
          class="input-account"
        >
          <a-icon slot="prefix" type="user" />
          <a-tooltip slot="suffix" title="Extra information">
            <a-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
          </a-tooltip>
        </a-input-password>
      </div>
      <div class="c-b">
        <a-radio-group v-model="roleId" @change="onChange">
          <a-radio :value="1"> 管理员登录 </a-radio>
          <a-radio :value="2"> 员工登录 </a-radio>
        </a-radio-group>
      </div>
      <div class="cc-col-center">
        <a-button class="l-b" type="primary" @click="login"> 登录 </a-button>
      </div>
      <div class="cc-df c-b">
        <p>其他登录方式</p>
        <a-icon class="other" type="github" />
        <a-icon class="other" type="dingding" />
        <a-icon class="other" type="wechat" />
      </div>
    </div>
  </div>
</template>
<script>
const API = require("../request/api.js");
export default {
  name: "Login",
  data() {
    return {
      userName: "",
      password: "",
      roleId: 1,
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    onChange(e) {
      console.log("radio checked", this.roleId);
    },
    async login() {
      this.url = this.GLOBAL.baseUrl + "/admin/login";
      this.data = {
        phone: this.userName,
        password: this.password,
        roleId: this.roleId,
      };
      this.result = await API.init(this.url, this.data, "post");
      if (this.result.code == 1) {
        this.$message({
          message: "登录成功",
          type: "success",
        });
        this.$cookies.set("user", this.result.data, "1h");
        this.$router.push("/layout");
      } else {
        this.$message.error("登录失败");
      }
      console.log(this.result);
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
.bg {
  background-image: url("http://boot.jeecg.com/img/background.5825f033.svg");
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
}
.login-card {
  width: 23%;
  margin-top: 10%;
}
.font-title {
  font-size: 30px;
}
.input-account {
  margin-top: 30px;
}
.img-zijin {
  width: 50px;
  height: 50px;
}
.l-b {
  width: 350px;
  margin-top: 30px;
}
.c-b {
  margin-top: 30px;
}
.other {
  font-size: 30px;
  margin-left: 10px;
}
</style>
