<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <!-- <b-row>
        <b-col xl="3" md="6">
          <stats-card
            title="Total traffic"
            type="gradient-red"
            sub-title="350,897"
            icon="ni ni-active-40"
            class="mb-4"
          >
            <template slot="footer">
              <span class="text-success mr-2">3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card
            title="Total traffic"
            type="gradient-orange"
            sub-title="2,356"
            icon="ni ni-chart-pie-35"
            class="mb-4"
          >
            <template slot="footer">
              <span class="text-success mr-2">12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card
            title="Sales"
            type="gradient-green"
            sub-title="924"
            icon="ni ni-money-coins"
            class="mb-4"
          >
            <template slot="footer">
              <span class="text-danger mr-2">5.72%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card
            title="Performance"
            type="gradient-info"
            sub-title="49,65%"
            icon="ni ni-chart-bar-32"
            class="mb-4"
          >
            <template slot="footer">
              <span class="text-success mr-2">54.8%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
      </b-row> -->
    </base-header>

    <!--Charts-->
    <b-container fluid class="mt--7">
      <b-row>
        <!-- <b-col xl="8" class="mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                <h5 class="h3 text-white mb-0">Sales value</h5>
              </b-col>
              <b-col>
                <b-nav class="nav-pills justify-content-end">
                  <b-nav-item
                       class="mr-2 mr-md-0"
                       :active="bigLineChart.activeIndex === 0"
                       link-classes="py-2 px-3"
                       @click.prevent="initBigChart(0)">
                      <span class="d-none d-md-block">Month</span>
                      <span class="d-md-none">M</span>
                  </b-nav-item>
                  <b-nav-item
                    link-classes="py-2 px-3"
                    :active="bigLineChart.activeIndex === 1"
                    @click.prevent="initBigChart(1)"
                  >
                    <span class="d-none d-md-block">Week</span>
                    <span class="d-md-none">W</span>
                  </b-nav-item>
                </b-nav>
              </b-col>
            </b-row>
            <line-chart
              :height="350"
              ref="bigChart"
              :chart-data="bigLineChart.chartData"
              :extra-options="bigLineChart.extraOptions"
            >
            </line-chart>
          </card>
        </b-col> -->

        <b-col class="mb-5 mb-xl-0" v-if="!loading">
          <card header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-uppercase text-muted ls-1 mb-1">Orders</h6>
                <h5 class="h3 mb-0">Average Daily Delivery Time</h5>
              </b-col>
            </b-row>

            <bar-chart
              :height="350"
              ref="barChart"
              :chart-data="redBarChart.chartData"
            >
            </bar-chart>
          </card>
        </b-col>
      </b-row>
      <!-- End charts-->
    </b-container>
  </div>
</template>
<script>
// Charts
import * as chartConfigs from "@/components/Charts/config";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";

// Components
import BaseProgress from "@/components/BaseProgress";
import StatsCard from "@/components/Cards/StatsCard";

// Tables
import SocialTrafficTable from "./SocialTrafficTable";
import PageVisitsTable from "./PageVisitsTable";
import { mapActions } from "vuex";
export default {
  components: {
    LineChart,
    BarChart,
    BaseProgress,
    StatsCard,
    PageVisitsTable,
    SocialTrafficTable,
  },
  data() {
    return {
      loading: false,
      redBarChart: {
        chartData: {
          labels: [],
          datasets: [
            {
              label: "Delivery Time",
              data: [],
            },
          ],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      times: [
        {
          orderedAt: "2021-06-23T19:14:59.001Z",
          deliveredAt: "2021-06-25T12:15:41.941Z",
        },
        {
          orderedAt: "2021-06-24T03:33:23.046Z",
          deliveredAt: "2021-06-24T04:49:38.260Z",
        },
        {
          orderedAt: "2021-06-24T11:48:32.771Z",
          deliveredAt: "2021-06-24T12:04:27.514Z",
        },
        {
          orderedAt: "2021-06-24T11:56:52.358Z",
          deliveredAt: "2021-06-24T12:04:25.253Z",
        },
        {
          orderedAt: "2021-06-24T14:09:34.355Z",
          deliveredAt: "2021-06-25T12:08:52.385Z",
        },
        {
          orderedAt: "2021-06-24T23:58:51.294Z",
          deliveredAt: "2021-06-24T23:59:48.486Z",
        },
        {
          orderedAt: "2021-06-25T07:28:36.391Z",
          deliveredAt: "2021-06-25T12:16:50.337Z",
        },
        {
          orderedAt: "2021-06-25T12:19:20.793Z",
          deliveredAt: "2021-06-25T12:20:17.807Z",
        },
        {
          orderedAt: "2021-06-27T05:46:49.186Z",
          deliveredAt: "2021-06-27T05:52:38.343Z",
        },
        {
          orderedAt: "2021-06-27T05:50:16.540Z",
          deliveredAt: "2021-06-27T05:52:40.455Z",
        },
        {
          orderedAt: "2021-06-27T05:56:44.238Z",
          deliveredAt: "2021-06-27T09:24:18.512Z",
        },
        {
          orderedAt: "2021-06-27T08:19:47.543Z",
          deliveredAt: "2021-06-27T10:02:54.015Z",
        },
        {
          orderedAt: "2021-06-27T09:31:52.087Z",
          deliveredAt: "2021-06-27T10:00:09.778Z",
        },
      ],
    };
  },
  methods: {
    ...mapActions(["FETCH_AVG_DELIVERY_TIME"]),
  },
  mounted() {},
  created() {
    this.loading = true;
    this.FETCH_AVG_DELIVERY_TIME().then((times) => {
      let timings = {};
      let counts = {};
      times.forEach((order) => {
        var today = new Date(order.deliveredAt);
        var orderDate = new Date(order.orderedAt);
        var diffMs = orderDate - today; // milliseconds between now & Christmas
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        let orderLocalDate = new Date(order.orderedAt).toLocaleString("en-US", {
          weekday: "long",
          month: "short",
          day: "2-digit",
        });
        if (!counts[orderLocalDate]) {
          counts[orderLocalDate] = 0;
        }
        counts[orderLocalDate] += 1;
        if (!timings[orderLocalDate]) {
          timings[orderLocalDate] = Math.abs(diffMins);
        } else {
          timings[orderLocalDate] += Math.abs(diffMins);
        }
      });
      let data = [];
      for (let key in timings) {
        data.push(timings[key] / counts[key]);
      }
      this.redBarChart.chartData.labels = Object.keys(timings);
      this.redBarChart.chartData.datasets[0].data = data;
      this.loading = false;
    });
  },
};
</script>
<style>
.el-table .cell {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
