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
        title: {
          text: "学校男女生比例",
          subtext: "2019~2021",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "男女比例",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "男" },
              { value: 735, name: "女" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
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
    async selectGender() {
      this.url = this.GLOBAL.baseUrl + "/stu/gender";
      this.result = await API.init(this.url, {}, "get");
      console.log(this.result);
      this.option.series[0].data[0].value = this.result.data.boy;
      this.option.series[0].data[1].value = this.result.data.girl;
    },
    async myEcharts() {
      await this.selectGender();
      console.log(this.option.series[0].data[0].value);
      var myChart = this.$echarts.init(document.getElementById("main"));
      myChart.setOption(this.option);
    },
  },
  computed: {},
};
</script>

<style scoped lang="scss">
</style>
