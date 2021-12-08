<template>
  <div>
    <div class="header-body cc-df-between">
      <div class="t-left cc-df">
        <img src="../assets/zijin.png" class="t-card" />
        <p class="wenzi">zijin school</p>
        <p class="btwz">欢迎进入紫金教务系统</p>
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
          type="bell"
          class="icon-header"
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
            <a-sub-menu key="sub1" v-if="user.roleId == 1">
              <span slot="title"
                ><a-icon type="setting" /><span>人事管理</span></span
              >
              <a-menu-item key="2" @click="into(1)">员工信息管理</a-menu-item>
              <a-menu-item key="3" @click="into(2)">客户信息管理</a-menu-item>
              <!-- <a-menu-item key="4" @click="into(3)">学生男女生比例</a-menu-item>
              <a-menu-item key="5" @click="into(4)">招生情况</a-menu-item> -->
            </a-sub-menu>
            <!-- <a-sub-menu key="sub2" v-if="user.roleId == 1">
              <span slot="title"
                ><a-icon type="setting" /><span>班级管理</span></span
              >
              <a-menu-item key="6" @click="into(5)">班级信息管理</a-menu-item>
              <a-menu-item key="7" @click="into(10)">班级学生管理</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub3" v-if="user.roleId == 1">
              <span slot="title"
                ><a-icon type="setting" /><span>权限管理</span></span
              >
              <a-menu-item key="10" @click="into(6)">系统用户管理</a-menu-item>
              <a-menu-item key="11" @click="into(7)">角色信息管理</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub4" v-if="user.roleId == 1">
              <span slot="title"
                ><a-icon type="setting" /><span>课程管理</span></span
              >
              <a-menu-item key="12" @click="into(8)">学课信息管理</a-menu-item>
              <a-menu-item key="13" @click="into(9)">学期信息管理</a-menu-item>
            </a-sub-menu> -->
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
    };
  },
  components: {},
  created() {
    console.log(this.user);
  },
  mounted() {},
  methods: {
    into(index) {
      if (index == 0) {
        this.$router.push("/layout");
      }
      if (index == 1) {
        this.$router.push("/studentTable");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "学生信息管理",
            id: 1,
          });
          this.activeKey = 1;
        }
      }
      if (index == 2) {
        this.$router.push("/teacherTable");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "教师信息管理",
            id: 2,
          });
          this.activeKey = 2;
        }
      }
      if (index == 3) {
        this.$router.push("/genderPic");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "学生男女生比例",
            id: 3,
          });
          this.activeKey = 3;
        }
      }
      if (index == 4) {
        this.$router.push("/personPic");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "招生情况",
            id: 4,
          });
          this.activeKey = 4;
        }
      }
      if (index == 5) {
        this.$router.push("/classTable");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "班级信息管理",
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
        this.$router.push("/sysRole");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "角色信息管理",
            id: 7,
          });
          this.activeKey = 7;
        }
      }
      if (index == 8) {
        this.$router.push("/subject");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "学课信息管理",
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
        this.$router.push("/classStudent");
        let i = 0;
        for (; i < this.panes.length; i++) {
          if (this.panes[i].id == index) {
            break;
          }
        }
        if (i == this.panes.length) {
          this.panes.push({
            name: "班级学生管理",
            id: 10,
          });
          this.activeKey = 10;
        }
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
