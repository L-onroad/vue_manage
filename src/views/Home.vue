<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-card class="userCard" shadow="hover">
        <div class="userSpace" slot="header">
          <img :src="userImg" />
          <div class="userMessage">
            <p class="userId">Admin</p>
            <p class="userName">樂</p>
          </div>
        </div>
        <div>
          <div class="cardBottom">
            <p>上次登录时间：<span>2022.8.10</span></p>
            <p>上次登录地点：<span>广州</span></p>
          </div>
        </div>
      </el-card>
      <el-card class="productData">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div style="overflow: auto">
        <el-card
          class="dataCard"
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div>
            <p class="totalPay">￥{{ item.value }}</p>
            <p class="state">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card class="lineChart">
        <div style="height: 230px" ref="echarts"></div>
      </el-card>
      <div style="display: flex; margin-top: 5px">
        <el-card style="height: 180px; width: 47%; margin-right: 3px">
          <div style="height: 210px; padding-top: 10px" ref="userEcharts"></div>
        </el-card>
        <el-card style="height: 180px; width: 47%">
          <div ref="videoEcharts" style="height: 170px; padding-top: 10px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from '../api/data'
import * as echarts from 'echarts'
export default {
  name: "Home",
  data() {
    return {
      userImg: require("../assets/海豹.png"),
      tableData: [],
      tableLabel: {
        name: "儿童玩具",
        todaySale: "今日卖出",
        monthSale: "本月卖出",
        totalSale: "总卖出",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 176,
          icon: "success",
          color: "#b2f3db",
        },
        {
          name: "今日收藏订单",
          value: 367,
          icon: "star-on",
          color: "#ebb2f3",
        },
        {
          name: "今日未支付订单",
          value: 82,
          icon: "shopping-cart-full",
          color: "#b2b7f3",
        },
        {
          name: "本月支付订单",
          value: 563,
          icon: "success",
          color: "#b2f3db",
        },
        {
          name: "本月收藏订单",
          value: 1752,
          icon: "star-on",
          color: "#ebb2f3",
        },
        {
          name: "本月未支付订单",
          value: 326,
          icon: "shopping-cart-full",
          color: "#b2b7f3",
        },
      ],
    };
  },
  mounted() {
    getData().then(res => {
      const { code, data } = res.data
      if (code === 200) {
        this.tableData = data.tableData
        const order = data.orderData
        const xData = order.date
        const keyArray = Object.keys(order.data[0])
        const series = []
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: order.data.map(item => item[key]),
            type: 'line'
          })
        })

        //折线图配置
        const option = {
          xAxis: {
            data: xData
          },
          yAxis: {},
          legend: {
            data: keyArray
          },
          series
        }
        const E = echarts.init(this.$refs.echarts)
        E.setOption(option)

        //柱状图配置
        const userOption = {
          legend: {
            text: {
              color: '#333'
            }
          },
          grid: {
            left: '20%'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: data.userData.map(item => item.date),
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            },
            axisLabel: {
              interval: 0,
              color: '#333'
            }
          },
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#17b3a3'
                }
              }
            }
          ],
          color: ['#2ec7c9', '#b6a2de'],
          series: [
            {
              name: '新增用户',
              data: data.userData.map(item => item.new),
              type: 'bar'
            },
            {
              name: '活跃用户',
              data: data.userData.map(item => item.active),
              type: 'bar'
            }
          ]
        }
        const U = echarts.init(this.$refs.userEcharts)
        U.setOption(userOption)

        //饼图配置
        const videoOption = {
          tooltip: {
            trigger: 'item',
          },
          color: [
            '#0f78f4',
            '#dd536b',
            '#9463e5',
            '#a6a6a6',
            '#3ed1cf'
          ],
          series: [
            {
              data: data.videoData,
              type: 'pie'
            }
          ]
        }
        const V = echarts.init(this.$refs.videoEcharts)
        V.setOption(videoOption)
      }
      console.log(res);
    })
  },
};
</script>

<style lang="less" scoped>
.userSpace {
  height: 130px;
  display: flex;
  align-items: center;
  img {
    margin-left: 20px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .userMessage {
    display: flex;
    margin-left: 30px;
    flex-direction: column;
    justify-content: center;
    .userId {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    .userName {
      text-align: center;
      font-size: 14px;
    }
  }
}
.cardBottom {
  margin-left: 15px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    margin: 2px 0;
    font-size: 12px;
  }
}
.productData {
  height: 320px;
}
.dataCard {
  float: left;
  width: 30%;
  margin-top: 20px;
  margin-right: 20px;
  i {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .totalPay {
    margin-left: 6px;
    line-height: 25px;
    font-size: 16px;
    font-weight: 600;
  }
  .state {
    margin-left: 8px;
    line-height: 25px;
    text-align: center;
    font-size: 12px;
  }
}
.lineChart {
  height: 200px;
  padding-top: 20px;
  width: 95%;
  margin-top: 12px;
}
</style>