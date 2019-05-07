<template>
<div class="measurements">
    <div class="loading" v-if="status.gettingMeasurements">
        Loading...
    </div>
    <div v-else>
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
                <td>{{ measurement.date }}</td>
                <td>{{ measurement.temperature }}</td>
                <td>{{ measurement.soil }}</td>
                <td>{{ measurement.humidity }}</td>
            </tr>
        </tbody>
        </table>
        <p v-else>There are currently no measurements.</p>
    </div>
</div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { MAX_OPTIMAL_TEMPERATURE, MIN_OPTIMAL_TEMPERATURE } from '@/constants/startup'
import { LanguageRouter } from '@/plugins/LanguageRouter';

export default {
  name: 'Measurements',
  data: function () {
    return {
        plantMeasurements: []
    }
  },
  methods: {
    ...mapActions("plant", ["loadMeasurements"]),
    loadMeasurementsForPlant() {
        this.loadMeasurements(this.currentPlant.secret);
    }
  },
  computed: {
    ...mapState("plant", ["status", "currentPlant", "measurements"])
  },
  created() {
      this.loadMeasurementsForPlant();
  }
}
</script>

<style scoped>
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