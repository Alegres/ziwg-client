<template>
  <div class="measurements">
    <div class="loading" v-if="status.gettingMeasurements">Loading...</div>
    <div v-else>
      <div v-if="measurements.length > 0">
        <!--
            <div>
                <strong class="status">Status:</strong>
                <br />
                <div class="parameter-ico">
                    <fa-icon icon="plug"/>
                </div>
                <span class="parameter-value status" v-if="!isConnected()">{{ $t('pages.measurements.not_connected') }}</span>
                <span class="parameter-value status" v-else>OK</span>
            </div>
        -->

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Temperature</th>
              <th scope="col">Soil</th>
              <th scope="col">Humidity</th>
            </tr>
          </thead>
          <tbody>
            <td>{{ lastMeasurement.temp }}&#8451;</td>
            <td>{{ lastMeasurement.soil }}%</td>
            <td>{{ lastMeasurement.humidity }}%</td>
          </tbody>
        </table>

        <div class="btn btn-secondary pointer" v-on:click="toggleMeasurements()">
          <span v-if="showMeasurements">Hide measurements</span>
          <span v-else>Show measurements</span>
        </div>
        <div class="btn btn-success pointer" v-on:click="togglePlot()">
          <span v-if="showPlot">Hide plot</span>
          <span v-else>Show available plots</span>
        </div>
      </div>
      <br>
      <div v-if="showMeasurements">
        <table class="table" v-if="measurements.length > 0">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Temperature</th>
              <th scope="col">Soil</th>
              <th scope="col">Humidity</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="measurement in measurements">
              <th scope="row">{{ measurement.id }}</th>
              <td>{{ getFormattedDate(measurement.data_ins) }}</td>
              <td>{{ measurement.temp }}&#8451;</td>
              <td>{{ measurement.soil }}%</td>
              <td>{{ measurement.humidity }}%</td>
            </tr>
          </tbody>
        </table>
        <p v-else>There are currently no measurements.</p>
      </div>

      <div v-if="showPlot">
        <line-chart v-if="!gettingMeasurements" :chartdata="chartdata" :options="options"/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import {
  MAX_OPTIMAL_TEMPERATURE,
  MIN_OPTIMAL_TEMPERATURE
} from "@/constants/startup";
import { LanguageRouter } from "@/plugins/LanguageRouter";
import LineChart from "@/components/Chart.vue";

export default {
  name: "Measurements",
  data: function() {
    return {
      plantMeasurements: [],
      lastMeasurement: {},
      showMeasurements: false,
      showPlot: false,
      chartdata: {
        labels: null,
        datasets: [
          {
            label: "Temperature",
            borderColor: "#D6942F",
            data: null
          },
          {
            label: "Humidity",
            borderColor: "#2FD2EC",
            data: null
          },
          {
            label: "Soil",
            borderColor: "#75E329",
            data: null
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        annotation: {
          annotations: [
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: null,
              borderColor: "red",
              borderWidth: 1
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: null,
              borderColor: "red",
              borderWidth: 1
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: null,
              borderColor: "red",
              borderWidth: 1
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: null,
              borderColor: "red",
              borderWidth: 1
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: null,
              borderColor: "red",
              borderWidth: 1
            },
            {
              type: "line",
              mode: "horizontal",
              scaleID: "y-axis-0",
              value: null,
              borderColor: "red",
              borderWidth: 1
            }
          ]
        }
      }
    };
  },
  methods: {
    ...mapActions("plant", ["loadMeasurements"]),
    getFormattedDate(date) {
        let formattedDate = date.slice(0, 10) + " " + date.slice(11, 16);

        return formattedDate;
    },
    getDateX() {
      let temp = [];

      for (let ia = 0; ia < this.measurements.length; ia++)
        temp.push(this.getFormattedDate(this.measurements[ia].data_ins));

      return temp;
    },
    getTemperatureY() {
      let temp = [];

      for (let ia = 0; ia < this.measurements.length; ia++)
        temp.push(this.measurements[ia].temp);

      return temp;
    },
    getHumidityY() {
      let temp = [];

      for (let ia = 0; ia < this.measurements.length; ia++)
        temp.push(this.measurements[ia].humidity);

      return temp;
    },
    getSoilY() {
      let temp = [];

      for (let ia = 0; ia < this.measurements.length; ia++)
        temp.push(this.measurements[ia].soil);

      return temp;
    },
    toggleMeasurements() {
      this.showMeasurements = !this.showMeasurements;
    },
    togglePlot() {
      this.showPlot = !this.showPlot;
    },
    isConnected() {
      let lastMeasurementDate = new Date(this.lastMeasurement.data_ins);
      let connectionTimeout = new Date(
        lastMeasurementDate.getTime() + 1 * 60000
      );
      let currentTime = new Date();

      if (currentTime > connectionTimeout) return false;
      else return true;
    },
    loadMeasurementsForPlant() {
      this.loadMeasurements(this.currentPlant.id);
    }
  },
  computed: {
    ...mapState("plant", ["status", "currentPlant", "measurements"]),
    ...mapState("preset", ["currentPreset"]),
    measurementsStatus() {
      return this.status.gettingMeasurements;
    }
  },
  watch: {
    measurementsStatus(newStatus, oldStatus) {
      if (newStatus == false) {
        this.lastMeasurement = this.measurements[this.measurements.length - 1];
        this.chartdata.datasets[0].data = this.getTemperatureY();
        this.chartdata.datasets[1].data = this.getHumidityY();
        this.chartdata.datasets[2].data = this.getSoilY();

        console.log("prest");
        console.log(this.currentPreset);

        /*this.chartdata.datasets[3].data = this.currentPreset.min_temp;
        this.chartdata.datasets[4].data = this.currentPreset.min_humidity;
        this.chartdata.datasets[5].data = this.currentPreset.min_soil;*/

        this.options.annotation.annotations[0].value = this.currentPreset.min_temp;
        this.options.annotation.annotations[1].value = this.currentPreset.max_temp;
        this.options.annotation.annotations[2].value = this.currentPreset.min_humidity;
        this.options.annotation.annotations[3].value = this.currentPreset.max_humidity;
        this.options.annotation.annotations[4].value = this.currentPreset.min_soil;
        this.options.annotation.annotations[5].value = this.currentPreset.max_soil;


        this.chartdata.labels = this.getDateX();
      }
    }
  },
  created() {
    this.loadMeasurementsForPlant();
  },
  components: { LineChart }
};
</script>

<style scoped>
.parameter-ico,
.parameter-value {
  display: inline-block;
  padding-right: 10px;
  padding-top: 10px;
}

.parameter-value {
  position: relative;
}
.status {
  padding-bottom: 20px;
}
tr {
  text-align: center;
}
td {
  text-align: center;
}
.form-signin {
  margin: 1px !important;
  border: 0 !important;
  margin-top: -20px !important;
}
.form {
}

.measurements {
  margin: 0 auto;
  width: 89%;
}
</style>