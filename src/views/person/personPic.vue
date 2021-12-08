<template>
  <div>
    <div id="main" style="width: 750px; height: 400px"></div>
  </div>
</template>

<script>
const API = require("../../request/api.js");
export default {
  name: "personPic",
  data() {
    return {
      option: {
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
  },
  methods: {
    async selectStudents() {
      this.url = this.GLOBAL.baseUrl + "/stu/year";
      this.result = await API.init(this.url, {}, "get");
      console.log(this.result);
      for (let i = 0; i < this.result.data.length; i++) {
        this.option.xAxis.data[i] = this.result.data[i].year + "年";
        this.option.series[0].data[i] = this.result.data[i].sums;
      }
    },
    async myEcharts() {
      await this.selectStudents();
      console.log(this.option);
      var myChart = this.$echarts.init(document.getElementById("main"));
      myChart.setOption(this.option);
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
</style>
