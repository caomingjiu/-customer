<template>
  <div>
    <div class="header-body cc-df-between">
      <div class="t-left cc-df">
        <!-- <img src="../assets/zijin.png" class="t-card" /> -->
        <p class="wenzi">南京工业职业技术大学</p>
        <p class="btwz">欢迎进入客户管理系统</p>
      </div>
      <div class="t-right">
        <a-icon
          type="search"
          class="icon-header"
          :style="{ fontSize: '20px', color: '#FFFFFF' }"
        />
        <a-icon
          type="question-circle"
          class="icon-header"
          :style="{ fontSize: '20px', color: '#FFFFFF' }"
        />
        <a-icon
          type="import"
          class="icon-header"
          @click="into(100)"
          :style="{ fontSize: '20px', color: '#FFFFFF' }"
        />
      </div>
    </div>
    <div class="cc-df">
      <div class="menu">
        <div>
          <a-menu style="width: 256px" mode="inline">
            <a-menu-item key="1" @click="into(0)">
              <a-icon type="mail" />
              首页
            </a-menu-item>
            <a-sub-menu key="sub1">
              <span slot="title"
                ><a-icon type="setting" /><span>人事管理</span></span
              >
              <a-menu-item key="1" @click="into(1)" v-if="roleId == 1"
                >员工信息管理</a-menu-item
              >
              <a-menu-item key="2" @click="into(2)" v-if="roleId == 1"
                >客户信息管理</a-menu-item
              >
              <a-menu-item key="3" @click="into(3)">反馈信息管理</a-menu-item>
              <a-menu-item key="7" @click="into(7)" v-if="roleId == 1"
                >业绩信息管理</a-menu-item
              >
            </a-sub-menu>
            <a-sub-menu key="sub2" v-if="roleId == 1">
              <span slot="title"
                ><a-icon type="setting" /><span>部门管理</span></span
              >
              <a-menu-item key="4" @click="into(4)">职位信息管理</a-menu-item>
              <a-menu-item key="5" @click="into(5)">部门信息管理</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3" v-if="roleId == 1">
              <span slot="title"
                ><a-icon type="setting" /><span>权限管理</span></span
              >
              <a-menu-item key="10" @click="into(6)">系统用户管理</a-menu-item>
              <a-menu-item key="12" @click="into(8)">日志信息管理</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub4">
              <span slot="title"
                ><a-icon type="setting" /><span>产业管理</span></span
              >
              <a-menu-item key="15" @click="into(10)">产品信息管理</a-menu-item>
              <a-menu-item key="16" @click="into(11)">计划信息管理</a-menu-item>
              <a-menu-item key="17" @click="into(12)">订单信息管理</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </div>
      <div class="card-body">
        <div class="card-header">
          <a-tabs v-model="activeKey" @click="into(activeKey)">
            <a-tab-pane
              v-for="item in panes"
              :key="item.id"
              :tab="item.name"
            ></a-tab-pane>
          </a-tabs>
        </div>
        <div class="card">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "layout",
  data() {
    return {
      panes: [{ name: "首页", id: 0 }],
      activeKey: 0,
      user: this.$cookies.get("user"),
      roleId: this.$cookies.get("roleId"),
    };
  },
  components: {},
  created() {
    console.log(this.roleId);
  },
  mounted() {},
  methods: {
    into(index) {
      if (index == 0) {
        this.$router.push("/layout");
      }
      if (index == 1) {
        this.$router.push("/personTable");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "员工信息管理",
            id: 1,
          });
          this.activeKey = 1;
        }
      }
      if (index == 2) {
        this.$router.push("/customer");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "客户信息管理",
            id: 2,
          });
          this.activeKey = 2;
        }
      }
      if (index == 3) {
        this.$router.push("/feedback");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "反馈信息管理",
            id: 3,
          });
          this.activeKey = 3;
        }
      }
      if (index == 4) {
        this.$router.push("/position");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "职位信息管理",
            id: 4,
          });
          this.activeKey = 4;
        }
      }
      if (index == 5) {
        this.$router.push("/department");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "部门信息管理",
            id: 5,
          });
          this.activeKey = 5;
        }
      }
      if (index == 6) {
        this.$router.push("/sysPeople");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "系统用户管理",
            id: 6,
          });
          this.activeKey = 6;
        }
      }
      if (index == 7) {
        this.$router.push("/performance");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "业绩信息管理",
            id: 7,
          });
          this.activeKey = 7;
        }
      }
      if (index == 8) {
        this.$router.push("/logo");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "日志信息管理",
            id: 8,
          });
          this.activeKey = 8;
        }
      }
      if (index == 9) {
        this.$router.push("/semester");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "学期信息管理",
            id: 9,
          });
          this.activeKey = 9;
        }
      }
      if (index == 10) {
        this.$router.push("/product");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "产品信息管理",
            id: 10,
          });
          this.activeKey = 10;
        }
      }
      if (index == 11) {
        this.$router.push("/plan");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "计划信息管理",
            id: 11,
          });
          this.activeKey = 11;
        }
      }
      if (index == 12) {
        this.$router.push("/order");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "订单信息管理",
            id: 12,
          });
          this.activeKey = 12;
        }
      }
      if (index == 100) {
        this.$router.push("/");
      }
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
.header-body {
  background-color: #1890ff;
  height: 50px;
  width: 100%;
}
.t-left {
  height: 100%;
}
.btwz {
  margin-left: 90px;
  margin-top: 10px;
  font-size: 17px;
  color: white;
}
.t-card {
  height: 35px;
  width: 35px;
  margin-top: 7px;
  margin-left: 10px;
}
.wenzi {
  font-size: 25px;
  color: white;
  margin-left: 15px;
  margin-top: 3px;
}
.icon-header {
  color: inherit;
  margin-right: 20px;
}
.logout_title {
  color: inherit;
  text-decoration: none;
}
.card-body {
  background-color: #f0f2f5;
  min-height: 100vh;
  width: 100%;
}
.card {
  background-color: white;
  width: 98%;
  margin-left: 1%;
  margin-top: 1%;
  padding-top: 15px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 1%;
}
.menu {
  background-color: white;
}
.card-header {
  background-color: white;
  width: 100%;
}
</style>
