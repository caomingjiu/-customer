<template>
  <div>
    <div class="cc-df">
      <div id="main" style="width: 650px; height: 400px"></div>
      <div id="main1" style="width: 650px; height: 400px"></div>
    </div>
  </div>
</template>

<script>
const API = require("../request/api.js");
export default {
  name: "personPic",
  data() {
    return {
      option: {
        title: {
          text: "近三个月客户增长数量",
          left: "center",
        },
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [],
            type: "line",
          },
        ],
      },
      option1: {
        title: {
          text: "近三个月员工增长数量",
          left: "center",
        },
        xAxis: {
          type: "category",
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [],
            type: "line",
          },
        ],
      },
    };
  },
  components: {},
  created() {},
  mounted() {
    this.myEcharts();
    this.myEcharts1();
  },
  methods: {
    async selectCustomers() {
      this.url = this.GLOBAL.baseUrl + "/customer/three";
      this.result = await API.init(this.url, {}, "get");
      for (let i = 0; i < this.result.data.length; i++) {
        this.option.xAxis.data[i] = this.result.data[i].month + "月";
        this.option.series[0].data[i] = this.result.data[i].sums;
      }
    },
    async myEcharts() {
      await this.selectCustomers();
      console.log(this.option);
      var myChart = this.$echarts.init(document.getElementById("main"));
      myChart.setOption(this.option);
    },
    async selectStaffs() {
      this.url = this.GLOBAL.baseUrl + "/emp/three";
      this.result = await API.init(this.url, {}, "get");
      for (let i = 0; i < this.result.data.length; i++) {
        this.option1.xAxis.data[i] = this.result.data[i].month + "月";
        this.option1.series[0].data[i] = this.result.data[i].sums;
      }
    },
    async myEcharts1() {
      await this.selectStaffs();
      console.log(this.option1);
      var myChart = this.$echarts.init(document.getElementById("main1"));
      myChart.setOption(this.option1);
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
</style>
